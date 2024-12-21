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
  LensProfileCard,
  MetricsList,
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

const Dashboard: NextPage = () => {
  const [walletAddress, setWalletAddress] = useState<string>("");

  const account = useAccount();

  useEffect(() => {
    if (account.address != undefined) {
      setWalletAddress(account.address as string);
    }
  }, [account]);

  const { tx, monthsWithTx } = useFetchTransactions(walletAddress);
  const { uniqueProtocols: uniqueProtocolsUsed } = useFetchUniqueProtocols(
    walletAddress,
    tx
  );
  const { balanceWithDecimals } = useAccountBalance();
  const { accountAgeMonths } = useAccountAge(walletAddress);

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

  return (
    <div className="bg-base-100 text-primary-content min-h-screen">
      {/* Main Dashboard */}
      <main className="p-4 md:p-8">
        <div className="container mx-auto">
          {/* Wallet Search */}
          <WalletSearch />

          {/* Account summary stats */}
          <AccountSummary />

          <section className="flex flex-col md:flex-row flex-grow justify-around text-base-content my-6 space-y-6 md:space-y-0 md:space-x-6">
            <ScoreCard normalizedScore={score.normalized} />

            <LensProfileCard />

            <ScoreAnalysisCard score={score} />
          </section>

          {/* Metrics Breakdown */}
          <section>
            <MetricsList score={score} />
          </section>

          {/* Score History */}
          <section>
            <ScoreHistory />
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
