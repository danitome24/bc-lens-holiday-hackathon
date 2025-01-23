"use client";

import { NextPage } from "next";
import { Leaderboard } from "@/components";

const LeaderboardPage: NextPage = () => {

  return (
    <section className="min-h-screen bg-base-200 text-base-content p-6">
      <div className="max-w-5xl mx-auto space-y-10">
        <header className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-primary">Leaderboard</h1>
          <p className="text-lg text-base-content">
            Track your performance and see how you compare to others.
          </p>
        </header>
{/* 
        <div className="bg-base-100 shadow-md rounded-lg p-6 space-y-6">
          <h2 className="text-xl font-semibold text-center">Your Score</h2>
          <div className="flex justify-center">
            <div
              className="radial-progress text-primary"
              style={
                {
                  "--value": score.normalized,
                  "--size": "12rem",
                  "--thickness": "1rem",
                } as React.CSSProperties
              }
            >
              <span className="text-2xl font-bold">{score.total}</span>
            </div>
          </div>
          <p className="text-center text-lg text-secondary">
            Your score is{" "}
            <span className="font-bold text-xl">{score.total}</span> out of a
            maximum <span className="font-bold text-xl">260</span> points.
          </p>
        </div> */}

        <Leaderboard />
      </div>
    </section>
  );
};

export default LeaderboardPage;
