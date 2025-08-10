import { Router } from "./types";
import { buildUserRoutes } from "./users";
import { buildTeamsRoutes } from "./teams";
import { buildFixturesRoutes } from "./fixtures";
import { buildPredictionsRoutes } from "./predictions";
import { buildLeaderboardRoutes } from "./leaderboard";

export const buildApiRoutes: Router = (fastify, _, done) => {
  fastify.register(buildUserRoutes, { prefix: "/users" });
  fastify.register(buildTeamsRoutes, { prefix: "/teams" });
  fastify.register(buildFixturesRoutes, { prefix: "/fixtures" });
  fastify.register(buildPredictionsRoutes, {
    prefix: "/predictions",
  });
  fastify.register(buildLeaderboardRoutes, {
    prefix: "/leaderboard",
  });
  done();
};
