import { useMutation } from "react-query";
import { apiRequest } from "./utils";

interface DeleteFixtureRequest {
  id: number;
}

const deleteFixture = async ({ id }: DeleteFixtureRequest) => {
  const resp = await apiRequest<void>(`/fixtures/${id}`, {
    method: "DELETE",
  });

  return resp;
};

export const useDeleteFixture = (onSuccess: () => void) => {
  return useMutation(deleteFixture, { onSuccess });
};
