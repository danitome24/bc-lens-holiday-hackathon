import Leaderboard from "@/components/Leaderboard";
import { NextPage } from "next";

const LeaderboardPage: NextPage = () => {
  return (
    <div className=" bg-gray-50 text-gray-800">
      <main className="p-8">
        <Leaderboard />
      </main>
    </div>
  );
};

export default LeaderboardPage;
