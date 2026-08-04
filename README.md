# 🌟 Stellar XLM Payment dApp

A lightweight, modern Stellar dApp built on **Next.js**, **TypeScript**, and **Tailwind CSS**. This application integrates with the **Freighter Browser Extension** to allow users to connect their wallet, view their live XLM balance on the Stellar Testnet, and submit payment or account creation transactions with real-time hash feedback.

---

## ✨ Features

- 🔌 **Wallet Connection**: Connect and disconnect seamlessly using the Freighter browser wallet API.
- 💰 **Live XLM Balance**: Fetch and display native XLM balances directly from the Stellar Horizon Testnet.
- 💸 **Testnet XLM Transfers**: Build, sign, and submit native XLM payment or account creation operations on the testnet.
- ⚡ **Resilient Submissions**: Configured with `TimeoutInfinite` to prevent `tx_too_late` time-bound errors during wallet signing.
- 🔗 **Transaction Feedback**: Provides instant status updates and transaction hash links for verification on StellarExpert Explorer.

---

## 🛠 Tech Stack

- **Framework**: [Next.js 14+](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Stellar Libraries**:
  - [`@stellar/freighter-api`](https://github.com/stellar/freighter-api)
  - [`@stellar/stellar-sdk`](https://github.com/stellar/js-stellar-sdk)

---

## ⚙️ Prerequisites & Environment Setup

Before running the application, make sure you have the following installed and configured:

1. **Node.js**: Version `18.x` or higher installed on your system.
2. **Freighter Wallet Extension**: Installed in your browser ([Download Freighter](https://www.freighter.app/)).
3. **Freighter Network Configuration**:
   - Open the **Freighter Extension**.
   - Navigate to **Settings > Network**.
   - Switch the active network to **Test Net**.
4. **Testnet XLM Funds**:
   - Ensure your wallet address has Testnet XLM.
   - If unfunded, use the [Stellar Laboratory Friendbot](https://laboratory.stellar.org/#account-creator) to fund your testnet account with 10,000 XLM.

---

## 🚀 Installation & Local Setup Guide

### 1. Clone the Repository
```bash
git clone [https://github.com/](https://github.com/)<YOUR_GITHUB_USERNAME>/stellar-whitebelt-dapp.git
cd stellar-whitebelt-dapp
```

### 2. Install Project Dependencies
Run the following command to install required SDKs (@stellar/stellar-sdk, @stellar/freighter-api) and UI dependencies:
```bash
npm install
```

### 3. Run the Local Development Server
Start the Next.js development server:
```bash
npm run dev
```

### 4. Access the Application
Open http://localhost:3000 in your web browser.

## 📸 Application Screenshots

<table>
  <tr>
    <td align="center" width="50%">
      <img src="./screenshots/01-wallet-connected.png" alt="Wallet Connected" width="100%" />
      <br />
      <sub><b>1. Wallet Connected</b></sub>
    </td>
    <td align="center" width="50%">
      <img src="./screenshots/02-balance-displayed.png" alt="Balance Displayed" width="100%" />
      <br />
      <sub><b>2. Live XLM Balance</b></sub>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <img src="./screenshots/03-freighter-signature.png" alt="Freighter Signature" width="100%" />
      <br />
      <sub><b>3. Signing in Freighter</b></sub>
    </td>
    <td align="center" width="50%">
      <img src="./screenshots/04-transaction-success.png" alt="Transaction Success" width="100%" />
      <br />
      <sub><b>4. Transaction Hash Output</b></sub>
    </td>
  </tr>
</table>

## 🔗 Verified Testnet Transaction
Transaction Hash:
```bash
e7e982d0edf6bad74670e562006236b5081fdf22c2ac96abe048deea4502af6c
```
Explorer Link: View Transaction on StellarExpert






