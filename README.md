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
