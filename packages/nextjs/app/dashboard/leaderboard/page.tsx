import { ScoreGauge } from "@/components";
import Leaderboard from "@/components/Leaderboard";
import { Score } from "@/types";
import { NextPage } from "next";

const LeaderboardPage: NextPage = () => {
  const score: Score = {
    total: 80,
    normalized: 31,
    txScore: 20,
    accAgeScore: 0,
    protocolsScore: 50,
    monthsInteractingScore: 5,
    grassBalanceScore: 5,
  };
  return (
    <div className="min-h-screen bg-base-200 text-base-content p-6">
      <div className="max-w-5xl mx-auto space-y-10">
        <header className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-primary">Leaderboard</h1>
          <p className="text-lg text-base-content">
            Track your performance and see how you compare to others.
          </p>
        </header>

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
        </div>

        <div className="bg-base-100 shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-center mb-4">
            Top Leaders
          </h2>
          <div className="overflow-x-auto ">
            <table className="table w-full text-lg">
              <thead>
                <tr>
                  <th className="bg-neutral text-neutral-content text-lg">
                    Rank
                  </th>
                  <th className="bg-neutral text-neutral-content text-lg">
                    User
                  </th>
                  <th className="bg-neutral text-neutral-content text-lg">
                    Score
                  </th>
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
      </div>
    </div>
  );
};

{
  /* </section> */
}
{
  /* // <section classNameName="bg-base-200 min-h-screen p-6 flex flex-col items-center">
    //   <div classNameName="flex flex-row">
    //     <div classNameName="w-1/6">
    //       <ScoreGauge score={score.normalized} />
    //     </div>
    //     <div classNameName="w-1/2">
    //       <Leaderboard />
    //     </div>
    //   </div>
    // </section> */
}
{
  /* ); */
}

export default LeaderboardPage;
