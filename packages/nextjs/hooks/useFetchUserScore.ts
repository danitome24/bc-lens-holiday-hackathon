import { Score } from "@/types";
import { useState, useEffect } from "react";

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
): {
  score: Score;
  refreshScore: () => Promise<void>;
  isLoading: boolean;
} => {
  const [score, setScore] = useState<Score>(initialScoreState);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchScore = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/score?wallet=${wallet}`);
      console.log(wallet);
      const { score: fetchedScore } = await response.json();
      const newScore: Score = {
        total: fetchedScore.total,
        normalized: 0,
        txScore: fetchedScore.transactionsScore,
        accAgeScore: fetchedScore.walletAgeScore,
        protocolsScore: fetchedScore.uniqueProtocolsScore,
        monthsInteractingScore: fetchedScore.engagementScore,
        grassBalanceScore: fetchedScore.balanceScore,
      };
      setScore(newScore);
      localStorage.setItem(`score-${wallet}`, JSON.stringify(newScore));
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const getScore = async () => {
    setIsLoading(true);
    try {
      const scoreInLocalStorage = localStorage.getItem(`score-${wallet}`);
      if (scoreInLocalStorage) {
        setScore(JSON.parse(scoreInLocalStorage));
      } else {
        await fetchScore();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }

    return score;
  };

  const refreshScore = async () => {
    await fetchScore();
  };

  useEffect(() => {
    if (wallet != "0x0") {
      getScore();
    }
  }, [wallet]);

  return { score, refreshScore, isLoading };
};
