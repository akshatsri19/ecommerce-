# React E-Commerce + Web3 Wallet Integration

## Project Overview

This project is a React-based e-commerce frontend enhanced with Web3 functionality, allowing users to connect their MetaMask wallet and simulate a blockchain transaction (minting). The core focus is on:

* Seamless wallet connection
* Responsive UI updates during blockchain interaction
* Detecting network and account changes

---

## Features

### Wallet Integration

* Users can connect/disconnect MetaMask wallet
* Wallet address and network ID are shown in the UI
* Automatically detects account switch or disconnection

### Network Detection

* Detects network changes (e.g., Ethereum, Polygon)
* Displays readable network names based on chain ID
* Handles unknown networks gracefully

### UI State Synchronization

* UI reflects the wallet connection state
* During transactions:

  * Displays prompt for MetaMask confirmation
  * Shows loading state while pending
  * Displays success or failure messages after confirmation

### 🧪 Mock Minting Simulation

* Demonstrates transaction lifecycle with fake delays
* `MintButton.jsx` mimics a blockchain mint operation

---

## 📂 Project Structure (Key Files)

```
/src
├── components/
│   └── MintButton.jsx        # Button to simulate minting flow
│   └── Navbar.jsx            # Displays Connect Wallet button
├── context/
│   └── WalletContext.js      # Stores wallet and network state
├── utils/
│   └── wallet.js             # Utility functions for MetaMask events             
└── App.js / index.js         # Entry point and route setup
```

---

## ⚙️ How to Run

1. **Clone the Repository**

```bash
git clone <your-repo-url>
cd ecommerce
```

2. **Install Dependencies**

```bash
npm install
cd api && npm install # for backend (if needed)
```

3. **Start the App**

```bash
npm start
```

4. **Open in Browser**

```
http://localhost:3000
```

---

## Requirements

* MetaMask installed in browser
* Ethers.js (installed via `npm install ethers`)
* Node.js >= 14

---

## Notes

* Uses React Context to propagate wallet state
* Uses `window.ethereum.on('accountsChanged')` and `on('chainChanged')` to listen for MetaMask updates
* Does not require a deployed smart contract (can be extended)
* UI interaction is decoupled from backend logic

---

## Network Change & UI Sync Explained

The application syncs the UI with wallet and network state through:

* **Detection of Network Changes:**

  * Listens for the `chainChanged` event from MetaMask using `window.ethereum.on()`.
  * Fetches the updated chain ID and translates it into a human-readable network name using a chainId-to-name map.
  * If the network is unsupported or unknown, it displays "Unknown Network".

* **Account Change Detection:**

  * Subscribes to the `accountsChanged` event.
  * Updates or clears wallet address and network data accordingly.

* **UI Synchronization:**

  * The wallet address and network name are displayed in the Navbar.
  * React Context (`WalletContext.js`) ensures real-time propagation of connection status.
  * The Minting button and status updates are synchronized using component state (`useState`).

This ensures the UI always reflects the current blockchain context and user wallet status.

---

## Future Improvements

* Integrate real smart contract for minting
* Add backend verification and NFT metadata storage
* Display wallet balance and token holdings

---

## Author

Akshat Srivastava
[LinkedIn](https://www.linkedin.com) | [GitHub](https://github.com)

---

