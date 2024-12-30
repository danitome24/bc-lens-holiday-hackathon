"use client"

import { ConnectKitButton } from "connectkit";
import { NextPage } from "next";
import Link from "next/link";
import { useAccount } from "wagmi";

const Home: NextPage = () => {
  const account = useAccount();

  return (
    <>
      <header className="bg-gradient-to-b from-base-300 to-base-100 py-6 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold text-primary">LensSocialScore</h1>
          <ConnectKitButton />
        </div>
      </header>
      <section className="relative py-20 bg-gray-900 text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-r from-secondary-content via-indigo-500 to-info animate-gradient-x opacity-60"
          aria-hidden="true"
        ></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
            Discover Your Lens Score
          </h1>
          <p className="text-lg mb-8">
            Unlock insights into your Lens profile and dominate the leaderboard.
            Connect your wallet to begin.
          </p>
          {account.address != undefined ? (
            <Link href={"/dashboard"} className="btn btn-success btn-lg px-8">
              See your score
            </Link>
          ) : (
            <ConnectKitButton.Custom>
              {({ show }) => {
                return (
                  <button onClick={show} className="btn btn-primary btn-lg">
                    Connect Wallet
                  </button>
                );
              }}
            </ConnectKitButton.Custom>
          )}
        </div>

        <div
          className="absolute inset-0 bg-black/50 pointer-events-none"
          aria-hidden="true"
        ></div>
      </section>

      <section className="py-16 bg-base-100">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-primary mb-12">
            Why LensSocialScore?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-base-200 rounded-lg shadow-lg hover:scale-105 transition-transform">
              <div className="text-6xl text-accent mb-4">📊</div>
              <h3 className="text-2xl font-bold text-secondary">
                Detailed Insights
              </h3>
              <p className="text-base-content mt-4">
                Get an in-depth breakdown of your activity on Lens Protocol,
                from posts to interactions.
              </p>
            </div>
            <div className="p-6 bg-base-200 rounded-lg shadow-lg hover:scale-105 transition-transform">
              <div className="text-6xl text-accent mb-4">🏆</div>
              <h3 className="text-2xl font-bold text-secondary">Leaderboard</h3>
              <p className="text-base-content mt-4">
                Compete with others and see how your score stacks up against the
                top users.
              </p>
            </div>
            <div className="p-6 bg-base-200 rounded-lg shadow-lg hover:scale-105 transition-transform">
              <div className="text-6xl text-accent mb-4">🎖️</div>
              <h3 className="text-2xl font-bold text-secondary">
                SoulBound Token
              </h3>
              <p className="text-base-content mt-4">
                Mint your SoulBound Token (SBT) and use your score in multiple
                DApps.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-gradient-to-r from-base-300 to-base-100">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-primary mb-12">
            What Makes Your Score Unique?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 bg-base-200 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-base-content">
                Wallet Address
              </h3>
              <p className="text-base-content mt-2">
                Your score is tied directly to your wallet.
              </p>
            </div>
            <div className="p-6 bg-base-200 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-base-content">
                Activity Time
              </h3>
              <p className="text-base-content mt-2">
                Track your engagement and interactions over time.
              </p>
            </div>
            <div className="p-6 bg-base-200 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-base-content">
                Normalized Score
              </h3>
              <p className="text-base-content mt-2">
                Compare fairly with a normalized score system.
              </p>
            </div>
            <div className="p-6 bg-base-200 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-base-content">
                Visual Insights
              </h3>
              <p className="text-base-content mt-2">
                Analyze your growth with charts and graphs.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-base-200">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-extrabold text-primary mb-6">
            Ready to Explore Your Score?
          </h2>
          <p className="text-lg text-base-content mb-8">
            Connect your wallet to see your impact, mint your SBT, and start
            climbing the leaderboard.
          </p>
          {account.address != undefined ? (
            <Link href={"/dashboard"} className="btn btn-success btn-lg">
              See your score
            </Link>
          ) : (
            <ConnectKitButton.Custom>
              {({ show }) => {
                return (
                  <button onClick={show} className="btn btn-primary btn-lg">
                    Connect Wallet
                  </button>
                );
              }}
            </ConnectKitButton.Custom>
          )}
        </div>
      </section>
      <footer className="py-6 bg-base-100">
        <div className="container mx-auto text-center">
          <p className="text-base-content">
            © 2024 LensSocialScore | Built for the decentralized social
            revolution.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Home;
