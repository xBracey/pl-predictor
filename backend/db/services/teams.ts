import {
  editTeam,
  getTeam,
  getTeams,
  insertTeam,
  deleteTeam,
} from "../repositories/teams";
import { ServiceHandler } from "./types";

export const getTeamsHandler: ServiceHandler = async (_, reply) => {
  const teams = await getTeams();

  reply.send(teams);
};

export const getTeamHandler: ServiceHandler = async (request, reply) => {
  const { id } = request.params as { id: string };
  const team = await getTeam(parseInt(id));

  if (!team) {
    reply.status(404).send({ error: "Team not found" });
  }

  reply.send(team);
};

export const insertTeamsHandler: ServiceHandler = async (request, reply) => {
  const { name } = request.body as { name: string };

  await insertTeam({ name });

  reply.send({ name });
};

export const editTeamHandler: ServiceHandler = async (request, reply) => {
  const { id } = request.params as { id: string };
  const { name } = request.body as { name: string };

  await editTeam(parseInt(id), { name });

  reply.send({ name });
};

export const deleteTeamHandler: ServiceHandler = async (request, reply) => {
  const { id } = request.params as { id: string };

  await deleteTeam(parseInt(id));

  reply.send({ message: "Team deleted" });
};
