/**
 * YOU PROBABLY DON'T NEED TO EDIT THIS FILE, UNLESS:
 * 1. You want to modify request context (see Part 1).
 * 2. You want to create a new middleware or type of procedure (see Part 3).
 *
 * TL;DR - This is where all the tRPC server stuff is created and plugged in. The pieces you will
 * need to use are documented accordingly near the end.
 */

import { authOptions } from '@/server/auth';
import { initTRPC } from '@trpc/server';
import { getServerSession } from 'next-auth';
import superjson from 'superjson';
import { ZodError } from 'zod';

import { isValidUserDetails } from '@/lib/validator';
import { allowEditing } from '@/logic/moods';
import { cache } from '@/server/cache';
import { db } from '@/server/db';
import { getTrpcError } from '../db/utils';

/**
 * 1. CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API.
 *
 * These allow you to access things when processing a request, like the database, the session, etc.
 *
 * This helper generates the "internals" for a tRPC context. The API handler and RSC clients each
 * wrap this and provides the required context.
 *
 * @see https://trpc.io/docs/server/context
 */
export const createTRPCContext = async (opts: { headers: Headers }) => {
  const session = await getServerSession(authOptions);

  return {
    db,
    cache,
    session,
    ...opts,
  };
};

/**
 * 2. INITIALIZATION
 *
 * This is where the tRPC API is initialized, connecting the context and transformer. We also parse
 * ZodErrors so that you get typesafety on the frontend if your procedure fails due to validation
 * errors on the backend.
 */
const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

/**
 * 3. ROUTER & PROCEDURE (THE IMPORTANT BIT)
 *
 * These are the pieces you use to build your tRPC API. You should import these a lot in the
 * "/server/api/routers" directory.
 */

/**
 * This is how you create new routers and sub-routers in your tRPC API.
 *
 * @see https://trpc.io/docs/router
 */
export const createTRPCRouter = t.router;

/**
 * Create a server-side caller.
 *
 * @see https://trpc.io/docs/server/server-side-calls
 */
export const createCallerFactory = t.createCallerFactory;

/**
 * Public (unauthenticated) procedure
 *
 * This is the base piece you use to build new queries and mutations on your tRPC API. It does not
 * guarantee that a user querying is authorized, but you can still access user session data if they
 * are logged in.
 */
export const publicProcedure = t.procedure;

/**
 * Protected (authenticated) procedure
 *
 * If you want a query or mutation to ONLY be accessible to logged in users, use this. It verifies
 * the session is valid and guarantees `ctx.session.user` is not null.
 *
 * @see https://trpc.io/docs/procedures
 */
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw getTrpcError('NOT_LOGGED_IN');
  }
  return next({
    ctx: {
      // infers the `session` as non-nullable
      session: { ...ctx.session, user: ctx.session.user },
      user: ctx.session.user,
      role: ctx.session.user.role,
    },
  });
});

export const validUserOnlyProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw getTrpcError('NOT_LOGGED_IN');
  }

  if (!isValidUserDetails(ctx.session.user)) {
    throw getTrpcError('USER_DETAILS_INCOMPLETE');
  }

  return next({
    ctx: {
      // infers the `session` as non-nullable
      session: { ...ctx.session, user: ctx.session.user },
      user: ctx.session.user,
      role: ctx.session.user.role,
    },
  });
});

export const managementProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw getTrpcError('NOT_LOGGED_IN');
  }

  if (!isValidUserDetails(ctx.session.user)) {
    throw getTrpcError('USER_DETAILS_INCOMPLETE');
  }

  const role = ctx.session.user.role;

  if (role !== 'ADMIN' && role !== 'MANAGEMENT') {
    throw getTrpcError('NOT_AUTHORIZED');
  }

  return next({
    ctx: {
      // infers the `session` as non-nullable
      session: { ...ctx.session, user: ctx.session.user },
      user: ctx.session.user,
      role,
    },
  });
});

export const coordinatorProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw getTrpcError('NOT_LOGGED_IN');
  }

  if (!isValidUserDetails(ctx.session.user)) {
    throw getTrpcError('USER_DETAILS_INCOMPLETE');
  }

  const role = ctx.session.user.role;

  if (
    role !== 'ADMIN' &&
    role !== 'MANAGEMENT' &&
    role !== 'STUDENT_COORDINATOR' &&
    role !== 'FACULTY_COORDINATOR'
  ) {
    throw getTrpcError('NOT_AUTHORIZED');
  }

  return next({
    ctx: {
      // infers the `session` as non-nullable
      session: { ...ctx.session, user: ctx.session.user },
      user: ctx.session.user,
      role,
    },
  });
});

export const frontDeskProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw getTrpcError('NOT_LOGGED_IN');
  }

  if (!isValidUserDetails(ctx.session.user)) {
    throw getTrpcError('USER_DETAILS_INCOMPLETE');
  }

  const role = ctx.session.user.role;

  if (role !== 'DESK' && role !== 'MANAGEMENT' && role !== 'ADMIN') {
    throw getTrpcError('NOT_AUTHORIZED');
  }

  return next({
    ctx: {
      // infers the `session` as non-nullable
      session: { ...ctx.session, user: ctx.session.user },
      user: ctx.session.user,
      role,
    },
  });
});

export const eventsManageProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw getTrpcError('NOT_LOGGED_IN');
  }

  if (!isValidUserDetails(ctx.session.user)) {
    throw getTrpcError('USER_DETAILS_INCOMPLETE');
  }

  const role = ctx.session.user.role;

  if (
    role !== 'STUDENT_COORDINATOR' &&
    role !== 'FACULTY_COORDINATOR' &&
    role !== 'MANAGEMENT' &&
    role !== 'ADMIN'
  ) {
    throw getTrpcError('NOT_AUTHORIZED');
  }

  if (role !== 'MANAGEMENT' && role !== 'ADMIN' && !allowEditing()) {
    throw getTrpcError('EDIT_AFTER_LIMIT');
  }

  return next({
    ctx: {
      // infers the `session` as non-nullable
      session: { ...ctx.session, user: ctx.session.user },
      user: ctx.session.user,
      role,
    },
  });
});
