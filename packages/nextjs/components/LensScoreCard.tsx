import { Score } from "@/types";

type LensScoreCardProps = {
  score: Score;
}

export const LensScoreCard = ({score}: LensScoreCardProps) => {
  return (
    <div className="card bg-base-300 shadow-lg w-full max-w-lg p-8 rounded-lg text-center">
    <h1 className="text-4xl font-extrabold text-primary">
      Your Lens Score
    </h1>
    <p className="text-7xl text-accent font-bold my-4">{score.total}</p>
    <p className="text-gray-400 mb-6">
      You are in the top <span className="font-bold">15%</span> of users.
    </p>

    <div id="mint-status" className="my-6">
      <span
        className="badge badge-success badge-lg text-lg font-bold"
        id="nft-status"
      >
        NFT Minted
      </span>
    </div>

    <button className="btn btn-secondary w-full">
      Mint your LensScore SBT
    </button>
  </div>
  )
}