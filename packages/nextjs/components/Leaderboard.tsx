import Link from "next/link";
import React from "react";

// const participants = [
//   { rank: 1, name: "Alice Johnson", score: 250 },
//   { rank: 2, name: "Bob Smith", score: 200 },
//   { rank: 3, name: "Charlie Brown", score: 180 },
//   { rank: 4, name: "Diana Prince", score: 150 },
//   { rank: 5, name: "Eve Adams", score: 120 },
// ];

const Leaderboard = () => {
  return (
    <div className="leaderboard-container min-h-screen p-6 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold text-primary mb-8">Leaderboard</h1>

      <div className="card bg-base-300 shadow-lg w-full max-w-4xl p-8 rounded-lg">
        <div className="overflow-x-auto">
          <table className="table w-full text-base-content">
            <thead>
              <tr className="bg-base-300">
                <th className="text-left">Rank</th>
                <th className="text-left">Lens Profile</th>
                <th className="text-left">Score</th>
                <th className="text-left">Active Time</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#1</td>
                <td className="font-bold text-accent">@TopUser</td>
                <td>1500</td>
                <td>2 years, 1 month</td>
              </tr>
              <tr>
                <td>#2</td>
                <td className="font-bold text-accent">@LensPro</td>
                <td>1450</td>
                <td>1 year, 11 months</td>
              </tr>
              <tr>
                <td>#3</td>
                <td className="font-bold text-accent">@RisingStar</td>
                <td>1420</td>
                <td>1 year, 6 months</td>
              </tr>
              <tr>
                <td>#4</td>
                <td className="font-bold text-accent">@User123</td>
                <td>1400</td>
                <td>1 year, 4 months</td>
              </tr>
              <tr>
                <td>#5</td>
                <td className="font-bold text-accent">@LensFan</td>
                <td>1350</td>
                <td>1 year, 2 months</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <Link href={"/dashboard"} className="btn btn-secondary mt-8">Back to Dashboard</Link>
    </div>
  );
};

export default Leaderboard;
