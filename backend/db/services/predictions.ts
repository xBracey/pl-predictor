import { FastifyInstance } from "fastify";
import {
  getPredictionsByUsername,
  insertPredictions,
} from "../repositories/predictions";
import { ServiceHandler } from "./types";
import { tokenToUser } from "./utils";
import { InsertPrediction } from "../schema";

// TODO sort out
const predictionLockTime = 1918474400000; // 2024-06-15 20:00:00

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

  if (Date.now() > predictionLockTime) {
    reply.status(403).send({ error: "Predictions are locked" });
    return;
  }

  const { username } = userDecoded;

  const predictions = req.body as InsertPrediction[];

  await insertPredictions(username, predictions);

  reply.send(predictions.map((prediction) => ({ ...prediction, username })));
};
