"use client";

import { useState } from "react";
import { connectFreighter, fetchBalance, sendXLM } from "@/lib/stellar";

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "object" && error !== null && "message" in error) {
    const message = (error as { message?: unknown }).message;
    if (typeof message === "string") {
      return message;
    }
  }

  return "An unexpected error occurred.";
};

export default function Home() {
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [balance, setBalance] = useState<string>("0");
  const [recipient, setRecipient] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [txHash, setTxHash] = useState<string | null>(null);

  const handleConnect = async () => {
    try {
      const key = await connectFreighter();
      const walletAddress =
        typeof key === "string"
          ? key
          : typeof key === "object" &&
              key !== null &&
              "address" in key &&
              typeof (key as { address?: unknown }).address === "string"
            ? (key as { address: string }).address
            : "";

      if (!walletAddress) {
        throw new Error("Failed to retrieve public key from wallet.");
      }

      setPublicKey(walletAddress);

      const bal = await fetchBalance(walletAddress);
      setBalance(bal);
    } catch (error) {
      alert(getErrorMessage(error) || "Failed to connect wallet.");
    }
  };

  const handleDisconnect = () => {
    setPublicKey(null);
    setBalance("0");
    setTxHash(null);
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!publicKey) return;

    setStatus("Sending transaction...");
    setTxHash(null);

    try {
      const res = await sendXLM(publicKey, recipient, amount);
      setStatus("Transaction Successful!");
      setTxHash(res.hash);

      // Refresh balance
      const updatedBal = await fetchBalance(publicKey);
      setBalance(updatedBal);
    } catch (error) {
      console.error(error);
      setStatus("Transaction Failed: " + getErrorMessage(error));
    }
  };

  return (
    <main className="max-w-xl mx-auto p-8 space-y-6">
      <h1 className="text-2xl font-bold text-center">Stellar XLM Payment dApp</h1>

      {/* Wallet Connection */}
      <div className="p-4 border rounded-lg bg-white text-gray-900 flex justify-between items-center">
        {!publicKey ? (
          <button
            onClick={handleConnect}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Connect Freighter Wallet
          </button>
        ) : (
          <div className="space-y-2 w-full">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-sm truncate max-w-[200px]">
                {publicKey}
              </span>
              <button
                onClick={handleDisconnect}
                className="px-3 py-1 text-xs bg-red-500 text-white rounded"
              >
                Disconnect
              </button>
            </div>
            <p className="text-lg">
              <strong>Balance:</strong> {balance} XLM
            </p>
          </div>
        )}
      </div>

      {/* Transaction Form */}
      {publicKey && (
        <form onSubmit={handleSend} className="space-y-4 border p-4 rounded-lg">
          <h2 className="text-lg font-semibold">Send Testnet XLM</h2>
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium text-white">Recipient Address</label>
              <button
                type="button"
                onClick={() => publicKey && setRecipient(publicKey)}
                className="text-xs text-blue-400 hover:underline cursor-pointer"
              >
                Use My Address
              </button>
            </div>
            <input
              type="text"
              required
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="w-full border border-gray-600 bg-gray-900 text-white p-2 rounded text-xs font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Paste G... address or click 'Use My Address'"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Amount (XLM)</label>
            <input
              type="number"
              step="any"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border p-2 rounded mt-1"
              placeholder="10"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Send Payment
          </button>
        </form>
      )}

      {/* Status Feedback */}
      {status && (
        <div className="p-4 border rounded bg-slate-100 text-sm">
          <p className="font-medium">{status}</p>
          {txHash && (
            <p className="mt-1 break-all">
              <strong>Hash:</strong>{" "}
              <a
                href={`https://stellar.expert/explorer/testnet/tx/${txHash}`}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline"
              >
                {txHash}
              </a>
            </p>
          )}
        </div>
      )}
    </main>
  );
}