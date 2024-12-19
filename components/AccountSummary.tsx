import { ActiveSinceStat } from "./ActiveSinceStat";
import BalanceStat from "./BalanceStat";
import { AddressStat } from "./AddressStat";

export const AccountSummary = () => {
  return (
    <section className="flex flex-col my-6 bg-base-100 rounded-xl">
      <div className="stats shadow flex flex-row justify-between">
        <AddressStat />

        <ActiveSinceStat />

        <BalanceStat />
      </div>
    </section>
  );
};
