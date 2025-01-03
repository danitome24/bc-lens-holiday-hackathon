"use client";

import { Score } from "@/types";
import { useEffect, useState } from "react";

interface LensScoreNumberProps {
  score: Score;
}

export const LensScoreNumber = ({ score }: LensScoreNumberProps) => {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    if (score.total > 0) {
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
    }
  }, [score.total]);

  return (
    <p className="text-7xl text-accent font-bold my-4">{displayScore}</p>
  );
};
