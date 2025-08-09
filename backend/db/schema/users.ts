import { text, sqliteTable, integer } from "drizzle-orm/sqlite-core";
import { teams } from "./teams";

export const users = sqliteTable("users", {
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  admin: integer("admin").notNull().default(0),
  bonusTeamId: integer("bonus_team_id").references(() => teams.id),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
