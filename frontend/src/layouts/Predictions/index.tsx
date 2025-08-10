import { Fixture, Prediction, Team } from "../../../../shared/types/database";
import { usePredictionStore } from "../../zustand/predictions";
import { PredictionsPage } from "../../pages/Predictions";
import Loading from "../../components/Loading";
import { usePredictions } from "./usePredictions";
import { useUserBonuses } from "./useUserBonuses";

interface PredictionsLayoutProps {
  username: string;
  teams: Team[];
  fixtures: Fixture[];
}

export const PredictionsLayout = ({
  username,
  teams,
  fixtures,
}: PredictionsLayoutProps) => {
  const { state, dispatch } = usePredictionStore();

  const { onEditPredictions, isError } = usePredictions(fixtures, username);
  const { onEditBonusTeam } = useUserBonuses();

  const onPredictionChange = (prediction: Prediction) => {
    dispatch({
      type: "CHANGE_PREDICTION",
      payload: { ...prediction, saved: false },
    });
    onEditPredictions();
  };

  if (!teams || !fixtures || !state.predictions) {
    return (
      <div className="flex w-full items-center justify-center">
        <div>
          <Loading />
        </div>
        <p className="text-lg text-white">Loading Predictions ...</p>
      </div>
    );
  }

  return (
    <PredictionsPage
      teams={teams}
      fixtures={fixtures}
      predictions={state.predictions}
      username={username}
      onPredictionChange={onPredictionChange}
      isSavingPrediction={state.predictions.some(
        (prediction) => prediction.saved === false
      )}
      isError={isError}
      onEditBonusTeam={onEditBonusTeam}
    />
  );
};
