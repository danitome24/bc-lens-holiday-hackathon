"use client";

import { abi, contractAddress } from "@/abis/LensScoreSBT.info";
import { useTransactionNotification } from "@/hooks";
import { Score } from "@/types";
import {
  generateIPFSFileFromNFT,
  generateNFT,
  uploadNFTToIPFS,
} from "@/utils/nftManagement";
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
  const {
    data: hash,
    isPending,
    writeContractAsync,
    error: writeError,
  } = useWriteContract();

  const handleMintNFT = async () => {
    const nftInSVGFormat = generateNFT(score, walletAddress);
    const formData = generateIPFSFileFromNFT(nftInSVGFormat);
    const ipfsHash = await uploadNFTToIPFS(formData);

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
    isConfirming || isPending,
    isConfirmed,
    writeError != undefined || receiptError != null,
    (writeError as BaseError)?.shortMessage || receiptError?.message
  );

  if (walletAddress == "") {
    return <></>;
  }

  return (
    <>
      <button onClick={() => handleMintNFT()} className="btn btn-secondary">
        {isPending
          ? "Minting..."
          : isConfirming
          ? "Confirming..."
          : isConfirmed
          ? "Minted!"
          : "Mint NFT"}
      </button>
      {writeError && (
        <p className="text-red-500">
          Error writing:{" "}
          {(writeError as BaseError).shortMessage || writeError.message}
        </p>
      )}
      {receiptError && (
        <p className="text-red-500">
          Transaction failed: {receiptError.message}
        </p>
      )}
    </>
  );
};
