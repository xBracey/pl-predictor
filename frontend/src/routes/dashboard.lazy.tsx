import { createLazyFileRoute, Navigate } from "@tanstack/react-router";
import { useGetMe } from "../queries/useGetMe";
import { useUserStore } from "../zustand/user";
import Loading from "../components/Loading";
import TodaysMatches from "../components/TodaysMatches";
import { useGetTeams } from "../queries/useGetTeams";
import { useGetFixtures } from "../queries/useGetFixtures";
import useRoundManagement from "../utils/useRoundManagement";
import { useEffect, useMemo, useState } from "react";
import { Select } from "@mantine/core";
import { useGetLeaderboardByRound } from "../queries/useGetLeaderboardByRound";
import Leaderboard from "../components/Leaderboard";
import { useGetLeaderboard } from "../queries/useGetLeaderboard";

const Dashboard = () => {
  const { token } = useUserStore();
  const { data: user } = useGetMe();
  const { data: teams } = useGetTeams();
  const { data: fixtures } = useGetFixtures();

  const { openRound } = useRoundManagement({
    fixtures: fixtures ?? [],
  });

  const [selectedRound, setSelectedRound] = useState(openRound);

  useEffect(() => {
    setSelectedRound(openRound);
  }, [openRound]);

  const { data: leaderboard } = useGetLeaderboardByRound(selectedRound);
  const { data: allTimeLeaderboard } = useGetLeaderboard("all-time");

  const roundNumbers = useMemo(() => {
    if (!fixtures) return [];
    return [...new Set(fixtures.map((fixture) => fixture.roundNumber))];
  }, [fixtures]);

  if (!token) {
    return <Navigate to="/login" from="/dashboard" />;
  }

  if (!user) {
    return <Loading />;
  }

  return (
    <div>
      <TodaysMatches teams={teams} fixtures={fixtures} />
      <div className="mx-auto flex w-full max-w-xl flex-col gap-4 overflow-hidden py-4 text-center">
        <h2 className="text-2xl font-bold text-white">Round Leaderboard</h2>

        <Select
          value={selectedRound?.toString() || ""}
          placeholder="Select Round"
          data={roundNumbers.map((roundNumber) => ({
            value: roundNumber.toString(),
            label: `Round ${roundNumber}`,
          }))}
          onChange={(value) => setSelectedRound(value ? parseInt(value) : null)}
          allowDeselect={false}
        />
        <Leaderboard
          leaderboard={leaderboard}
          currentUsername={user.username}
        />

        <br />

        <h2 className="text-2xl font-bold text-white">All Time Leaderboard</h2>

        <Leaderboard
          leaderboard={allTimeLeaderboard}
          currentUsername={user.username}
        />
      </div>
    </div>
  );
};

export const Route = createLazyFileRoute("/dashboard")({
  component: Dashboard,
});
