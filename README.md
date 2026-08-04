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
1. Wallet Connected
<img width="1326" height="601" alt="01-wallet_connected" src="https://github.com/user-attachments/assets/1ffbab81-c8e4-476b-80cd-1052bdd533e8" />
2. Live XLM Balance Displayed
<img width="363" height="499" alt="02-balance_displayed" src="https://github.com/user-attachments/assets/e4d528aa-3f2d-40d6-a9b9-c2a5c118c4f9" />
3. Signing Transaction in Freighter
<img width="932" height="586" alt="03-successful_transaction" src="https://github.com/user-attachments/assets/476b240a-3142-4ad9-836e-15662ce5f746" />
4. Successful Transaction State
<img width="1301" height="471" alt="04-transaction history" src="https://github.com/user-attachments/assets/ec0ce6e7-91b4-4d98-ad91-f58ceecb8a59" />

## 🔗 Verified Testnet Transaction
Transaction Hash:
```bash
e7e982d0edf6bad74670e562006236b5081fdf22c2ac96abe048deea4502af6c
```
Explorer Link: View Transaction on StellarExpert






