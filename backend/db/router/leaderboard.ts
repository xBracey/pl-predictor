import {
  getLeaderboardByRoundHandler,
  getLeaderboardsHandler,
  getMonthlyLeaderboardsHandler,
} from "../services/leaderboard";
import { Router } from "./types";

export const buildLeaderboardRoutes: Router = (fastify, _, done) => {
  fastify.get("/rounds/:roundNumber", getLeaderboardByRoundHandler);
  fastify.get("/monthly/:year/:month", getMonthlyLeaderboardsHandler);
  fastify.get("/:timePeriod", getLeaderboardsHandler);
  done();
};
