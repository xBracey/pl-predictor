import { createFileRoute } from "@tanstack/react-router";
import Loading from "../components/Loading";
import { useGetLeaderboard } from "../queries/useGetLeaderboard";
import { useGetMe } from "../queries/useGetMe";
import LeaderboardComponent from "../components/Leaderboard"; // Renamed to avoid conflict
import Banner from "../components/Banner";

const Leaderboard = () => {
  const { data: user } = useGetMe();
  const { data: leaderboard, isLoading: leaderboardIsLoading } =
    useGetLeaderboard("all-time"); // Default to all-time for now

  if (leaderboardIsLoading) {
    return <Loading />;
  }

  if (!leaderboard) {
    return <p>Error loading leaderboard.</p>;
  }

  return (
    <div>
      <Banner>
        <h2 className="text-2xl font-bold text-white">All Time Leaderboard</h2>
      </Banner>

      <div className="mx-auto flex w-full max-w-xl flex-col gap-4 overflow-hidden py-4">
        <LeaderboardComponent
          leaderboard={leaderboard}
          currentUsername={user?.username}
        />
      </div>
    </div>
  );
};

export const Route = createFileRoute("/leaderboard")({
  component: Leaderboard,
});
