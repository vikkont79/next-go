CREATE TABLE `trips` (
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
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `likes`;