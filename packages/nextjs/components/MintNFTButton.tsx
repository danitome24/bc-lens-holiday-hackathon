import { contractAddress, abi } from "@/abis/LensScoreSBT.info";
import { Score } from "@/types";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";

type MintNFTButtonProps = {
  walletAddress: string;
  score: Score;
};

export const MintNFTButton = ({ walletAddress, score }: MintNFTButtonProps) => {
  const { data: hash, isPending, writeContractAsync } = useWriteContract();

  const handleMintNFT = async () => {
    await writeContractAsync({
      abi,
      address: contractAddress,
      functionName: "mint",
    });
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  return (
    <button onClick={() => handleMintNFT()} className="btn btn-secondary">
      {isPending
        ? "Minting..."
        : isConfirming
        ? "Confirming..."
        : isConfirmed
        ? "Minted!"
        : "Mint NFT"}
    </button>
  );
};
