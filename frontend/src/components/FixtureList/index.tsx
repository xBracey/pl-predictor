import { useMemo } from "react";
import { Fixture, Team } from "../../../../shared/types/database";
import FixtureComponent from "../Fixture";

interface IFixtureList {
  teams: Team[];
  fixtures: Fixture[];
}

const FixtureList = ({ teams, fixtures }: IFixtureList) => {
  const fixturesWithTeams = useMemo(() => {
    const data = [...fixtures].map((fixture) => {
      const homeTeam = teams.find((team) => team.id === fixture.homeTeamId);
      const awayTeam = teams.find((team) => team.id === fixture.awayTeamId);
      return {
        dateTime: fixture.dateTime,
        homeTeam: homeTeam.name,
        awayTeam: awayTeam.name,
        homeScore: fixture.homeTeamScore,
        awayScore: fixture.awayTeamScore,
        homeTeamLogo: homeTeam.logo,
        awayTeamLogo: awayTeam.logo,
      };
    });

    const dataSorted = data.sort((a, b) => a.dateTime - b.dateTime);
    return dataSorted;
  }, [fixtures, teams]);

  if (fixtures.length === 1) {
    const fixture = fixturesWithTeams[0];

    return (
      <div className="p-6">
        <FixtureComponent
          key={`${fixture.homeTeam}-${fixture.awayTeam}`}
          homeTeam={fixture.homeTeam}
          awayTeam={fixture.awayTeam}
          homeScore={fixture.homeScore}
          awayScore={fixture.awayScore}
          dateTime={fixture.dateTime}
          homeTeamLogo={fixture.homeTeamLogo}
          awayTeamLogo={fixture.awayTeamLogo}
        />
      </div>
    );
  }
  return (
    <div className="bg-pine-green-800 grid w-full grid-cols-1 items-center justify-center gap-6 p-6 md:grid-cols-2">
      {fixturesWithTeams.map((fixture) => (
        <div className="w-full">
          <FixtureComponent
            key={`${fixture.homeTeam}-${fixture.awayTeam}`}
            homeTeam={fixture.homeTeam}
            awayTeam={fixture.awayTeam}
            homeScore={fixture.homeScore}
            awayScore={fixture.awayScore}
            dateTime={fixture.dateTime}
            homeTeamLogo={fixture.homeTeamLogo}
            awayTeamLogo={fixture.awayTeamLogo}
          />
        </div>
      ))}
    </div>
  );
};

export default FixtureList;
