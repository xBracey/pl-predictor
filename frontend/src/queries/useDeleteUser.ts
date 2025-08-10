import { useMutation } from "react-query";
import { apiRequest } from "./utils";

interface DeleteUserRequest {
  username: string;
}

const deleteUser = async ({ username }: DeleteUserRequest) => {
  const resp = await apiRequest<void>(`/users/${username}`, {
    method: "DELETE",
  });

  return resp;
};

export const useDeleteUser = (onSuccess: () => void) => {
  return useMutation(deleteUser, { onSuccess });
};
