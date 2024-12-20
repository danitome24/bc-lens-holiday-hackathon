import React from "react";


const participants = [
  { rank: 1, name: "Alice Johnson", score: 250 },
  { rank: 2, name: "Bob Smith", score: 200 },
  { rank: 3, name: "Charlie Brown", score: 180 },
  { rank: 4, name: "Diana Prince", score: 150 },
  { rank: 5, name: "Eve Adams", score: 120 },
];

const Leaderboard = () => {
  return (
    <div className="flex flex-col items-center py-10 px-5">
      <h1 className="text-4xl font-bold text-secondary mb-8">🏆 Leaderboard</h1>
      <div className="shadow-md rounded-lg overflow-hidden w-full max-w-3xl">
        <table className="table-auto w-full border-collapse">
          <thead className="bg-primary text-primary-content">
            <tr>
              <th className="py-3 px-4 text-left">Rank</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-right">Score</th>
            </tr>
          </thead>
          <tbody>
            {participants.map((participant, index) => (
              <tr
                key={index}
                className="transition-colors bg-white"
              >
                <td className="py-3 px-4 text-primary-content font-medium">
                  {participant.rank}
                </td>
                <td className="py-3 px-4 text-primary-content">{participant.name}</td>
                <td className="py-3 px-4 text-primary-content text-right">
                  {participant.score}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
