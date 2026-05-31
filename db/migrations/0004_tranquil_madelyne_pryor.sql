PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_trips` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`tags` text NOT NULL,
	`transport` text NOT NULL,
	`companions` integer NOT NULL,
	`duration` integer NOT NULL,
	`from_date` integer NOT NULL,
	`to_date` integer NOT NULL,
	`countries` text NOT NULL,
	`likes` integer DEFAULT 0 NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_trips`("id", "user_id", "tags", "transport", "companions", "duration", "from_date", "to_date", "countries", "likes", "created_at") SELECT "id", "user_id", "tags", "transport", "companions", "duration", "from_date", "to_date", "countries", "likes", "created_at" FROM `trips`;--> statement-breakpoint
DROP TABLE `trips`;--> statement-breakpoint
ALTER TABLE `__new_trips` RENAME TO `trips`;--> statement-breakpoint
PRAGMA foreign_keys=ON;