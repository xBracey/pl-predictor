import { db } from "..";
import { fixtures, predictions, users } from "../schema";
import { sql, eq, desc, and } from "drizzle-orm";

export const getLeaderboard = async () => {
  const result = await db
    .select({
      username: users.username,
      totalPoints: sql<number>`sum(${predictions.points})`.mapWith(Number),
    })
    .from(users)
    .leftJoin(predictions, eq(users.username, predictions.username))
    .groupBy(users.username)
    .orderBy(desc(sql`sum(${predictions.points})`));

  return result;
};

interface MonthlyLeaderboardEntry {
  username: string;
  totalPoints: number;
}

export const getMonthlyLeaderboard = async (
  year: number,
  month: number
): Promise<MonthlyLeaderboardEntry[]> => {
  if (typeof year !== "number" || year < 1900 || year > 2100) {
    throw new Error("Invalid year provided.");
  }
  if (typeof month !== "number" || month < 1 || month > 12) {
    throw new Error("Invalid month provided. Month must be between 1 and 12.");
  }

  try {
    const result = await db
      .select({
        username: users.username,
        totalPoints: sql<number>`sum(${predictions.points})`.mapWith(Number),
      })
      .from(users)
      .leftJoin(predictions, eq(users.username, predictions.username))
      .leftJoin(fixtures, eq(predictions.fixtureId, fixtures.id))
      .where(
        and(
          sql`CAST(STRFTIME('%Y', ${fixtures.dateTime}, 'unixepoch') AS INTEGER) = ${year}`,
          sql`CAST(STRFTIME('%m', ${fixtures.dateTime}, 'unixepoch') AS INTEGER) = ${month}`
        )
      )
      .groupBy(users.username)
      .orderBy(desc(sql`sum(${predictions.points})`));

    return result;
  } catch (error) {
    console.error(
      `Error fetching monthly leaderboard for ${year}-${month}:`,
      error
    );
    throw new Error(
      "Failed to retrieve monthly leaderboard due to a database error."
    );
  }
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
