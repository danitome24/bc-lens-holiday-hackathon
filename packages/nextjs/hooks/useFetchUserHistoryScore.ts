import { abi, contractAddress } from "@/abis/LensScoreSBT.info";
import { publicClient } from "@/services/publicClient";
import { useEffect, useState } from "react";

type ScoreHistory = {
  month: string;
  score: number;
};

export const useFetchUserHistoryScore = (walletAddress: string) => {
  const [historyScore, setHistoryScore] = useState<ScoreHistory[]>([]);

  useEffect(() => {
    const fetchUserHistoryScore = async () => {
      const logs = await publicClient.getContractEvents({
        address: contractAddress,
        abi,
        eventName: "ScoreUpdated",
        args: { owner: walletAddress },
        fromBlock: BigInt(100237),
      });

      const scoreHistoryData = logs.map((log: any) => {
        const { timestamp, score } = log.args;
        const month = new Date(Number(timestamp) * 1000).toLocaleString(
          "en-US",
          { month: "short", day: "numeric" }
        );
        return { month, score: Number(score) };
      });

      setHistoryScore(
        scoreHistoryData.sort((a, b) => a.month.localeCompare(b.month))
      );
    };
    if (walletAddress != "") {
      fetchUserHistoryScore();
    }
  }, [walletAddress]);

  return { data: historyScore };
};
