import React from "react";
import { Prediction, Team } from "../../../../../shared/types/database";
import TeamPrediction from "../TeamPrediction";
import { format } from "date-fns";

interface SinglePredictionProps {
  homeTeam: Team;
  awayTeam: Team;
  username: string;
  prediction: Omit<Prediction, "username">;
  dateTime: number;
  onChange: (prediction: Omit<Prediction, "username">) => void;
}

const SinglePrediction: React.FC<SinglePredictionProps> = ({
  homeTeam,
  awayTeam,
  prediction,
  dateTime,
  onChange,
}) => {
  const { homeTeamScore, awayTeamScore } = prediction;

  const incrementHomeScore = () =>
    onChange({
      ...prediction,
      homeTeamScore: homeTeamScore + 1,
    });

  const decrementHomeScore = () =>
    onChange({
      ...prediction,
      homeTeamScore: Math.max(0, homeTeamScore - 1),
    });

  const incrementAwayScore = () =>
    onChange({
      ...prediction,
      awayTeamScore: awayTeamScore + 1,
    });

  const decrementAwayScore = () =>
    onChange({
      ...prediction,
      awayTeamScore: Math.max(0, awayTeamScore - 1),
    });

  const formattedTime = format(dateTime, "do MMM HH:mm");

  return (
    <div className="flex w-full justify-center md:w-auto">
      <div className="bg-shamrock-400 flex w-full flex-col items-center justify-around gap-1 rounded-md p-2 px-4">
        <div className="text-shamrock-950 text-center text-sm font-semibold">
          {formattedTime}
        </div>
        <div className="flex w-full">
          <TeamPrediction
            teamName={homeTeam.name}
            score={homeTeamScore}
            incrementScore={incrementHomeScore}
            decrementScore={decrementHomeScore}
          />
          <TeamPrediction
            teamName={awayTeam.name}
            score={awayTeamScore}
            incrementScore={incrementAwayScore}
            decrementScore={decrementAwayScore}
            inverted
          />
        </div>
      </div>
    </div>
  );
};

export default SinglePrediction;
