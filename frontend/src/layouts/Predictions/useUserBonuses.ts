import { useState } from "react";
import { User } from "../../../../shared/types/database";
import { useGetMe } from "../../queries/useGetMe";
import { usePredictionStore } from "../../zustand/predictions";
import { usePostUserBonuses } from "../../queries/usePostUserBonus";

export const useUserBonuses = () => {
  const [firstUserBonusLoad, setFirstUserBonusLoad] = useState(false);

  const { dispatch } = usePredictionStore();

  const onEditUserBonusesSuccess = (data: User) => {
    dispatch({
      type: "EDIT_BONUSES",
      payload: {
        teamId: data.bonusTeamId,
        saved: true,
      },
    });
  };

  const { postUserBonuses: editUserBonuses } = usePostUserBonuses(
    onEditUserBonusesSuccess
  );

  const onEditBonusTeam = (teamId: number) => {
    dispatch({
      type: "EDIT_BONUSES",
      payload: { teamId, saved: false },
    });
    editUserBonuses({ bonusTeamId: teamId });
  };

  const onUserBonusesSuccess = (data: User) => {
    if (firstUserBonusLoad) {
      return;
    }

    setFirstUserBonusLoad(true);

    dispatch({
      type: "EDIT_BONUSES",
      payload: {
        teamId: data.bonusTeamId,
        saved: false,
      },
    });
  };

  useGetMe(onUserBonusesSuccess);

  return { onEditBonusTeam };
};
