import { eq, sql } from "drizzle-orm";
import { db } from "..";
import { InsertFixture, fixtures, predictions } from "../schema";
import { calculateFixturePoints } from "../points/calculateFixturePoints";

const tenMinutes = 10 * 60 * 1000;

export const getFixtures = () => db.select().from(fixtures).execute();

export const getFixture = async (id: number) => {
  const resp = await db
    .select()
    .from(fixtures)
    .where(eq(fixtures.id, id))
    .execute();
  return resp.length ? resp[0] : null;
};

export const insertFixture = (fixture: InsertFixture) => {
  return db.insert(fixtures).values(fixture).execute();
};

export const editFixture = async (id: number, fixture: InsertFixture) => {
  await db.update(fixtures).set(fixture).where(eq(fixtures.id, id)).execute();

  const userPredictions = await db
    .select()
    .from(predictions)
    .where(eq(predictions.fixtureId, id))
    .execute();

  const newPoints = calculateFixturePoints({ ...fixture, id }, userPredictions);

  await db
    .insert(predictions)
    .values(newPoints)
    .onConflictDoUpdate({
      target: [predictions.username, predictions.fixtureId],
      set: { points: sql`excluded.points` },
    })
    .execute();
};

export const getAllGroupFixturesPredictionLockTime = async () => {
  const earliestDateTimes = await db
    .select({
      roundNumber: fixtures.roundNumber,
      dateTime: sql<number>`min(${fixtures.dateTime})`.as("dateTime"),
    })
    .from(fixtures)
    .groupBy(fixtures.roundNumber)
    .execute();

  const predictionLockTimes = earliestDateTimes.map((item) => ({
    roundNumber: item.roundNumber,
    predictionLockTime: item.dateTime - tenMinutes,
  }));

  return predictionLockTimes;
};

export const getGroupFixturesPredictionLockTime = async (
  roundNumber: number
) => {
  const earliestDateTime = await db
    .select({ dateTime: sql<number>`min(${fixtures.dateTime})` })
    .from(fixtures)
    .where(eq(fixtures.roundNumber, roundNumber))
    .execute();

  const predictionLockTime = earliestDateTime[0].dateTime - tenMinutes;

  return predictionLockTime;
};

export const deleteFixture = async (id: number) => {
  return db.delete(fixtures).where(eq(fixtures.id, id)).execute();
};
