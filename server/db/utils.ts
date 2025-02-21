import { AsthraLastEditDay } from '@/logic';
import { TRPCError } from '@trpc/server';
import type { TRPC_ERROR_CODE_KEY } from '@trpc/server/rpc';
import { sql } from 'drizzle-orm';
import type { AnyPgColumn } from 'drizzle-orm/pg-core';

export const Increment = (column: AnyPgColumn, value = 1) => {
  return sql`${column} + ${value}`;
};

export const Decrement = (column: AnyPgColumn, value = 1) => {
  return sql`${column} - ${value}`;
};

type ErrorList = {
  [k in string]: {
    message: string;
    code: TRPC_ERROR_CODE_KEY;
  };
};

export const errorList = {
  NOT_LOGGED_IN: {
    message: 'You are not logged in',
    code: 'UNAUTHORIZED',
  },
  NOT_AUTHORIZED: {
    message: 'You are not authorized to access this action/route',
    code: 'UNAUTHORIZED',
  },
  UPDATE_ATTRIBUTE_FAILED: {
    message: "You can't update/edit this data attribute",
    code: 'UNAUTHORIZED',
  },
  EDIT_AFTER_LIMIT: {
    message: `You can't update/edit this data after ${AsthraLastEditDay.toLocaleString()}`,
    code: 'PRECONDITION_FAILED',
  },
  EDIT_AFTER_ASTHRA: {
    message: `Asthra already started, You can't update/edit these data anymore`,
    code: 'PRECONDITION_FAILED',
  },
  TRANSACTION_NOT_FOUND: {
    message: 'Transaction not found or not initilized yet',
    code: 'NOT_FOUND',
  },
  PAYMENT_VERIFICATION_FAILED: {
    message: 'Payment verification failed',
    code: 'NOT_FOUND',
  },
  TRANSACTION_FAILED: {
    message: 'Transaction has been failed',
    code: 'CLIENT_CLOSED_REQUEST',
  },
  EVENT_NOT_FOUND: {
    message: 'Action failed, event you were looking for is not found',
    code: 'NOT_FOUND',
  },
  NEED_ASTHRA_PASS: {
    message: 'To purshase this event, you need a valid ASTHRA pass',
    code: 'UNAUTHORIZED',
  },
  ALREADY_PURCHASED: {
    message: 'This item is already purchased',
    code: 'BAD_REQUEST',
  },
  REGISTRATION_LIMIT_EXCEDED: {
    message: 'Opps, registration closed or limit exceded',
    code: 'CONFLICT',
  },
  YOUR_ASTHRA_CREDIT_EXECEDED: {
    message: 'Opps, registration requires more asthra credits',
    code: 'PRECONDITION_FAILED',
  },
  WRONG_PARAMETERS: {
    message: 'Wrong parameters detected',
    code: 'BAD_REQUEST',
  },
  USER_DETAILS_INCOMPLETE: {
    message: 'User details are incomplete to initiate a transaction',
    code: 'PRECONDITION_FAILED',
  },
  USER_NOT_FOUND: {
    message: 'User details are incomplete or not exist',
    code: 'NOT_FOUND',
  },
  USER_HAS_NO_SUCCESSFUL_PAYMENTS: {
    message: "User doen't have any successfull payments",
    code: 'NOT_FOUND',
  },
} satisfies ErrorList;

export const getTrpcError = (key: keyof typeof errorList, error?: Error) => {
  const currentError = errorList[key];
  return new TRPCError({
    code: currentError?.code ?? 'INTERNAL_SERVER_ERROR',
    message: currentError?.message ?? 'Wrong Error found',
    cause: error,
  });
};
