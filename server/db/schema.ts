import {
  type AllDepartments,
  type AllRoles,
  type AllYears,
  AsthraStartsAt,
  type College,
  type EndTime,
  allDepartments,
  allRoles,
  allYears,
  endTime,
} from '@/logic';
import { type InferSelectModel, relations, sql } from 'drizzle-orm';
import {
  boolean,
  index,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import type { AdapterAccount } from 'next-auth/adapters';

export const roleEnum = pgEnum('role', [
  'USER',
  ...(Object.keys(allRoles) as AllRoles[]),
]);
export const departmentEnum = pgEnum('department', [
  'NA',
  ...(Object.keys(allDepartments) as AllDepartments[]), // ai, cs, eee, mca, etc
]);

export const yearEnum = pgEnum('year', [
  'NA',
  ...(Object.keys(allYears) as AllYears[]), // 2021, 2022, ...2027
]);

export const endTimeEnum = pgEnum('endTime', [
  'NA',
  ...(Object.keys(endTime) as EndTime[]), // 2021, 2022, ...2027
]);

export const statusEnum = pgEnum('status', ['initiated', 'success', 'failed']);
export const eventStatusEnum = pgEnum('eventStatusEnum', [
  'uploaded',
  'approved',
  'cancel',
]);
export const attendeeStatusEnum = pgEnum('attendeeStatusEnum', [
  'registered', // registered but not attended
  'attended',
]);

export const registrationType = pgEnum('registrationType', [
  'online', // registered but not attended\
  'spot',
  'both',
]);

export const eventTypeEnum = pgEnum('eventTypeEnum', [
  'ASTHRA_PASS', // asthra is only one event
  'ASTHRA_PASS_EVENT',
  'WORKSHOP',
  'COMPETITION',
]);

export const transactionsTable = pgTable(
  'transactions',
  {
    id: uuid().defaultRandom().primaryKey(),
    amount: integer().default(0).notNull(),
    status: statusEnum('status').default('initiated').notNull(),

    hash: varchar({ length: 256 }).unique(),

    userName: varchar({ length: 255 }).notNull(),
    userId: uuid()
      .notNull()
      .references(() => user.id),

    eventId: uuid()
      .notNull()
      .references(() => eventsTable.id),
    eventName: varchar({ length: 256 }).notNull(),

    remark: text(),
  },
  (transaction) => ({
    userIdIndex: index().on(transaction.userId),
    eventIdIndex: index().on(transaction.eventId),
  })
);

export const userRegisteredEventTable = pgTable('userRegisteredEvent', {
  registrationId: uuid().defaultRandom().primaryKey(),
  userId: uuid()
    .notNull()
    .references(() => user.id),
  eventId: uuid()
    .notNull()
    .references(() => eventsTable.id),
  transactionId: uuid()
    .notNull()
    .references(() => transactionsTable.id),
  remark: text(),
  status: attendeeStatusEnum('status').default('registered'),
});

export const referalsTable = pgTable('reference', {
  id: uuid().defaultRandom().primaryKey(),
  referralCode: text('referralCode').notNull(),
  transactionId: text('transactionId').notNull(),
  status: boolean('status').default(false).notNull(),
});

export type ReferalListType = InferSelectModel<typeof referalsTable>;

export const eventsTable = pgTable(
  'event',
  {
    id: uuid().defaultRandom().primaryKey(),

    name: varchar({ length: 256 }),
    description: text(), // anything bla bla bla
    secret: text(), // anything bla bla bla
    poster: varchar({ length: 255 }).notNull().default('/assets/poster.jpg'),

    createdAt: timestamp().default(sql`CURRENT_TIMESTAMP`).notNull(),
    updatedAt: timestamp(),

    createdById: uuid()
      .notNull()
      .references(() => user.id),
    department: departmentEnum().default('NA').notNull(),

    venue: text(), // ROOM 303, BLOCK SPB, 2nd FLOOR
    dateTimeStarts: timestamp().notNull().default(AsthraStartsAt),
    dateTimeEnd: endTimeEnum().default('ALL DAY').notNull(),
    eventStatus: eventStatusEnum().default('uploaded').notNull(),

    eventType: eventTypeEnum().default('ASTHRA_PASS_EVENT').notNull(),
    amount: integer().default(0).notNull(),

    registrationType: registrationType().default('both').notNull(),
    regLimit: integer().default(Number.POSITIVE_INFINITY).notNull(),
    regCount: integer().default(0).notNull(),
  },
  (event) => ({
    createdByIdIndex: index().on(event.createdById),
  })
);

export type EventListType = InferSelectModel<typeof eventsTable>;

// export type UserListTypeOmit = InferSelectModel<typeof users>;

export type UserListType = InferSelectModel<typeof user>;

export const user = pgTable(
  'user',
  {
    id: uuid().defaultRandom().primaryKey(),

    name: varchar({ length: 255 }),
    email: varchar({ length: 255 }).notNull(),
    image: varchar({ length: 255 }),
    number: text(),

    role: roleEnum().default('USER').notNull(),
    department: departmentEnum().default('NA').notNull(),
    year: yearEnum().default('NA').notNull(),
    college: text().$type<College>().default('NA'),

    asthraCredit: integer().default(0).notNull(),
    asthraPass: boolean().default(false).notNull(),
    transactionId: text('asthraPassTransactionId'),

    // phone: varchar({ length: 256 }).unique(),
    // type: userTypeEnum().default('unknown').notNull(),

    emailVerified: timestamp({
      mode: 'date',
    }).default(sql`CURRENT_TIMESTAMP`),
    createdAt: timestamp().default(sql`CURRENT_TIMESTAMP`).notNull(),
    updatedAt: timestamp()
      .default(sql`CURRENT_TIMESTAMP`)
      .$onUpdateFn(() => new Date())
      .notNull(),
  },
  (table) => ({
    emailIndex: uniqueIndex().on(table.email),
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
