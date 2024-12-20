import React from "react";

interface LeaderboardProps {
  // Define any props for the component here
}

const participants = [
  { rank: 1, name: "Alice Johnson", score: 250 },
  { rank: 2, name: "Bob Smith", score: 200 },
  { rank: 3, name: "Charlie Brown", score: 180 },
  { rank: 4, name: "Diana Prince", score: 150 },
  { rank: 5, name: "Eve Adams", score: 120 },
];

const Leaderboard: React.FC<LeaderboardProps> = (props) => {
  return (
    <div className="flex flex-col items-center py-10 px-5">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">🏆 Leaderboard</h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden w-full max-w-3xl">
        <table className="table-auto w-full border-collapse">
          <thead className="bg-green-500 text-white">
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
                className={`${
                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                } hover:bg-green-100 transition-colors`}
              >
                <td className="py-3 px-4 text-gray-700 font-medium">
                  {participant.rank}
                </td>
                <td className="py-3 px-4 text-gray-700">{participant.name}</td>
                <td className="py-3 px-4 text-gray-700 text-right">
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
