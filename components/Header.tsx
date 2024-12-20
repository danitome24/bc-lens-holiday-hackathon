"use client";

import { ConnectKitButton } from "connectkit";
import Link from "next/link";

export const Header = () => {
  return (
    <div className="navbar bg-base-100 text-base-content">
      <div className="navbar-start">
        <ul className="flex flex-row gap-2">
          <li>
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link href="/dashboard/leaderboard">Leaderboard</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-center">
        <a className="btn btn-ghost hover:bg-transparent text-xl">
          LensSocialScore
        </a>
      </div>
      <div className="navbar-end">
        <ConnectKitButton />
      </div>
    </div>
  );
};
