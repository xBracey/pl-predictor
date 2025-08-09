import { useQuery } from "react-query";
import { apiRequest } from "./utils";

export const getLeaderboard = async () => {
  return apiRequest(`/leaderboard`, {
    method: "GET",
  });
};

export const useGetLeaderboard = () => {
  const query = useQuery(["getLeaderboard"], () => getLeaderboard());

  return { ...query, data: query.data || [] };
};
