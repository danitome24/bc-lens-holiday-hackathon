"use client";

import { useFetchSBTMinted } from "@/hooks";
import { ConnectKitButton } from "connectkit";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export const Header = () => {
  const pathName = usePathname();
  const { isMinted } = useFetchSBTMinted();

  const isActive = (path: string) => pathName === path;

  const links = [
    { href: "/dashboard", label: "Home", show: true },
    { href: "/dashboard/score", label: "My Score", show: true },
    { href: "/dashboard/sbt", label: "My SBT", show: isMinted },
    { href: "/dashboard/leaderboard", label: "Leaderboard", show: true },
  ];

  return (
    <header className="navbar bg-base-100 shadow-lg sticky top-0 z-50">
      <nav className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {links.map(
              (link) =>
                link.show && (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`${
                        isActive(link.href)
                          ? "text-indigo-400 font-bold"
                          : "text-gray-300"
                      } hover:text-indigo-400 transition-colors duration-300`}
                    >
                      {link.label}
                    </Link>
                  </li>
                )
            )}
          </ul>
        </div>
        <div className="flex items-center">
          <Link
            href="/"
            className="text-2xl font-extrabold text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text"
          >
            LensScoreSBT
          </Link>
        </div>
      </nav>
      <nav className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {links.map(
            (link) =>
              link.show && (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`${
                      isActive(link.href)
                        ? "text-indigo-400 font-bold"
                        : "text-gray-300"
                    } hover:text-indigo-400 transition-colors duration-300`}
                  >
                    {link.label}
                  </Link>
                </li>
              )
          )}
        </ul>
      </nav>
      <nav className="navbar-end">
        <ConnectKitButton />
      </nav>
    </header>
  );
};
