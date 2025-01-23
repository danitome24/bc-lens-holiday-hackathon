"use client";

import { NextPage } from "next";
import { useAccount } from "wagmi";
import { DisplayNFT, SaveScoreButton } from "@/components";
import { useFetchSBTMinted, useFetchUserScore } from "@/hooks";

const SBTPage: NextPage = () => {
  const account = useAccount();
  const { score } = useFetchUserScore(account.address || "");
  const { sbtData } = useFetchSBTMinted();

  return (
    <section className="min-h-screen bg-base-200 text-base-content p-6">
      <div className="container mx-auto px-6 mt-16">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold mb-4 text-indigo-300">
            Your Lens Reputation SBT
          </h1>
          <p className="text-lg text-gray-400">
            A unique representation of your Lens activity and achievements.
          </p>
        </div>

        {/* Main Display Section */}
        <div className="flex flex-col items-center gap-8">
          {/* SBT NFT Display */}
          <div className="relative w-full max-w-lg bg-base-300 rounded-lg overflow-hidden shadow-lg">
            <div className="p-4 flex justify-center items-center">
              <DisplayNFT walletAddress={account.address || ""} />
            </div>
            <div className="p-4 text-center bg-base-300">
              <p className="text-lg font-semibold ">
                SBT Score: {sbtData.score.toString()}
              </p>
              <p className="text-sm text-gray-400">
                Last Updated: {new Date(sbtData.timestamp).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>

          {/* Refresh Button */}
          <div className="flex justify-center w-full">
            <SaveScoreButton
              walletAddress={account.address || ""}
              score={score}
              needsScoreBeUpdated={score.total > sbtData.score}
            />
          </div>

          {/* Additional Details Section */}
          {/* <div className="w-full max-w-xl bg-base-300 p-6 rounded-lg shadow-md ">
            <h3 className="text-2xl font-bold mb-4 text-center">
              Additional Details
            </h3>
            <ul className="text-gray-300 space-y-2">
              <li>
                <span className="font-semibold text-gray-400">Wallet Address:</span> {account.address?.slice(0, 5) + "..." + account.address?.slice(-4)}
              </li>
              <li>
                <span className="font-semibold text-gray-400">Current Score:</span> {score.total}
              </li>
            </ul>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default SBTPage;
