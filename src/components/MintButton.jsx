import React, { useState } from "react";

const MintButton = () => {
  const [status, setStatus] = useState("idle");

  const handleMint = async () => {
    try {
      setStatus("confirming");

      // ✅ Show confirm alert
      alert("🖊️ Please confirm the transaction in MetaMask.");

      await new Promise((resolve) => requestAnimationFrame(() => resolve()));

      // Simulate transaction processing
      setStatus("pending");
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // ✅ Show success alert
      alert("🎉 Successfully Minted!");
      setStatus("success");
    } catch (err) {
      console.error("Simulated error:", err);
      setStatus("failed");
    }
  };

  const getStatusContent = () => {
    switch (status) {
      case "pending":
        return <p className="text-info">⏳ Minting in progress...</p>;
      case "failed":
        return <p className="text-danger">❌ Transaction Failed</p>;
      default:
        return null;
    }
  };

  return (
    <div style={{ textAlign: "center", backgroundColor: "#004d00", padding: "2rem", borderRadius: "1rem" }}>
      <button
        className="btn btn-primary"
        onClick={handleMint}
        disabled={status === "pending" || status === "confirming"}
      >
        {status === "pending" ? "Minting..." : "Mint NFT"}
      </button>
      <div style={{ marginTop: "1rem" }}>
        {getStatusContent()}
      </div>
    </div>
  );
};

export default MintButton;
