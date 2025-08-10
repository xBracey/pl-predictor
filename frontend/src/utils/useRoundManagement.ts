import { useState, useEffect, useMemo } from "react";
import { Fixture } from "../../../shared/types/database";

interface UseRoundManagementProps {
  fixtures: Fixture[];
}

interface UseRoundManagementResult {
  groupedFixtures: { [key: number]: Fixture[] };
  openRound: number | null;
  toggleRound: (roundNumber: number) => void;
  defaultOpenRound: number | null;
}

const useRoundManagement = ({
  fixtures,
}: UseRoundManagementProps): UseRoundManagementResult => {
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [openRound, setOpenRound] = useState<number | null>(null);

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

  const defaultOpenRound = useMemo(() => {
    if (!fixtures) return null;

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

    const firstRound = Object.keys(groupedFixtures)[0];
    return firstRound ? Number(firstRound) : null;
  }, [groupedFixtures, currentTime, fixtures]);

  useEffect(() => {
    setOpenRound(defaultOpenRound);
  }, [defaultOpenRound]);

  const toggleRound = (roundNumber: number) => {
    setOpenRound((prevRound) =>
      prevRound === roundNumber ? null : roundNumber
    );
  };

  return {
    groupedFixtures,
    openRound,
    toggleRound,
    defaultOpenRound,
  };
};

export default useRoundManagement;
