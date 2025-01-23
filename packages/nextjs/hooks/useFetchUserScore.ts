import { useState, useEffect } from "react";
import { Score } from "@/types";

const initialScoreState: Score = {
  total: 0,
  normalized: 0,
  txScore: 0,
  accAgeScore: 0,
  protocolsScore: 0,
  monthsInteractingScore: 0,
  grassBalanceScore: 0,
};

export const useFetchUserScore = (
  wallet: `0x${string}`
): { score: Score; isLoading: boolean } => {
  const [score, setScore] = useState<Score>(initialScoreState);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchScore = async () => {
      try {
        const storedScore = localStorage.getItem(`score-${wallet}`);
        if (storedScore) {
          setScore(JSON.parse(storedScore));
        } else {
          const fetchedScore = await fetch("/api/score?wallet=" + wallet);
          const { score: fetchScoreParsed } = await fetchedScore.json();
          const newScore: Score = {
            total: fetchScoreParsed.total,
            normalized: 0,
            txScore: fetchScoreParsed.transactionsScore,
            accAgeScore: fetchScoreParsed.walletAgeScore,
            protocolsScore: fetchScoreParsed.uniqueProtocolsScore,
            monthsInteractingScore: fetchScoreParsed.engagementScore,
            grassBalanceScore: fetchScoreParsed.balanceScore,
          }
          setScore(newScore);
          localStorage.setItem(`score-${wallet}`, JSON.stringify(newScore));
        }
      } catch (err) {
        console.error("Error fetching score:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (wallet != "0x0") {
      fetchScore();
    }
  }, [wallet]);

  return { score, isLoading };
};
