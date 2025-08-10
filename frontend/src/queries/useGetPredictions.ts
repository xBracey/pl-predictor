import { useQuery } from "react-query";
import { apiRequest } from "./utils";
import { Prediction } from "../../../shared/types/database";

export const getPredictions = async (username: string) => {
  return apiRequest<Prediction[]>(`/predictions/${username}`, {
    method: "GET",
  });
};

export const useGetPredictions = (
  username: string,
  timestamp: number,
  onSuccess?: (predictions: Prediction[]) => void
) => {
  const query = useQuery(
    ["getPredictions", username, timestamp],
    () => getPredictions(username),
    {
      onSuccess,
    }
  );

  return { ...query, data: query.data || [] };
};
