CREATE TABLE `users` (
	`username` text NOT NULL,
	`password` text NOT NULL,
	`admin` integer DEFAULT 0 NOT NULL,
	`bonus_team_id` integer,
	FOREIGN KEY (`bonus_team_id`) REFERENCES `teams`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `teams` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text
);
--> statement-breakpoint
CREATE TABLE `fixtures` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`home_team_id` integer,
	`away_team_id` integer,
	`dateTime` integer,
	`home_team_score` integer,
	`away_team_score` integer,
	`round_number` integer,
	FOREIGN KEY (`home_team_id`) REFERENCES `teams`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`away_team_id`) REFERENCES `teams`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `predictions` (
	`username` text,
	`fixture_id` integer,
	`home_team_score` integer,
	`away_team_score` integer,
	`points` integer,
	PRIMARY KEY(`fixture_id`, `username`),
	FOREIGN KEY (`username`) REFERENCES `users`(`username`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`fixture_id`) REFERENCES `fixtures`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_username_unique` ON `users` (`username`);