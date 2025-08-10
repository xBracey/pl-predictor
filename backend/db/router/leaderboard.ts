import {
  getLeaderboardByRoundHandler,
  getLeaderboardsHandler,
} from "../services/leaderboard";
import { Router } from "./types";

export const buildLeaderboardRoutes: Router = (fastify, _, done) => {
  fastify.get("/rounds/:roundNumber", getLeaderboardByRoundHandler);
  fastify.get("/:timePeriod", getLeaderboardsHandler);
  done();
};
