"use client";

import { abi, contractAddress } from "@/abis/LensScoreSBT.info";
import { useTransactionNotification } from "@/hooks";
import { Score } from "@/types";
import {
  generateIPFSFileFromNFT,
  generateNFT,
  uploadNFTToIPFS,
} from "@/utils/nftManagement";
import { useState } from "react";
import {
  useWriteContract,
  useWaitForTransactionReceipt,
  type BaseError,
} from "wagmi";

type MintNFTButtonProps = {
  walletAddress: string;
  score: Score;
};

export const MintNFTButton = ({ walletAddress, score }: MintNFTButtonProps) => {
  const [isNftGenerated, setIsNftGenerated] = useState<boolean>(false);

  const {
    data: hash,
    isPending,
    writeContractAsync,
    error: writeError,
  } = useWriteContract();

  const handleMintNFT = async () => {
    setIsNftGenerated(true);
    const nftInSVGFormat = generateNFT(score, walletAddress);
    const formData = generateIPFSFileFromNFT(nftInSVGFormat);
    const ipfsHash = await uploadNFTToIPFS(formData);
    setIsNftGenerated(false);

    await writeContractAsync({
      abi,
      address: contractAddress,
      functionName: "mint",
      args: [
        { score: BigInt(score.total), timestamp: BigInt(Date.now()) },
        ipfsHash,
      ],
    });
  };

  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    error: receiptError,
  } = useWaitForTransactionReceipt({
    hash,
  });

  useTransactionNotification(
    isConfirming || isPending || isNftGenerated,
    isConfirmed,
    writeError != undefined || receiptError != null,
    (writeError as BaseError)?.shortMessage || receiptError?.message
  );

  if (walletAddress == "") {
    return <></>;
  }

  return (
    <>
      <button
        onClick={() => handleMintNFT()}
        className="btn btn-secondary w-full"
      >
        {isPending
          ? "Minting..."
          : isConfirming
          ? "Confirming..."
          : isConfirmed
          ? "Minted!"
          : "Mint NFT"}
      </button>
    </>
  );
};
