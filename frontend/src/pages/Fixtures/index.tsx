import { useGetFixtures } from "../../queries/useGetFixtures";
import { Team, Fixture } from "../../../../shared/types/database";
import FixtureList from "../../components/FixtureList";
import { useState, useEffect, useMemo } from "react";
import { Lock } from "../../components/Icons/Icons";
import Loading from "../../components/Loading";
import Banner from "../../components/Banner";

interface FixturesPageProps {
  teams: Team[];
  fixtures: Fixture[];
  isLoading: boolean;
}

const FixturesPage = ({ teams, fixtures, isLoading }: FixturesPageProps) => {
  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const groupedFixtures = useMemo(() => {
    if (!fixtures) return {};

    return fixtures.reduce((acc: { [key: number]: Fixture[] }, fixture) => {
      if (!acc[fixture.roundNumber]) {
        acc[fixture.roundNumber] = [];
      }
      acc[fixture.roundNumber].push(fixture);
      return acc;
    }, {});
  }, [fixtures]);

  const [openRound, setOpenRound] = useState<number | null>(null);

  // Determine which round should be open by default
  const defaultOpenRound = useMemo(() => {
    if (!fixtures) return null;

    // Check for live rounds
    for (const roundNumber in groupedFixtures) {
      const roundFixtures = groupedFixtures[roundNumber];
      if (roundFixtures.length === 0) continue;

      const firstFixtureTime = Math.min(
        ...roundFixtures.map((f) => f.dateTime)
      );
      const lastFixtureTime = Math.max(...roundFixtures.map((f) => f.dateTime));

      if (currentTime >= firstFixtureTime && currentTime <= lastFixtureTime) {
        return Number(roundNumber);
      }
    }

    // If no round is live, return the first round
    return Number(Object.keys(groupedFixtures)[0]);
  }, [groupedFixtures, currentTime, fixtures]);

  useEffect(() => {
    setOpenRound(defaultOpenRound);
  }, [defaultOpenRound]);

  const toggleRound = (roundNumber: number) => {
    setOpenRound((prevRound) =>
      prevRound === roundNumber ? null : roundNumber
    );
  };

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

          // Determine if the round is locked (all fixtures in the round have passed)
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
