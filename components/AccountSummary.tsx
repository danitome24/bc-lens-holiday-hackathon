import { useAccount, useBalance } from "wagmi";
import { ActiveSinceStat } from "./ActiveSinceStat";

export const AccountSummary = () => {
  const account = useAccount();
  const balance = useBalance({ address: account.address });

  const formattedAddress =
    account.address != undefined
      ? `${account.address.slice(0, 5)}...${account.address.slice(-5)}`
      : "-";

  const formattedBalance = balance.data?.value
    ? `${Number(balance.data?.value) / 10 ** balance.data.decimals} $GRASS`
    : "-";

  return (
    <section className="flex flex-col my-6 bg-base-100 rounded-xl">
      <div className="stats shadow flex flex-row justify-between">
        <div className="stat">
          <div className="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-8 w-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <div className="stat-title">Account</div>
          <div className="stat-value">{formattedAddress}</div>
          <div className="stat-desc">Jan 1st - Feb 1st</div>
        </div>

        <ActiveSinceStat />

        <div className="stat">
          <div className="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-8 w-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
              ></path>
            </svg>
          </div>
          <div className="stat-title">Balance</div>
          <div className="stat-value">{formattedBalance}</div>
          <div className="stat-desc">↘︎ 90 (14%)</div>
        </div>
      </div>
    </section>
  );
};
