ALTER TYPE "public"."attendeeStatusEnum" ADD VALUE 'certified';--> statement-breakpoint
ALTER TABLE "reference" RENAME TO "referals";--> statement-breakpoint
ALTER TABLE "referals" ADD COLUMN "discound" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "KTU" text;