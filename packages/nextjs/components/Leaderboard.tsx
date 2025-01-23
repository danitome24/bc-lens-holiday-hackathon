"use client";

import React from "react";
import { UserIdentifier } from ".";

import { useLeaderboardData } from "@/hooks";

export const Leaderboard = () => {
  const {sortedData: sortedLeaderboard} = useLeaderboardData();

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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
