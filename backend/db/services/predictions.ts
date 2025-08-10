import { FastifyInstance } from "fastify";
import {
  getPredictionsByUsername,
  insertPredictions,
  insertRoundPredictions,
} from "../repositories/predictions";
import { ServiceHandler } from "./types";
import { tokenToUser } from "./utils";
import { InsertPrediction } from "../schema";
import { getFixture } from "../repositories/fixtures";

export const getPredictionsHandler: ServiceHandler = async (req, reply) => {
  const { username } = req.params as { username: string };

  const predictions = await getPredictionsByUsername(username);

  reply.send(predictions);
};

export const insertPredictionsHandler: (
  server: FastifyInstance
) => ServiceHandler = (server) => async (req, reply) => {
  const userDecoded = await tokenToUser(server, req, reply);

  if (!userDecoded) {
    return;
  }

  const predictions = req.body as InsertPrediction[];

  const predictionsByRound = new Map<number, InsertPrediction[]>();
  for (const prediction of predictions) {
    const fixture = await getFixture(prediction.fixtureId!);
    if (!fixture) {
      reply
        .status(400)
        .send({ error: `Fixture with id ${prediction.fixtureId} not found` });
      return;
    }
    const roundNumber = fixture.roundNumber!;
    if (!predictionsByRound.has(roundNumber)) {
      predictionsByRound.set(roundNumber, []);
    }
    predictionsByRound.get(roundNumber)!.push(prediction);
  }

  // Insert predictions for each round
  for (const [roundNumber, roundPredictions] of predictionsByRound) {
    await insertRoundPredictions(
      userDecoded.username,
      roundNumber,
      roundPredictions
    );
  }

  reply.send(
    predictions.map((prediction) => ({
      ...prediction,
      username: userDecoded.username,
    }))
  );
};
