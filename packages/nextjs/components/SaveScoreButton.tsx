import {
  useWaitForTransactionReceipt,
  useWriteContract,
  type BaseError,
} from "wagmi";
import { abi, contractAddress } from "@/abis/LensScoreSBT.info";
import { Score } from "@/types";

type SaveScoreButtonProps = {
  walletAddress: string;
  score: Score;
};

export const SaveScoreButton = ({
  walletAddress,
  score,
}: SaveScoreButtonProps) => {
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

  if (walletAddress === "") {
    return null;
  }

  const handleSaveScore = async (scoreToSave: number) => {
    try {
      await writeContractAsync({
        abi: abi,
        address: contractAddress,
        functionName: "updateScore",
        args: [BigInt(scoreToSave)],
      });
    } catch (e) {
      console.error("Write Error:", e);
    }
  };

  return (
    <div className="my-4">
      <button
        className="btn btn-secondary w-full"
        onClick={() => handleSaveScore(score.normalized)}
        disabled={isPending || isConfirming}
      >
        {isPending
          ? "Saving..."
          : isConfirming
          ? "Confirming..."
          : isConfirmed
          ? "Saved!"
          : "Save Score"}
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
    </div>
  );
};
