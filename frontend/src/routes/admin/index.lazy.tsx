import { createLazyFileRoute, Navigate } from "@tanstack/react-router";
import { useGetMe } from "../../queries/useGetMe";
import { useGetTeams } from "../../queries/useGetTeams";
import { useGetFixtures } from "../../queries/useGetFixtures";
import { useGetUsers } from "../../queries/useGetUsers";
import AdminEntity from "../../components/Admin/AdminEntity";
import { useMemo } from "react";
import dayjs from "dayjs";
import Loading from "../../components/Loading";
import { useDeleteFixture } from "../../queries/useDeleteFixture";
import { useDeleteTeam } from "../../queries/useDeleteTeam";
import { useDeleteUser } from "../../queries/useDeleteUser";

const Admin = () => {
  const { data: user, isLoading: userIsLoading } = useGetMe();
  const { data: teams } = useGetTeams();
  const { data: fixtures } = useGetFixtures();
  const { data: users } = useGetUsers();

  const onDeleteSuccess = () => window.location.reload();

  const { mutate: deleteFixture } = useDeleteFixture(onDeleteSuccess);
  const { mutate: deleteTeam } = useDeleteTeam(onDeleteSuccess);
  const { mutate: deleteUser } = useDeleteUser(onDeleteSuccess);

  const fixuresWithNames = useMemo(() => {
    return fixtures.map((fixture) => {
      const homeTeam = teams.find((team) => team.id === fixture.homeTeamId);
      const awayTeam = teams.find((team) => team.id === fixture.awayTeamId);

      return {
        id: fixture.id,
        name: fixture.homeTeamId
          ? `${homeTeam?.name} vs ${awayTeam?.name} @ ${dayjs(
              fixture.dateTime
            ).format("D MMM HH:mm")}`
          : "TBD",
      };
    });
  }, [fixtures, teams]);

  if (userIsLoading) {
    return <Loading />;
  }

  if (!user || !user.admin) {
    return <Navigate to="/" />;
  }

  const onUserDelete = (username: string) => {
    deleteUser({ username: username });
  };

  const onTeamDelete = (teamId: string | number) => {
    deleteTeam({ id: Number(teamId) });
  };

  const onFixtureDelete = (fixtureId: string | number) => {
    deleteFixture({ id: Number(fixtureId) });
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center justify-center gap-4">
        <AdminEntity
          name="Fixtures"
          entities={fixuresWithNames}
          path="fixtures"
          onDelete={onFixtureDelete}
        />

        <AdminEntity
          name="Users"
          entities={users.map((user) => ({
            id: user.username,
            name: user.username,
          }))}
          path="users"
          onDelete={onUserDelete}
          hasAddNew={false}
        />

        <AdminEntity
          name="Teams"
          entities={teams}
          path="teams"
          onDelete={onTeamDelete}
        />
      </div>
    </div>
  );
};

export const Route = createLazyFileRoute("/admin/")({
  component: Admin,
});
