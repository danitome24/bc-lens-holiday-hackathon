"use client";

import { DashboardItemsCard, LensScoreCard } from "@/components";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
// import { publicClient } from "@/services/publicClient";
// import { contractAddress, abi } from "@/abis/LensScoreSBT.info";
import { Toaster } from "react-hot-toast";
import Link from "next/link";
import { NextPage } from "next";
import { useFetchUserScore } from "@/hooks/useFetchUserScore";

const Dashboard: NextPage = () => {
  const [walletAddress, setWalletAddress] = useState<string>("");
  // const [hasMintedNft, setHasMintedNft] = useState<boolean>(false);

  /**
   * Read data to generate score
   */
  const account = useAccount();
  const score = useFetchUserScore(walletAddress);

  // /**
  //  * Read NFT minted logs
  //  */
  // const checkIfNFTisMinted = useCallback(async () => {
  //   const logs = await publicClient.getContractEvents({
  //     address: contractAddress,
  //     abi,
  //     eventName: "LensScoreSBTMinted",
  //     args: {
  //       by: account.address,
  //     },
  //     fromBlock: BigInt(100237),
  //   });

  //   if (logs.length > 0) {
  //     setHasMintedNft(true);
  //   }
  // }, [account.address]);

  // useEffect(() => {
  //   if (account.address != undefined) {
  //     setWalletAddress(account.address as string);
  //     checkIfNFTisMinted();
  //   }
  // }, [account.address, checkIfNFTisMinted]);

  useEffect(() => {
    if (account.address) {
      setWalletAddress(account.address as string);
    }
  }, [account.address]);

  // const onWalletAddressChange = (address: string) => {
  //   setWalletAddress(address);
  // };

  return (
    <div className="dashboard-container flex flex-col items-center justify-center bg-base-200 min-h-[800px]">
      <Toaster />
      <LensScoreCard score={score} />
      <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2 w-full max-w-4xl">
        <DashboardItemsCard title="Wallet Address" content="0x1234...abcde" />
        <DashboardItemsCard title="Lens Profile" content="@LensHandle" />
      </div>

      <div className="mt-12">
        <Link href={"/dashboard/details"} className="btn btn-link">
          See Score Details
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
