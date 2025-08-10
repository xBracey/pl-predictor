import { useQuery } from "react-query";
import { apiRequest } from "./utils";

type TimePeriod = "monthly" | "all-time";

export interface LeaderboardEntry {
  username: string;
  totalPoints: number;
}

export const getLeaderboard = async (timePeriod: TimePeriod) => {
  return apiRequest<LeaderboardEntry[]>(`/leaderboard/${timePeriod}`, {
    method: "GET",
  });
};

export const useGetLeaderboard = (timePeriod: TimePeriod) => {
  const query = useQuery(["getLeaderboard", timePeriod], () =>
    getLeaderboard(timePeriod)
  );

  return { ...query, data: query.data || [] };
};
