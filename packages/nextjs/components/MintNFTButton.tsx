import { Score } from "@/types";

type MintNFTButtonProps = {
  walletAddress: string;
  score: Score;
}

export const MintNFTButton = ({walletAddress, score}: MintNFTButtonProps) => {
  return <button>MINT NFT</button>;
};
