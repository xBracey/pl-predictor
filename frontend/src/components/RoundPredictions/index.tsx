import PredictionLock from "../PredictionLock";
import { Fixture, Prediction, Team } from "../../../../shared/types/database";
import SinglePrediction from "../Prediction/SinglePrediction";
import { useEffect, useState, useMemo } from "react";
import { Lock } from "../Icons/Icons";

interface RoundPredictionsProps {
  roundNumber: string;
  predictions: {
    fixture: Fixture;
    homeTeam: Team;
    awayTeam: Team;
    prediction: Prediction | undefined;
  }[];
  lockTime: number | undefined;
  currentTime: number;
  username: string;
  onEditPrediction: (prediction: Prediction) => void;
  isOpenByDefault?: boolean;
}

export const RoundPredictions = ({
  roundNumber,
  predictions,
  lockTime,
  currentTime,
  username,
  onEditPrediction,
  isOpenByDefault = false,
}: RoundPredictionsProps) => {
  const isLocked = lockTime && currentTime > lockTime;
  const [isOpen, setIsOpen] = useState(isOpenByDefault);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setIsOpen(isOpenByDefault);
  }, [isOpenByDefault]);

  const sortedPredictions = useMemo(() => {
    return [...predictions].sort(
      (a, b) => a.fixture.dateTime - b.fixture.dateTime
    );
  }, [predictions]);

  return (
    <div className="relative w-full">
      <div
        key={roundNumber}
        className="mx-auto mt-6 flex w-full max-w-4xl flex-col"
      >
        <button
          onClick={toggleOpen}
          className={`relative flex w-full items-center justify-center gap-4 rounded-md p-2 text-center text-2xl font-bold text-white ${
            isLocked ? "bg-shamrock-900" : "bg-azure-900"
          }`}
        >
          Round {roundNumber}{" "}
          {isLocked ? <Lock className="absolute right-4 h-6 w-6" /> : null}
        </button>

        {isOpen && (
          <div className="flex flex-col gap-2">
            {isLocked && (
              <div className="absolute top-20 bottom-2 -left-4 -right-4 z-10 bg-black opacity-20" />
            )}

            <div className="my-4 grid grid-cols-1 gap-4 py-2 md:grid-cols-2">
              {sortedPredictions.map((prediction) => (
                <SinglePrediction
                  key={prediction.fixture.id}
                  homeTeam={prediction.homeTeam}
                  awayTeam={prediction.awayTeam}
                  username={username}
                  prediction={prediction.prediction}
                  dateTime={prediction.fixture.dateTime}
                  onChange={onEditPrediction}
                />
              ))}
            </div>

            <PredictionLock isLocked={isLocked} />
          </div>
        )}
      </div>
    </div>
  );
};
