import { relations, sql } from 'drizzle-orm';
import {
  index,
  integer,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import type { AdapterAccount } from 'next-auth/adapters';

export const user = pgTable(
  'user',
  {
    id: uuid().defaultRandom().primaryKey(),

    name: varchar('name', { length: 255 }),
    email: varchar('email', { length: 255 }).notNull(),
    image: varchar('image', { length: 255 }),

    // phone: varchar({ length: 256 }).unique(),
    // type: userTypeEnum().default('unknown').notNull(),

    emailVerified: timestamp('emailVerified', {
      mode: 'date',
    }).default(sql`CURRENT_TIMESTAMP`),
    createdAt: timestamp().default(sql`CURRENT_TIMESTAMP`).notNull(),
    updatedAt: timestamp()
      .default(sql`CURRENT_TIMESTAMP`)
      .$onUpdateFn(() => new Date())
      .notNull(),
  },
  (table) => ({
    clientEmailIndex: uniqueIndex().on(table.email),
  })
);

export const userRelations = relations(user, ({ many }) => ({
  accounts: many(accounts),
}));

export const accounts = pgTable(
  'account',
  {
    userId: uuid()
      .notNull()
      .references(() => user.id),
    type: varchar('type', { length: 255 })
      .$type<AdapterAccount['type']>()
      .notNull(),
    provider: varchar('provider', { length: 255 }).notNull(),
    providerAccountId: varchar('providerAccountId', { length: 255 }).notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: varchar('token_type', { length: 255 }),
    scope: varchar('scope', { length: 255 }),
    id_token: text('id_token'),
    session_state: varchar('session_state', { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: index('account_userId_idx').on(account.userId),
  })
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(user, { fields: [accounts.userId], references: [user.id] }),
}));

export const sessions = pgTable(
  'session',
  {
    sessionToken: varchar('sessionToken', { length: 255 })
      .notNull()
      .primaryKey(),
    userId: uuid()
      .notNull()
      .references(() => user.id),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
  },
  (session) => ({
    userIdIdx: index('session_userId_idx').on(session.userId),
  })
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(user, { fields: [sessions.userId], references: [user.id] }),
}));

export const verificationTokens = pgTable(
  'verificationToken',
  {
    identifier: varchar('identifier', { length: 255 }).notNull(),
    token: varchar('token', { length: 255 }).notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
);
