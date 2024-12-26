import { useAccount } from "wagmi";

export const SaveScoreButton = () => {
  const account = useAccount();
  if (account.address === undefined) {
    return <></>;
  }

  return (
    <div className="my-4">
      <button className="btn btn-outline btn-secondary">Save Score</button>
    </div>
  );
};
