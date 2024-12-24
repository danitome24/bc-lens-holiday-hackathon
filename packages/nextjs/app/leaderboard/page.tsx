import Leaderboard from "@/components/Leaderboard";
import { NextPage } from "next";

const LeaderboardPage: NextPage = () => {
  return (
    <div className="bg-base-100 text-primary-content">
      <main className="p-8">
        <Leaderboard />
      </main>
    </div>
  );
};

export default LeaderboardPage;
