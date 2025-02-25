ALTER TABLE "transactions" RENAME COLUMN "hash" TO "orderId";--> statement-breakpoint
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_hash_unique";--> statement-breakpoint
ALTER TABLE "transactions" ALTER COLUMN "eventId" SET DATA TYPE uuid;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transactions" ADD CONSTRAINT "transactions_eventId_event_id_fk" FOREIGN KEY ("eventId") REFERENCES "public"."event"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "transactions_orderId_index" ON "transactions" USING btree ("orderId");--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_orderId_unique" UNIQUE("orderId");