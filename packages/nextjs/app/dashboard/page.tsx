"use client";

import { LensScoreCard } from "@/components";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { NextPage } from "next";
import { useFetchUserScore } from "@/hooks/useFetchUserScore";
import toast from "react-hot-toast";

const Dashboard: NextPage = () => {
  const [walletAddress, setWalletAddress] = useState<`0x${string}`>("0x0");

  /**
   * Read data to generate score
   */
  const account = useAccount();
  const { score, refreshScore } = useFetchUserScore(walletAddress);

  useEffect(() => {
    if (account.address) {
      setWalletAddress(account.address);
    }
  }, [account.address]);

  const refreshWalletScore = async () => {
    toast.loading("Refreshing...", {
      icon: "⏳",
      duration: 4000,
      style: {
        backgroundColor: "#F9BE00",
        color: "#010F0C",
        padding: "12px 16px",
        borderRadius: "8px",
        fontSize: "17px",
        fontWeight: "500",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.25)",
      },
    });
    await refreshScore();
    toast.dismiss();
      toast.success("Score Refreshed!", {
        duration: 4000,
        style: {
          backgroundColor: "#32A96D",
          color: "#010F0C",
          padding: "12px 16px",
          borderRadius: "8px",
          fontSize: "17px",
          fontWeight: "500",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.25)",
        },
      });
  };

  if (account.address == undefined) {
    return (
      <div className="dashboard-container flex flex-col items-center justify-center bg-base-200 min-h-[800px]">
        <div className="card bg-base-300 shadow-lg w-full max-w-lg p-8 rounded-lg text-center">
          <h1 className="text-4xl font-extrabold text-primary">
            Your Reputation Score
          </h1>

          <p className="text-lg text-accent font-bold my-4">
            Connect your wallet to see your score
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container flex flex-col items-center justify-center bg-base-200 min-h-[700px]">
      <LensScoreCard score={score} walletAddress={walletAddress} />
      <button
        className="btn btn-primary mt-4 flex items-center"
        onClick={() => refreshWalletScore()}
      >
        <ArrowPathIcon className="h-5 w-5 mr-2" />
        Refresh
      </button>
    </div>
  );
};

export default Dashboard;
