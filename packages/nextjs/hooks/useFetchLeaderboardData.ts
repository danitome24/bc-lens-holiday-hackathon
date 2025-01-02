import { useEffect, useState } from "react";
import { abi, contractAddress } from "@/abis/LensScoreSBT.info";
import { publicClient } from "@/services/publicClient";

export const useLeaderboardData = () => {
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
  }, []);

  return {sortedData: sortedLeaderboard };
};
