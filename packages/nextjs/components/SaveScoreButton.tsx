import { useWriteContract } from "wagmi";
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
  const { writeContract } = useWriteContract();

  if (walletAddress == "") {
    return <></>;
  }

  const handleSaveScore = (scoreToSave: number) => {
    writeContract({
      abi: abi,
      address: contractAddress,
      functionName: "updateScore",
      args: [BigInt(scoreToSave)]
    });
  };

  return (
    <div className="my-4">
      <button
        className="btn btn-secondary w-full"
        onClick={() => handleSaveScore(score.normalized)}
      >
        Save Score
      </button>
    </div>
  );
};
