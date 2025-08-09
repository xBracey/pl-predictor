import { db } from "..";
import { predictions, users } from "../schema";
import { eq, sql } from "drizzle-orm";

export const getAllUsersPoints = async () => {
  const points = await db
    .select({
      username: users.username,
      totalPoints: sql<number>`coalesce(sum(predictions.points), 0)`,
    })
    .from(users)
    .leftJoin(predictions, eq(users.username, predictions.username))
    .groupBy(users.username)
    .execute();

  return points;
};

export const getPointsForUsers = async (usernames: string[]) => {
  const userPoints = await getAllUsersPoints();
  return usernames.map((username) =>
    userPoints.find((user) => user.username === username)
  );
};

export const getUserPoints = async (username: string) => {
  const userPoints = await getAllUsersPoints();
  return userPoints.find((user) => user.username === username);
};
