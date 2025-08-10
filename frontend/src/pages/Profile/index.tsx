import { useMemo, useState } from "react";
import {
  User,
  Team,
  Fixture,
  Prediction,
} from "../../../../shared/types/database";
import Banner from "../../components/Banner";
import FixturePoints from "../../components/FixturePoints";
import LogoutButton from "../../components/LogoutButton";

interface ProfilePageProps {
  user: User;
  teams: Team[];
  fixtures: Fixture[];
  predictions: Prediction[];
  isCurrentUser: boolean;
}

export const ProfilePage = ({
  user,
  teams,
  fixtures,
  predictions,
  isCurrentUser,
}: ProfilePageProps) => {
  const totalPoints = useMemo(() => {
    const points = predictions.reduce((acc, prediction) => {
      return acc + prediction.points;
    }, 0);

    return points;
  }, [predictions]);

  const fixturesByRound = useMemo(() => {
    const rounds: { [round: number]: Fixture[] } = {};
    fixtures.forEach((fixture) => {
      const round = fixture.roundNumber;
      if (!rounds[round]) {
        rounds[round] = [];
      }
      rounds[round].push(fixture);
    });
    return rounds;
  }, [fixtures]);

  const [expandedRounds, setExpandedRounds] = useState<{
    [round: number]: boolean;
  }>({});

  const toggleRound = (round: number) => {
    setExpandedRounds((prev) => ({
      ...prev,
      [round]: !prev[round],
    }));
  };

  return (
    <div>
      <Banner>
        <div className="flex flex-col items-center gap-4 md:flex-row">
          <h2 className="text-2xl font-bold text-white">{`${user.username}'s Profile`}</h2>
          {isCurrentUser && <LogoutButton />}
        </div>
      </Banner>
      <div className="my-4 flex flex-col items-center">
        <p className="my-4 text-xl font-bold text-white">{`Total points: ${totalPoints}`}</p>
      </div>
      <div className="mx-auto flex w-full max-w-xl flex-col gap-4 overflow-hidden">
        {Object.keys(fixturesByRound).map((roundKey) => {
          const round = parseInt(roundKey);
          return (
            <div key={round} className="mb-4">
              <button
                className={`bg-shamrock-900 w-full p-2 text-lg font-bold text-white ${
                  expandedRounds[round] ? "rounded-t-md" : "rounded-md"
                }`}
                onClick={() => toggleRound(round)}
              >
                Round {round}
              </button>
              {expandedRounds[round] && (
                <FixturePoints
                  fixtures={fixturesByRound[round]}
                  teams={teams}
                  predictions={predictions}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
