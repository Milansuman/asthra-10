CREATE TYPE "public"."attendeeStatusEnum" AS ENUM('registered', 'attended');--> statement-breakpoint
CREATE TYPE "public"."department" AS ENUM('NA', 'ai', 'ec', 'cs', 'cy', 'ct', 'ecs', 'ee', 'ce', 'me', 'mca', 'mba', 'es', 'ei');--> statement-breakpoint
CREATE TYPE "public"."endTime" AS ENUM('NA', '1 HOUR', '2 HOURS', '4 HOURS', '6 HOURS', '8 HOURS', 'HALF DAY', 'ALL DAY', '2 FULL DAYS');--> statement-breakpoint
CREATE TYPE "public"."eventStatusEnum" AS ENUM('uploaded', 'approved', 'cancel');--> statement-breakpoint
CREATE TYPE "public"."eventTypeEnum" AS ENUM('ASTHRA_PASS', 'ASTHRA_PASS_EVENT', 'WORKSHOP', 'COMPETITION');--> statement-breakpoint
CREATE TYPE "public"."registrationType" AS ENUM('online', 'spot', 'both');--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('USER', 'STUDENT_COORDINATOR', 'FACULTY_COORDINATOR', 'MANAGEMENT', 'ADMIN', 'DESK');--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('initiated', 'success', 'failed');--> statement-breakpoint
CREATE TYPE "public"."year" AS ENUM('2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', 'NA');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "event" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(256),
	"description" text,
	"secret" text,
	"poster" varchar(255) DEFAULT '/assets/poster.jpg' NOT NULL,
	"createdAt" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp,
	"createdById" uuid NOT NULL,
	"department" "department" DEFAULT 'NA' NOT NULL,
	"venue" text,
	"dateTimeStarts" timestamp DEFAULT '2025-03-06 03:30:00.000' NOT NULL,
	"dateTimeEnd" "endTime" DEFAULT 'ALL DAY' NOT NULL,
	"eventStatus" "eventStatusEnum" DEFAULT 'uploaded' NOT NULL,
	"eventType" "eventTypeEnum" DEFAULT 'ASTHRA_PASS_EVENT' NOT NULL,
	"amount" integer DEFAULT 0 NOT NULL,
	"registrationType" "registrationType" DEFAULT 'both' NOT NULL,
	"regLimit" integer DEFAULT null NOT NULL,
	"regCount" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "reference" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"referralCode" text NOT NULL,
	"transactionId" text NOT NULL,
	"status" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "transactions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"amount" integer DEFAULT 0 NOT NULL,
	"status" "status" DEFAULT 'initiated' NOT NULL,
	"hash" varchar(256),
	"userName" varchar(255) NOT NULL,
	"userId" uuid NOT NULL,
	"eventId" varchar(256) NOT NULL,
	"eventName" varchar(256) NOT NULL,
	"remark" text,
	CONSTRAINT "transactions_hash_unique" UNIQUE("hash")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "userRegisteredEvent" (
	"registrationId" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" uuid NOT NULL,
	"eventId" uuid NOT NULL,
	"transactionId" uuid NOT NULL,
	"remark" text,
	"status" "attendeeStatusEnum" DEFAULT 'registered'
);
--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "number" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "role" "role" DEFAULT 'USER' NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "department" "department" DEFAULT 'NA' NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "year" "year" DEFAULT 'NA' NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "college" text DEFAULT 'NA';--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "asthraCredit" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "asthraPass" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "asthraPassTransactionId" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "event" ADD CONSTRAINT "event_createdById_user_id_fk" FOREIGN KEY ("createdById") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transactions" ADD CONSTRAINT "transactions_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "userRegisteredEvent" ADD CONSTRAINT "userRegisteredEvent_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "userRegisteredEvent" ADD CONSTRAINT "userRegisteredEvent_eventId_event_id_fk" FOREIGN KEY ("eventId") REFERENCES "public"."event"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "userRegisteredEvent" ADD CONSTRAINT "userRegisteredEvent_transactionId_transactions_id_fk" FOREIGN KEY ("transactionId") REFERENCES "public"."transactions"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "event_createdById_index" ON "event" USING btree ("createdById");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "transactions_userId_index" ON "transactions" USING btree ("userId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "transactions_eventId_index" ON "transactions" USING btree ("eventId");