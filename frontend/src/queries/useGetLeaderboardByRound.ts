import { useQuery } from "react-query";
import { apiRequest } from "./utils";
import { LeaderboardEntry } from "./useGetLeaderboard";

export const getLeaderboardByRound = async (roundNumber: number) => {
  return apiRequest<LeaderboardEntry[]>(`/leaderboard/rounds/${roundNumber}`, {
    method: "GET",
  });
};

export const useGetLeaderboardByRound = (roundNumber: number) => {
  const query = useQuery(["getLeaderboard", roundNumber], () =>
    getLeaderboardByRound(roundNumber)
  );

  return { ...query, data: query.data || [] };
};
