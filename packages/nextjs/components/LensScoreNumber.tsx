"use client";

import { Score } from "@/types";
import { useEffect, useState } from "react";

interface LensScoreNumberProps {
  score: Score;
}

export const LensScoreNumber = ({ score }: LensScoreNumberProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      let start = 0;
      const duration = 1000;
      const increment = score.total / (duration / 16);

      const animateScore = () => {
        start += increment;
        if (start < score.total) {
          setDisplayScore(Math.floor(start));
          requestAnimationFrame(animateScore);
        } else {
          setDisplayScore(score.total);
        }
      };

      requestAnimationFrame(animateScore);
    }, 1000);

    return () => clearTimeout(timer);
  }, [score.total]);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center my-4">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <p className="text-7xl text-accent font-bold my-4">{displayScore}</p>
      )}
    </>
  );
};
