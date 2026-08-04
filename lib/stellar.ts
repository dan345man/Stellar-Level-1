import {
  isConnected,
  requestAccess,
  signTransaction,
} from "@stellar/freighter-api";
import {
  Horizon,
  TransactionBuilder,
  Networks,
  Operation,
  Asset,
  StrKey,
  TimeoutInfinite, // <--- Import TimeoutInfinite
} from "@stellar/stellar-sdk";

const TESTNET_HORIZON_URL = "https://horizon-testnet.stellar.org";
const server = new Horizon.Server(TESTNET_HORIZON_URL);

/**
 * 1. Connect Wallet & Retrieve Address
 */
export async function connectFreighter(): Promise<string> {
  const connection = await isConnected();
  if (!connection.isConnected) {
    throw new Error("Freighter wallet extension is not installed.");
  }

  const res = await requestAccess();

  if (typeof res === "object" && res.error) {
    const errorMessage = typeof res.error === "string" ? res.error : res.error.message;
    throw new Error(errorMessage || "Failed to access wallet.");
  }

  const address = typeof res === "string" ? res : res?.address;

  if (!address) {
    throw new Error("Failed to retrieve public key from wallet.");
  }

  return address;
}

/**
 * 2. Fetch XLM Balance Safely
 */
export async function fetchBalance(publicKey: string): Promise<string> {
  if (!publicKey || typeof publicKey !== "string" || !publicKey.startsWith("G")) {
    return "0";
  }

  try {
    const account = await server.loadAccount(publicKey);
    const native = account.balances.find((b) => b.asset_type === "native");
    return native ? native.balance : "0";
  } catch (error: any) {
    if (error?.response?.status === 404) {
      return "0 (Unfunded)";
    }
    console.error("Error fetching balance:", error);
    return "0";
  }
}

/**
 * 3. Send XLM Payment without Expiration Timeouts
 */
export async function sendXLM(
  sender: string,
  destination: string,
  amount: string
): Promise<Horizon.HorizonApi.SubmitTransactionResponse> {
  const cleanDestination = destination.trim();
  const cleanAmount = amount.trim();

  // Validate Destination Format & Checksum
  if (!cleanDestination || !StrKey.isValidEd25519PublicKey(cleanDestination)) {
    throw new Error("Invalid destination Stellar address. Must start with 'G' and be 56 characters.");
  }

  // Validate Amount
  const parsedAmount = Number(cleanAmount);
  if (!cleanAmount || isNaN(parsedAmount) || parsedAmount <= 0) {
    throw new Error("Please enter a valid payment amount greater than 0.");
  }

  // Check if destination exists on Testnet
  let destinationExists = true;
  try {
    await server.loadAccount(cleanDestination);
  } catch (err: any) {
    if (err?.response?.status === 404) {
      destinationExists = false;
    }
  }

  // CreateAccount reserve check
  if (!destinationExists && parsedAmount < 1) {
    throw new Error("Creating a new account on Stellar requires a minimum starting balance of 1 XLM.");
  }

  // Fetch fresh sequence number for sender
  const account = await server.loadAccount(sender);

  // Select operation type
  const operation = destinationExists
    ? Operation.payment({
        destination: cleanDestination,
        asset: Asset.native(),
        amount: cleanAmount,
      })
    : Operation.createAccount({
        destination: cleanDestination,
        startingBalance: cleanAmount,
      });

  // Build transaction with infinite timeout to prevent tx_too_late errors
  const tx = new TransactionBuilder(account, {
    fee: "10000",
    networkPassphrase: Networks.TESTNET,
  })
    .addOperation(operation)
    .setTimeout(TimeoutInfinite) // <--- Set to TimeoutInfinite
    .build();

  try {
    // Request Signature
    const result = await signTransaction(tx.toXDR(), {
      network: "TESTNET",
      networkPassphrase: Networks.TESTNET,
    });

    if (!result) {
      throw new Error("Transaction signature was rejected or empty.");
    }

    // Safely parse XDR string return format
    const xdrString = typeof result === "string" ? result : result.signedTxXdr;

    if (!xdrString || typeof xdrString !== "string") {
      throw new Error("Failed to retrieve signed XDR string from wallet.");
    }

    // Reconstruct and submit to network
    const signedTx = TransactionBuilder.fromXDR(xdrString, Networks.TESTNET);
    return await server.submitTransaction(signedTx);
  } catch (err: any) {
    const resultCode =
      err?.response?.data?.extras?.result_codes?.transaction ||
      err?.response?.data?.extras?.result_codes?.operations?.[0] ||
      err.message;

    console.error("Submission Error Details:", err?.response?.data || err);
    throw new Error(`Transaction Failed: ${resultCode}`);
  }
}