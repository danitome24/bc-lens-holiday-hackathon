"use client";

import {
  useWaitForTransactionReceipt,
  useWriteContract,
  type BaseError,
} from "wagmi";
import { abi, contractAddress } from "@/abis/LensScoreSBT.info";
import { Score } from "@/types";
import {
  generateIPFSFileFromNFT,
  generateNFT,
  uploadNFTToIPFS,
} from "@/utils/nftManagement";
import { useTransactionNotification } from "@/hooks";
import { useState } from "react";

type SaveScoreButtonProps = {
  walletAddress: string;
  score: Score;
  needsScoreBeUpdated: boolean;
};

export const SaveScoreButton = ({
  walletAddress,
  score,
  needsScoreBeUpdated,
}: SaveScoreButtonProps) => {
  const [isGeneratingNFT, setIsGeneratingNFT] = useState(false);
  const {
    data: hash,
    error: writeError,
    writeContractAsync,
    isPending,
  } = useWriteContract();

  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    error: receiptError,
  } = useWaitForTransactionReceipt({
    hash,
  });

  const handleSaveScore = async (score: Score, walletAddress: string) => {
    setIsGeneratingNFT(true);
    const nftInSVGFormat = generateNFT(score, walletAddress);
    const formData = generateIPFSFileFromNFT(nftInSVGFormat);
    const ipfsHash = await uploadNFTToIPFS(formData);
    setIsGeneratingNFT(false);

    try {
      await writeContractAsync({
        abi: abi,
        address: contractAddress,
        functionName: "updateScore",
        args: [BigInt(score.total), ipfsHash],
      });
    } catch (e) {
      console.error("Write Error:", e);
    }
  };

  useTransactionNotification(
    isConfirming || isPending || isGeneratingNFT,
    isConfirmed,
    writeError != undefined || receiptError != null,
    (writeError as BaseError)?.shortMessage || receiptError?.message
  );

  if (walletAddress === "") {
    return null;
  }

  const isButtonDisabled = isPending || isConfirming || !needsScoreBeUpdated || isGeneratingNFT;

  return (
    <button
      className="btn btn-secondary w-full max-w-xs"
      onClick={() => handleSaveScore(score, walletAddress)}
      disabled={isButtonDisabled}
    >
      {isPending
        ? "Saving..."
        : isConfirming
        ? "Confirming..."
        : isConfirmed
        ? "Saved!"
        : "Save Score"}
    </button>
  );
};
