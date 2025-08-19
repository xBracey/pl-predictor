import {
  getLeaderboard,
  getLeaderboardByRound,
  getMonthlyLeaderboard,
} from "../repositories/leaderboard";
import { ServiceHandler } from "./types";

export const getMonthlyLeaderboardsHandler: ServiceHandler = async (
  request,
  reply
) => {
  const { year, month } = request.params as { year: string; month: string };

  const leaderboardData = await getMonthlyLeaderboard(
    parseInt(year),
    parseInt(month)
  );

  return reply.send(leaderboardData ?? []);
};

export const getLeaderboardsHandler: ServiceHandler = async (
  request,
  reply
) => {
  const leaderboardData = await getLeaderboard();

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
