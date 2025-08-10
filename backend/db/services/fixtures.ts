import {
  editFixture,
  getFixture,
  getFixtures,
  insertFixture,
  deleteFixture,
  getAllGroupFixturesPredictionLockTime,
} from "../repositories/fixtures";
import { ServiceHandler } from "./types";

export const getFixturesHandler: ServiceHandler = async (_, reply) => {
  const fixtures = await getFixtures();

  reply.send(fixtures);
};

export const getFixtureHandler: ServiceHandler = async (request, reply) => {
  const { id } = request.params as { id: string };
  const fixture = await getFixture(parseInt(id));

  if (!fixture) {
    reply.status(404).send({ error: "Fixture not found" });
  }

  reply.send(fixture);
};

export const insertFixturesHandler: ServiceHandler = async (request, reply) => {
  const data = request.body as {
    homeTeamId: number;
    awayTeamId: number;
    dateTime: number;
    roundNumber: number;
  };

  await insertFixture(data);

  reply.send(data);
};

export const editFixtureHandler: ServiceHandler = async (request, reply) => {
  const { id } = request.params as { id: string };

  const data = request.body as {
    roundNumber: number;
    homeTeamId: number;
    awayTeamId: number;
    dateTime: number;
  };

  await editFixture(parseInt(id), data);

  reply.send(data);
};

export const getGroupLockTimesHandler: ServiceHandler = async (_, reply) => {
  const lockTimes = await getAllGroupFixturesPredictionLockTime();
  reply.send(lockTimes);
};

export const deleteFixtureHandler: ServiceHandler = async (request, reply) => {
  const { id } = request.params as { id: string };

  await deleteFixture(parseInt(id));

  reply.send({ message: "Fixture deleted" });
};
