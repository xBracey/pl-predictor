import { Dialog, Loader } from "@mantine/core";
import { Fixture, Prediction, Team } from "../../../../shared/types/database";
import { usePredictions } from "./usePredictions";
import { Fragment, useEffect, useState, useMemo } from "react";
import Banner from "../../components/Banner";
import { RoundPredictions } from "../../components/RoundPredictions";
import { LockTime } from "../../queries/useGetGroupLockTimes";

interface PredictionsPageProps {
  fixtures: Fixture[];
  predictions: Prediction[];
  teams: Team[];
  username: string;
  onPredictionChange: (prediction: Prediction) => void;
  isSavingPrediction: boolean;
  isError: boolean;
  groupLockTimes: LockTime[];
}

export const PredictionsPage = ({
  fixtures,
  predictions,
  teams,
  username,
  onPredictionChange,
  isSavingPrediction,
  isError,
  groupLockTimes,
}: PredictionsPageProps) => {
  const [currentTime, setCurrentTime] = useState(Date.now());

  const groupFixtures = usePredictions(fixtures, predictions, teams);

  const onEditPrediction = (prediction: Prediction) => {
    onPredictionChange(prediction);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const openRound = useMemo(() => {
    // Find the "live" round, if any
    let openRound: string | null = null;
    for (const roundNumber in groupFixtures) {
      const predictions = groupFixtures[roundNumber];

      if (predictions.length === 0) continue;

      const firstFixtureTime = Math.min(
        ...predictions.map((p) => p.fixture.dateTime)
      );
      const lastFixtureTime = Math.max(
        ...predictions.map((p) => p.fixture.dateTime)
      );

      if (currentTime >= firstFixtureTime && currentTime <= lastFixtureTime) {
        return roundNumber;
      }
    }

    // If no round is live, find the earliest unlocked round
    for (const roundNumber in groupFixtures) {
      const lockTime = groupLockTimes.find(
        (lockTime) => lockTime.roundNumber === Number(roundNumber)
      )?.predictionLockTime;

      if (!lockTime || currentTime < lockTime) {
        openRound = roundNumber;
        break;
      }
    }

    return openRound;
  }, [currentTime, groupFixtures, groupLockTimes]);

  return (
    <div className="flex flex-col items-center justify-center">
      <Dialog opened={isSavingPrediction || isError}>
        {isError ? (
          <p className="text-center text-sm text-red-600">
            Error - Predictions editing failed, please refresh the page and try
            again.
          </p>
        ) : (
          <Fragment>
            <div className="mb-2 flex items-center justify-center gap-4">
              <Loader color="blue" size="sm" className="mr-4" />
            </div>
            <p className="text-center text-sm text-blue-600">
              Saving prediction, please wait until this dialog is closed.
            </p>
          </Fragment>
        )}
      </Dialog>

      <Banner>
        <h2 className="text-2xl font-bold text-white">Predictions</h2>
      </Banner>

      {Object.entries(groupFixtures).map(([roundNumber, predictions]) => {
        const lockTime = groupLockTimes.find(
          (lockTime) => lockTime.roundNumber === Number(roundNumber)
        )?.predictionLockTime;

        const isOpenByDefault = roundNumber === openRound;

        return (
          <RoundPredictions
            key={roundNumber}
            roundNumber={roundNumber}
            predictions={predictions}
            lockTime={lockTime}
            currentTime={currentTime}
            username={username}
            onEditPrediction={onEditPrediction}
            isOpenByDefault={isOpenByDefault}
          />
        );
      })}
    </div>
  );
};
