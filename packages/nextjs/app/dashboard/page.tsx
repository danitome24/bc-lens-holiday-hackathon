"use client";

import { DashboardItemsCard, LensScoreCard } from "@/components";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { Toaster } from "react-hot-toast";
import { NextPage } from "next";
import { useFetchUserScore } from "@/hooks/useFetchUserScore";
import { useFetchLensProfile } from "@/hooks";

const Dashboard: NextPage = () => {
  const [walletAddress, setWalletAddress] = useState<string>("");

  /**
   * Read data to generate score
   */
  const account = useAccount();
  const score = useFetchUserScore(walletAddress);
  const { handle } = useFetchLensProfile(walletAddress);

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
            Your Lens Score
          </h1>

          <p className="text-lg text-accent font-bold my-4">
            Connect your wallet to see your score
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container flex flex-col items-center justify-center bg-base-200 min-h-[800px]">
      <Toaster />
      <LensScoreCard score={score} walletAddress={account.address} />
      <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2 w-full max-w-4xl">
        <DashboardItemsCard
          title="Wallet Address"
          content={`${account.address?.slice(0, 6)}....${account.address?.slice(
            -4
          )}`}
        />
        <DashboardItemsCard title="Lens Profile" content={handle} />
      </div>
    </div>
  );
};

export default Dashboard;
