"use client";

import { NextPage } from "next";
import { useCallback, useEffect, useState } from "react";
import { contractAddress, abi } from "@/abis/LensScoreSBT.info";
import { publicClient } from "@/services/publicClient";
import { useAccount } from "wagmi";
import { DisplayNFT } from "@/components";
import { useFetchSBTMinted, useFetchUserScore } from "@/hooks";

const SBTPage: NextPage = () => {
  const [hasMintedNft, setHasMintedNft] = useState<boolean>(false);

  const account = useAccount();
  const score = useFetchUserScore(account.address || "");
  const { sbtData } = useFetchSBTMinted();

  const checkIfNFTisMinted = useCallback(async () => {
    const logs = await publicClient.getContractEvents({
      address: contractAddress,
      abi,
      eventName: "LensScoreSBTMinted",
      args: {
        by: account.address,
      },
      fromBlock: BigInt(100237),
    });

    if (logs.length > 0) {
      setHasMintedNft(true);
    }
  }, [account.address]);

  useEffect(() => {
    if (account.address != undefined) {
      checkIfNFTisMinted();
    }
  }, [account.address, checkIfNFTisMinted]);

  return (
    <section className="min-h-screen bg-base-200 text-base-content p-6">
      <div className="container mx-auto px-6 mt-20">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
            Your Soulbound Token (SBT)
          </h1>
          <p className="text-lg">
            View your Lens Score SBT and update it if your score has improved!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-base-300 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-center text-primary">
              Your SBT Details
            </h2>
            <div className="flex flex-col lg:flex-row gap-4 justify-around items-center">
              <div className="mb-4">
                <p className="text-lg">
                  <span className="font-semibold">Wallet Address:</span>{" "}
                  <span id="walletAddress" className="text-base-content">
                    {account.address?.slice(0, 5) +
                      "..." +
                      account.address?.slice(-4)}
                  </span>
                </p>
                <p className="text-lg">
                  <span className="font-semibold">Current Score:</span>{" "}
                  <span id="currentScore" className="text-base-content">
                    {score.total}
                  </span>
                </p>
                <p className="text-lg">
                  <span className="font-semibold">SBT Score:</span>{" "}
                  <span id="sbtScore" className="text-base-content">
                    {sbtData.score.toString()}
                  </span>
                </p>
                <p className="text-lg">
                  <span className="font-semibold">Last Updated:</span>{" "}
                  <span id="lastUpdated" className="text-base-content">
                    {new Date(sbtData.timestamp).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </p>
              </div>
              <div
                id="sbtImage"
                className="border border-gray-700 rounded-lg overflow-hidden shadow-md"
              >
                <DisplayNFT walletAddress={account.address || ""} />
              </div>
            </div>
          </div>

                    
          <div className="bg-base-300 p-6 rounded-lg shadow-lg flex flex-col justify-center items-center">
            <h2 className="text-2xl font-bold mb-4 text-center text-primary">
              Update Your Score
            </h2>
            <p className="text-center mb-6">
              If your current score is higher than the score in your SBT, you
              can update it to reflect your latest achievements.
            </p>
            <button className="btn btn-primary w-full max-w-xs">
              Update SBT
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SBTPage;
