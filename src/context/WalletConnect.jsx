import React, { createContext, useState, useEffect } from "react";
import { connectWallet, onNetworkChange, onAccountChange } from "../utils/wallet";
import { ethers } from "ethers";

export const WalletContext = createContext();

// Optional: Custom names for known chain IDs
const chainIdToName = {
  1: "Ethereum Mainnet",
  137: "Polygon",
  11155111: "Sepolia",
  80001: "Mumbai",
  5: "Goerli",
  3: "Ropsten",
};

export const WalletProvider = ({ children }) => {
  const [wallet, setWallet] = useState(null);
  const [network, setNetwork] = useState(null);
  const [networkName, setNetworkName] = useState(null);

  const handleConnect = async () => {
    try {
      const { address, chainId } = await connectWallet();
      setWallet(address);
      setNetwork(chainId);
      updateNetworkName(chainId);
    } catch (err) {
      alert(err.message);
    }
  };

  const updateNetworkName = (chainId) => {
    const name = chainIdToName[chainId] || "Unknown";
    setNetworkName(name);
  };

  const clearWallet = () => {
    setWallet(null);
    setNetwork(null);
    setNetworkName(null);
  };

  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.listAccounts();
        if (accounts.length > 0) {
          const address = accounts[0];
          const network = await provider.getNetwork();
          setWallet(address);
          setNetwork(network.chainId);
          updateNetworkName(network.chainId);
        } else {
          clearWallet(); // Wallet disconnected
        }
      }
    };

    checkConnection();

    onNetworkChange(() => {
      checkConnection(); // Re-fetch network + wallet
    });

    onAccountChange(() => {
      checkConnection(); // Refresh wallet or clear if no accounts
    });
  }, []);

  return (
    <WalletContext.Provider value={{ wallet, network, networkName, handleConnect }}>
      {children}
    </WalletContext.Provider>
  );
};
