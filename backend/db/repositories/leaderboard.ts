import { db } from "..";
import { fixtures, predictions, users } from "../schema";
import { sql, eq, desc } from "drizzle-orm";

export const getLeaderboard = async (timePeriod: string) => {
  let whereClause = undefined;

  if (timePeriod === "monthly") {
    whereClause = sql`strftime('%Y-%m', datetime(predictions.createdAt / 1000, 'unixepoch')) = strftime('%Y-%m', 'now')`;
  }

  const result = await db
    .select({
      username: users.username,
      totalPoints: sql<number>`sum(${predictions.points})`.mapWith(Number),
    })
    .from(users)
    .leftJoin(predictions, eq(users.username, predictions.username))
    .where(whereClause)
    .groupBy(users.username)
    .orderBy(desc(sql`sum(${predictions.points})`));

  return result;
};

export const getLeaderboardByRound = async (roundNumber: number) => {
  const result = await db
    .select({
      username: users.username,
      totalPoints: sql<number>`sum(${predictions.points})`.mapWith(Number),
    })
    .from(users)
    .leftJoin(predictions, eq(users.username, predictions.username))
    .leftJoin(fixtures, eq(predictions.fixtureId, fixtures.id))
    .where(eq(fixtures.roundNumber, roundNumber))
    .groupBy(users.username)
    .orderBy(desc(sql`sum(${predictions.points})`));

  return result;
};
