"use client";

import { abi, contractAddress } from "@/abis/LensScoreSBT.info";
import { publicClient } from "@/services/publicClient";
import React, { useEffect, useState } from "react";
import { UserIdentifier } from ".";

export const Leaderboard = () => {
  const [sortedLeaderboard, setSortedLeaderboard] = useState<
    { owner: string; score: number }[]
  >([]);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      const logs = await publicClient.getContractEvents({
        address: contractAddress,
        abi,
        eventName: "ScoreUpdated",
        fromBlock: BigInt(100237),
      });

      const leaderboard = logs.reduce(
        (acc: { [key: string]: number }, log: any) => {
          const { owner, score } = log.args;
          acc[owner] = Math.max(acc[owner] || 0, Number(score));
          return acc;
        },
        {}
      );

      const sortedLeaderboard = Object.entries(leaderboard)
        .map(([owner, score]) => ({ owner, score }))
        .sort((a, b) => b.score - a.score);

      setSortedLeaderboard(sortedLeaderboard);
    };

    fetchLeaderboardData();
  }, [publicClient]);

  return (
    <div className="bg-base-100 shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold text-center mb-4">Top Leaders</h2>
      <div className="overflow-x-auto ">
        <table className="table w-full text-lg">
          <thead>
            <tr>
              <th className="bg-neutral text-neutral-content text-lg">Rank</th>
              <th className="bg-neutral text-neutral-content text-lg">User</th>
              <th className="bg-neutral text-neutral-content text-lg">Score</th>
              <th className="bg-neutral text-neutral-content text-lg">
                Normalized
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedLeaderboard.map((entry, index) => (
              <tr key={entry.owner} className="hover">
                <td>{index + 1}</td>
                <td>
                  <UserIdentifier walletAddress={entry.owner} />
                </td>
                <td>{entry.score}</td>
                <td>{((entry.score / 260) * 100).toFixed(0)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
