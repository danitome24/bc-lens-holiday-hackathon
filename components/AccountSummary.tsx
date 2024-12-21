import { ActiveSinceStat } from "./ActiveSinceStat";
import BalanceStat from "./BalanceStat";
import { AddressStat } from "./AddressStat";

type AccountSummaryProps = {
  walletAddress: string;
};

export const AccountSummary = ({walletAddress}: AccountSummaryProps) => {
  return (
    <section className="flex flex-col my-6 rounded-xl">
      <div className="stats shadow flex flex-col md:flex-row justify-between bg-base-200">
        <AddressStat walletAddress={walletAddress} />

        <ActiveSinceStat walletAddress={walletAddress} />

        <BalanceStat walletAddress={walletAddress} />
      </div>
    </section>
  );
};
