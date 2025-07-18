import { ethers } from "ethers";

export const connectWallet = async () => {
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const network = await provider.getNetwork();
    return { address, chainId: network.chainId, provider };
  } else {
    throw new Error("MetaMask is not installed");
  }
};

export const onNetworkChange = (callback) => {
  if (window.ethereum) {
    window.ethereum.on("chainChanged", callback);
  }
};

export const onAccountChange = (callback) => {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", callback);
  }
};
