import type { EventType } from '@/lib/validator';

export const getActivityPoints = (eventType: EventType) => {
  switch (eventType) {
    case 'ASTHRA_PASS':
      return '10 to 40';

    case 'WORKSHOP':
      return '6 to 12';

    case 'COMPETITION':
      return '10 to 40';

    default:
      return 0;
  }
};
