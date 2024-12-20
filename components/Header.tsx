"use client";

import { ConnectKitButton } from "connectkit";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Header = () => {
  const currentPath = usePathname();

  return (
    <div className="navbar bg-base-300 text-base-content">
      <div className="navbar-start">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link
              href="/dashboard"
              className={currentPath === "/dashboard" ? "active" : ""}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/leaderboard"
              className={currentPath === "/leaderboard" ? "active" : ""}
            >
              Leaderboard
            </Link>
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
