import React from "react";

export const Leaderboard = () => {
  return (
    <div className="bg-base-100 shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold text-center mb-4">Top Leaders</h2>
      <div className="overflow-x-auto ">
        <table className="table w-full text-lg">
          <thead>
            <tr>
              <th className="bg-neutral text-neutral-content text-lg">Rank</th>
              <th className="bg-neutral text-neutral-content text-lg">User</th>
              <th className="bg-neutral text-neutral-content text-lg">Score</th>
              <th className="bg-neutral text-neutral-content text-lg">
                Normalized
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover">
              <td>1</td>
              <td>0x123...abc</td>
              <td>950</td>
              <td>95%</td>
            </tr>
            <tr className="hover">
              <td>2</td>
              <td>0x456...def</td>
              <td>920</td>
              <td>92%</td>
            </tr>
            <tr className="hover">
              <td>3</td>
              <td>0x789...ghi</td>
              <td>910</td>
              <td>91%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
