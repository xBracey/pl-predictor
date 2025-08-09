import { createFileRoute } from "@tanstack/react-router";
import Loading from "../components/Loading";
import { useGetLeaderboard } from "../queries/useGetLeaderboard";
import { useGetMe } from "../queries/useGetMe";

const Leaderboard = () => {
  const { data: user } = useGetMe();
  const { data: leaderboard, isLoading: leaderboardIsLoading } =
    useGetLeaderboard();

  if (leaderboardIsLoading) {
    return <Loading />;
  }

  // TODO add all time leaderboard
  return null;
};

export const Route = createFileRoute("/leaderboard")({
  component: Leaderboard,
});
