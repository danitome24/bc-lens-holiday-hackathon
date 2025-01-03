"use client";

import { useFetchSBTMinted } from "@/hooks";
import { Score } from "@/types";
import { LensScoreNumber } from "./LensScoreNumber";
import { MintNFTButton } from "./MintNFTButton";
import Link from "next/link";
import { useEffect, useState } from "react";

type LensScoreCardProps = {
  score: Score;
  walletAddress: string;
};

export const LensScoreCard = ({ score, walletAddress }: LensScoreCardProps) => {
  const { isMinted: initialIsMinted } = useFetchSBTMinted();
  const [isMinted, setIsMinted] = useState(initialIsMinted);
  
  useEffect(() => {
    setIsMinted(false);
  }, [initialIsMinted]);

  const handleMinted = () => {
    setIsMinted(true);
  };

  return (
    <div className="card bg-base-300 shadow-lg w-full max-w-lg p-8 rounded-lg text-center">
      <h1 className="text-4xl font-extrabold text-primary">Your Lens Score</h1>
      <LensScoreNumber score={score} />
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
        <Link href={"/dashboard/sbt"} className="btn btn-secondary w-full">
          See your NFT
        </Link>
      ) : (
        <MintNFTButton
          walletAddress={walletAddress}
          score={score}
          onMinted={handleMinted}
        />
      )}
    </div>
  );
};
