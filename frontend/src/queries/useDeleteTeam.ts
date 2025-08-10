import { useMutation } from "react-query";
import { apiRequest } from "./utils";

interface DeleteTeamRequest {
  id: number;
}

const deleteTeam = async ({ id }: DeleteTeamRequest) => {
  const resp = await apiRequest<void>(`/teams/${id}`, {
    method: "DELETE",
  });

  return resp;
};

export const useDeleteTeam = (onSuccess: () => void) => {
  return useMutation(deleteTeam, { onSuccess });
};
