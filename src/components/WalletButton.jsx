import React, { useContext, useState } from "react";
import { WalletContext } from "../context/WalletConnect";

const WalletButton = () => {
  const { wallet, handleConnect } = useContext(WalletContext);
  const [loading, setLoading] = useState(false);

  const connect = async () => {
    setLoading(true);
    await handleConnect();
    setLoading(false);
  };

  return (
    <button onClick={connect} className="btn btn-outline-dark m-2" disabled={loading}>
      {wallet ? (
        <>
          <i className="fa fa-wallet mr-1"></i>
          {wallet.slice(0, 5)}...{wallet.slice(-4)}
        </>
      ) : loading ? (
        <>Connecting...</>
      ) : (
        <>
          <i className="fa fa-wallet mr-1"></i> Connect Wallet
        </>
      )}
    </button>
  );
};


export default WalletButton;
