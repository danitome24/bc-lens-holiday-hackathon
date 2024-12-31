"use client";

import { useFetchSBTMinted } from "@/hooks";
import { Score } from "@/types";
import { useEffect, useState } from "react";

type LensScoreCardProps = {
  score: Score;
};

export const LensScoreCard = ({ score }: LensScoreCardProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [displayScore, setDisplayScore] = useState(0);

  const { isMinted } = useFetchSBTMinted();

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
    <div className="card bg-base-300 shadow-lg w-full max-w-lg p-8 rounded-lg text-center">
      <h1 className="text-4xl font-extrabold text-primary">Your Lens Score</h1>
      {isLoading ? (
        <div className="flex justify-center items-center my-4">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <p className="text-7xl text-accent font-bold my-4">{displayScore}</p>
      )}
      <p className="text-gray-400 mb-6">
        You are in the top <span className="font-bold">X%</span> of users.
      </p>

      {isMinted ? (
        <div id="mint-status" className="my-6">
          <span
            className="badge badge-success badge-lg text-lg font-bold"
            id="nft-status"
          >
            NFT Minted
          </span>
        </div>
      ) : (
        <></>
      )}

      {isMinted ? (
        <button className="btn btn-secondary w-full">See your NFT</button>
      ) : (
        <button className="btn btn-secondary w-full">
          Mint your LensScore SBT
        </button>
      )}
    </div>
  );
};
