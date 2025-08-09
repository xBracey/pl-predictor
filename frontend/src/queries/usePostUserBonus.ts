import { useMutation } from "react-query";
import { apiRequest } from "./utils";
import { User } from "../../../shared/types/database";
import { useUserStore } from "../zustand/user";

interface PostUserBonusesRequest {
  bonusTeamId?: number;
  token: string;
}

export const editUserBonuses = async ({
  bonusTeamId,
  token,
}: PostUserBonusesRequest) => {
  try {
    const resp = await apiRequest<User>(`/users/me/bonuses`, {
      method: "PUT",
      data: { bonusTeamId },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return resp;
  } catch (error) {
    console.log(error);
    return { error: "Fixture could not be posted" };
  }
};

export const usePostUserBonuses = (onSuccess: (user: User) => void) => {
  const { token } = useUserStore();

  const postPutUserBonuses = ({ bonusTeamId }: { bonusTeamId?: number }) => {
    return editUserBonuses({ bonusTeamId, token });
  };

  const { mutate, isLoading, isError, data } = useMutation(postPutUserBonuses, {
    onSuccess,
  });
  return { data, postUserBonuses: mutate, isLoading, isError };
};
