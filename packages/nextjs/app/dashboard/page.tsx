"use client";

import {
  Chart as ChartJS,
  RadarController,
  RadialLinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { NextPage } from "next";
ChartJS.register(
  RadarController,
  RadialLinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);
import {
  AccountSummary,
  DisplayNFT,
  LensProfileCard,
  MetricsList,
  MintNFTButton,
  SaveScoreButton,
  ScoreAnalysisCard,
  ScoreCard,
  ScoreHistory,
  WalletSearch,
} from "@/components";
import {
  useAccountAge,
  useAccountBalance,
  useAccountScore,
  useFetchTransactions,
  useFetchUniqueProtocols,
} from "@/hooks";
import { useEffect, useMemo, useState } from "react";
import { useAccount } from "wagmi";
import { publicClient } from "@/services/publicClient";
import { contractAddress, abi } from "@/abis/LensScoreSBT.info";

const Dashboard: NextPage = () => {
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [hasMintedNft, setHasMintedNft] = useState<boolean>(false);

  /**
   * Read data to generate score
   */
  const account = useAccount();
  const { tx, monthsWithTx } = useFetchTransactions(walletAddress);
  const { uniqueProtocols: uniqueProtocolsUsed } = useFetchUniqueProtocols(
    walletAddress,
    tx
  );
  const { balanceWithDecimals } = useAccountBalance(walletAddress);
  const { accountAgeMonths } = useAccountAge(walletAddress);

  /**
   * Read NFT minted logs
   */
  const checkIfNFTisMinted = async () => {
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
  };

  useEffect(() => {
    if (account.address != undefined) {
      setWalletAddress(account.address as string);
      checkIfNFTisMinted();
    }
  }, [account]);

  const userProfile = useMemo(
    () => ({
      transactions: tx.length,
      accountAgeMonths: accountAgeMonths,
      protocolsUsed: uniqueProtocolsUsed,
      monthsInteracting: monthsWithTx,
      grassBalance: balanceWithDecimals,
    }),
    [
      tx,
      uniqueProtocolsUsed,
      balanceWithDecimals,
      monthsWithTx,
      accountAgeMonths,
    ]
  );

  const { score } = useAccountScore(userProfile);

  const onWalletAddressChange = (address: string) => {
    setWalletAddress(address);
  };

  return (
    <div className="bg-base-100 text-primary-content min-h-screen">
      {/* Main Dashboard */}
      <main className="p-4 md:p-8">
        <div className="container mx-auto">
          {/* Wallet Search */}
          <WalletSearch onChange={onWalletAddressChange} />

          {/* Account summary stats */}
          <AccountSummary walletAddress={walletAddress} />

          <section className="flex flex-col md:flex-row flex-grow justify-around text-base-content my-6 space-y-6 md:space-y-0 md:space-x-6">
            <ScoreCard normalizedScore={score.normalized} />
            <div className="flex flex-col justify-center justify-items-center">
              <LensProfileCard />
              {hasMintedNft ? (
                <>
                  <SaveScoreButton
                    walletAddress={walletAddress}
                    score={score}
                  />
                  <DisplayNFT walletAddress={walletAddress} />
                </>
              ) : (
                <MintNFTButton walletAddress={walletAddress} score={score} />
              )}
            </div>

            <ScoreAnalysisCard score={score} />
          </section>

          {/* Metrics Breakdown */}
          <section>
            <MetricsList score={score} />
          </section>

          {/* Score History */}
          {/* <section>
            <ScoreHistory />
          </section> */}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
