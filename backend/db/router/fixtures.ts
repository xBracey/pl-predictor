import { Router } from "./types";
import {
  editFixtureHandler,
  getFixtureHandler,
  getFixturesHandler,
  insertFixturesHandler,
  deleteFixtureHandler,
  getGroupLockTimesHandler,
} from "../services/fixtures";

export const buildFixturesRoutes: Router = (fastify, _, done) => {
  fastify.get("/", getFixturesHandler);
  fastify.post("/", insertFixturesHandler);
  fastify.get("/:id", getFixtureHandler);
  fastify.put("/:id", editFixtureHandler);
  fastify.delete("/:id", deleteFixtureHandler);
  fastify.get("/group-locks", getGroupLockTimesHandler);
  done();
};
