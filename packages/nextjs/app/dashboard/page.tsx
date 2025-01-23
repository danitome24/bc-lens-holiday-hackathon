"use client";

import { LensScoreCard } from "@/components";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { NextPage } from "next";
import { useFetchUserScore } from "@/hooks/useFetchUserScore";

const Dashboard: NextPage = () => {
  const [walletAddress, setWalletAddress] = useState<string>("");

  /**
   * Read data to generate score
   */
  const account = useAccount();
  const { score } = useFetchUserScore(walletAddress);

  useEffect(() => {
    if (account.address) {
      setWalletAddress(account.address as string);
    }
  }, [account.address]);

  // const onWalletAddressChange = (address: string) => {
  //   setWalletAddress(address);
  // };

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
      <LensScoreCard score={score} walletAddress={account.address || ""} />
      <button
        className="btn btn-primary mt-4 flex items-center"
      >
        <ArrowPathIcon className="h-5 w-5 mr-2" />
        Refresh
      </button>

    </div>
  );
};

export default Dashboard;
