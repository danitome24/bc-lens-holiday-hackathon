import { contractAddress, abi } from "@/abis/LensScoreSBT.info";
import { Score } from "@/types";
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
  console.log(score)
  const {
    data: hash,
    isPending,
    writeContractAsync,
    error: writeError,
  } = useWriteContract();

  const handleMintNFT = async () => {
    await writeContractAsync({
      abi,
      address: contractAddress,
      functionName: "mint",
    });
  };

  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    error: receiptError,
  } = useWaitForTransactionReceipt({
    hash,
  });

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