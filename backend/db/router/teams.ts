import { Router } from "./types";
import {
  editTeamHandler,
  getTeamHandler,
  getTeamsHandler,
  insertTeamsHandler,
  deleteTeamHandler,
} from "../services/teams";

export const buildTeamsRoutes: Router = (fastify, _, done) => {
  fastify.get("/", getTeamsHandler);
  fastify.post("/", insertTeamsHandler);
  fastify.get("/:id", getTeamHandler);
  fastify.put("/:id", editTeamHandler);
  fastify.delete("/:id", deleteTeamHandler);
  done();
};
