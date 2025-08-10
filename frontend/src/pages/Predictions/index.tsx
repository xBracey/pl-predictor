import { Dialog, Loader } from "@mantine/core";
import { Fixture, Prediction, Team } from "../../../../shared/types/database";
import { usePredictions } from "./usePredictions";
import { Fragment, useEffect, useState } from "react";
import Banner from "../../components/Banner";
// import UserBonuses from "../../components/UserBonuses";
import SinglePrediction from "../../components/Prediction/SinglePrediction";
import PredictionLock from "../../components/PredictionLock";

// TODO fix dynamically
const predictionLockTime = 1918474400000; // 2024-06-15 20:00:00

interface PredictionsPageProps {
  fixtures: Fixture[];
  predictions: Prediction[];
  teams: Team[];
  username: string;
  onPredictionChange: (prediction: Prediction) => void;
  isSavingPrediction: boolean;
  isError: boolean;
  onEditBonusTeam: (teamId: number) => void;
}

export const PredictionsPage = ({
  fixtures,
  predictions,
  teams,
  username,
  onPredictionChange,
  isSavingPrediction,
  isError,
  onEditBonusTeam,
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

  const isPredictionLocked = currentTime > predictionLockTime || true;

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

      {/* <UserBonuses
        onEditBonusTeam={onEditBonusTeam}
        teams={teams}
        isPredictionLocked={isPredictionLocked}
      /> */}

      <div className="mx-auto mt-6 flex w-full max-w-4xl flex-col gap-12">
        {Object.entries(groupFixtures).map(([roundNumber, predictions]) => (
          <div className="flex flex-col gap-2" key={roundNumber}>
            <h2 className="text-center text-2xl font-bold text-white">
              Round {roundNumber}
            </h2>

            <div className="my-4 grid grid-cols-1 gap-4 py-2 md:grid-cols-2">
              {predictions.map((prediction) => (
                <SinglePrediction
                  key={prediction.fixture.id}
                  homeTeam={prediction.homeTeam}
                  awayTeam={prediction.awayTeam}
                  username={username}
                  prediction={prediction.prediction}
                  onChange={onEditPrediction}
                />
              ))}
            </div>

            <PredictionLock isLocked={false} />
          </div>
        ))}
      </div>
    </div>
  );
};
