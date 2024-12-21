"use client";

import { useState } from "react";

export const WalletSearch = () => {
  const [walletAddress, setWalletAddress] = useState<string>("");

  return (
    <div className="flex flex-col md:flex-row items-center gap-4 p-4">
      <input
        type="text"
        placeholder="Enter wallet address"
        value={walletAddress}
        onChange={(event) => setWalletAddress(event.target.value)}
        className="input input-bordered w-full"
      />
      <button
        onClick={() => console.log(walletAddress)}
        className="btn btn-outline btn-primary"
      >
        Search
      </button>
    </div>
  );
};
