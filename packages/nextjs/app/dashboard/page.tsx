"use client";

import { DashboardItemsCard, LensScoreCard } from "@/components";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { NextPage } from "next";
import { useFetchUserScore } from "@/hooks/useFetchUserScore";
import { useFetchLensProfile } from "@/hooks";
import Image from "next/image";

const Dashboard: NextPage = () => {
  const [walletAddress, setWalletAddress] = useState<string>("");

  /**
   * Read data to generate score
   */
  const account = useAccount();
  const score = useFetchUserScore(walletAddress);
  const { handle, image } = useFetchLensProfile(walletAddress);

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
    <div className="dashboard-container flex flex-col items-center justify-center bg-base-200 min-h-screen">
      <LensScoreCard score={score} walletAddress={account.address} />
      <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2 w-full max-w-4xl">
        {/* Wallet Address Card */}
        <DashboardItemsCard title="Wallet Address">
          <div className="h-32 flex flex-col items-center justify-center p-6 border rounded-lg shadow-md">
            <div className="flex items-center space-x-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 9l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
              <p className="text-lg font-semibold truncate text-center">
                {account.address?.slice(0, 6)}....{account.address?.slice(-4)}
              </p>
            </div>
            <p className="text-sm text-gray-500 mt-2 text-center">
              Connected Wallet Address
            </p>
          </div>
        </DashboardItemsCard>

        {/* Lens Profile Card */}
        <DashboardItemsCard title="Lens Profile">
          <div className="h-32 flex flex-col items-center justify-center p-6 border rounded-lg shadow-md">
            <div className="flex flex-col items-center">
              {image != "" ? (
                <>
                  <Image
                    src={image}
                    width={80}
                    height={80}
                    alt="Lens Profile"
                    className="rounded-full border-4 border-gray-200"
                  />
                  <span className="mt-4 text-lg font-semibold truncate text-center">
                    {handle}
                  </span>
                </>
              ) : (
                <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
              )}
            </div>
          </div>
        </DashboardItemsCard>
      </div>
    </div>
  );
};

export default Dashboard;
