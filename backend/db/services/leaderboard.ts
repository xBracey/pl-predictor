import { getLeaderboard, getLeaderboardByRound } from "../repositories/leaderboard";
import { ServiceHandler } from "./types";

export const getLeaderboardsHandler: ServiceHandler = async (
  request,
  reply
) => {
  const { timePeriod } = request.params as { timePeriod: string };

  const leaderboardData = await getLeaderboard(timePeriod);

  return reply.send(leaderboardData ?? []);
};

export const getLeaderboardByRoundHandler: ServiceHandler = async (
  request,
  reply
) => {
  const { roundNumber } = request.params as { roundNumber: number };

  const leaderboardData = await getLeaderboardByRound(roundNumber);

  return reply.send(leaderboardData ?? []);
};
