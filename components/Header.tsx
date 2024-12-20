"use client";

import { ConnectKitButton } from "connectkit";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Header = () => {
  const currentPath = usePathname();

  return (
    <div className="navbar bg-base-300 text-base-content">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
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
        <ul className="menu menu-horizontal px-1 hidden lg:flex">
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
        <a className="btn btn-ghost hover:bg-transparent text-sm md:text-xl">
          LensSocialScore
        </a>
      </div>
      <div className="navbar-end">
        <ConnectKitButton />
      </div>
    </div>
  );
};
