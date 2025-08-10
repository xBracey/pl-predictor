import { createLazyFileRoute, Navigate } from "@tanstack/react-router";

import FixturesPage from "../pages/Fixtures";

import { useGetFixtures } from "../queries/useGetFixtures";
import { useGetMe } from "../queries/useGetMe";
import { useGetTeams } from "../queries/useGetTeams";
import Loading from "../components/Loading";

const Fixtures = () => {
  const { data: user, isLoading: userIsLoading } = useGetMe();
  const { data: teams, isLoading: isTeamsLoading } = useGetTeams();
  const { data: fixtures, isLoading: isFixturesLoading } = useGetFixtures();

  if (userIsLoading) {
    return <Loading />;
  }

  if (!user || !user.username) {
    return <Navigate to="/login" />;
  }

  return (
    <FixturesPage
      teams={teams}
      fixtures={fixtures}
      isLoading={isTeamsLoading || isFixturesLoading}
    />
  );
};

export const Route = createLazyFileRoute("/fixtures")({
  component: Fixtures,
});
