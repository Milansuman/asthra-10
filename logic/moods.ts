import type { z } from 'zod';

import { eventAccessAfterLastDate, type eventAccessZod } from '@/lib/validator';

import { getTrpcError } from '@/server/db/utils';
import { type AllRoles, AsthraLastEditDay, AsthraStartsAt } from './index';

/**
 *  Function that extract less input attributes depending on `AsthraLastEditDay`
 */
const extractInput = (input: z.infer<typeof eventAccessZod>) => {
  if (allowEditing()) {
    return input;
  }

  return eventAccessAfterLastDate.parse(input);
};

/**
 *
 * @returns true if editable
 */
export const allowEditing = () => {
  return Date.now() < AsthraLastEditDay.getTime();
};

/**
 *
 * @returns true if asthra has not started yet
 */
export const asthraNotStarted = () => {
  return Date.now() < AsthraStartsAt.getTime();
};

export const eventRouteRules = (role: AllRoles) => {
  if (role === 'USER') {
    throw getTrpcError('NOT_AUTHORIZED');
  }
  if (role === 'STUDENT_COORDINATOR' && !allowEditing()) {
    throw getTrpcError('EDIT_AFTER_LIMIT');
  }
  if (role === 'FACULTY_COORDINATOR' && !allowEditing()) {
    throw getTrpcError('EDIT_AFTER_LIMIT');
  }
};
