import { useGetFixtures } from "../../queries/useGetFixtures";
import { Team, Fixture } from "../../../../shared/types/database";
import FixtureList from "../../components/FixtureList";
import { useState, useEffect, useMemo } from "react";
import { Lock } from "../../components/Icons/Icons";
import Loading from "../../components/Loading";
import Banner from "../../components/Banner";
import useRoundManagement from "../../utils/useRoundManagement";

interface FixturesPageProps {
  teams: Team[];
  fixtures: Fixture[];
  isLoading: boolean;
}

const FixturesPage = ({ teams, fixtures, isLoading }: FixturesPageProps) => {
  const { groupedFixtures, openRound, toggleRound } = useRoundManagement({
    fixtures,
  });

  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <Banner>
        <h2 className="text-2xl font-bold text-white">Fixtures</h2>
      </Banner>

      {isLoading ? (
        <Loading />
      ) : (
        Object.entries(groupedFixtures).map(([roundNumber, roundFixtures]) => {
          const isRoundOpen = openRound === Number(roundNumber);

          const isLocked = roundFixtures.every(
            (fixture) => fixture.dateTime < currentTime
          );

          return (
            <div key={roundNumber} className="mt-6 w-full max-w-4xl">
              <button
                className={`relative flex w-full items-center justify-center gap-4 p-2 text-center text-2xl font-bold text-white ${
                  isLocked ? "bg-shamrock-900" : "bg-azure-900"
                } ${isRoundOpen ? "round-t-md" : "rounded-md"}`}
                onClick={() => toggleRound(Number(roundNumber))}
              >
                Round {roundNumber}
                {isLocked ? (
                  <Lock className="absolute right-4 h-6 w-6" />
                ) : null}
              </button>
              {isRoundOpen && (
                <FixtureList teams={teams} fixtures={roundFixtures} />
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default FixturesPage;
