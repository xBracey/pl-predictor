import { PredictionState } from "./types";

export const onEditBonuses = (
  state: PredictionState,
  payload: {
    teamId?: number;
    saved: boolean;
  }
): PredictionState => {
  if (payload.teamId) {
    return {
      ...state,
      bonuses: {
        saved: payload.saved,
        teamId: payload.teamId,
      },
    };
  }
  if (payload.teamId) {
    return {
      ...state,
      bonuses: {
        ...state.bonuses,
        teamId: payload.teamId,
        saved: payload.saved,
      },
    };
  }
  return state;
};
