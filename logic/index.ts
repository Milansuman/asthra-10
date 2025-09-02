import type { EntireZodType } from '@/lib/validator';

export const allRoles = {
  USER: true,
  STUDENT_COORDINATOR: true,
  FACULTY_COORDINATOR: true,
  MANAGEMENT: true,
  ADMIN: true,
  DESK: true,
} as const;

export type AllRoles = keyof typeof allRoles;

export const allDepartments = {
  NA: 'NA',
  ai: 'Artificial Intelligence & Data Science',
  ec: 'Electronics & Communication Engineering',
  cs: 'Computer Science & Engineering',
  cy: 'Computer Science & Engineering (Cyber Security)',
  ct: 'Computer Science & Engineering (Artificial Intelligence)',
  ecs: 'Electronics & Computer Engineering',
  ee: 'Electrical & Electronics Engineering',
  ce: 'Civil Engineering',
  me: 'Mechanical Engineering',
  mca: 'Master of Computer Applications',
  mba: 'Master of Business Administration',
  es: 'Electronics & Computer Science',
  ei: 'Electronic & Instrumentation',
} as const; // + "NA" for other users/managements

export type AllDepartments = keyof typeof allDepartments;

export type College = 'SJCET' | 'NA' | string;

export const allYears = {
  NA: true,
  '2021': true,
  '2022': true,
  '2023': true,
  '2024': true,
  '2025': true,
  '2026': true,
  '2027': true,
  '2028': true,
  '2029': true,
} as const; // + "NA" for other users/managements

export type AllYears = keyof typeof allYears;

export const endTime = {
  NA: true,
  '1 HOUR': true,
  '2 HOURS': true,
  '4 HOURS': true,
  '6 HOURS': true,
  '8 HOURS': true,
  'HALF DAY': true,
  'ALL DAY': true,
  '2 FULL DAYS': true,
} as const; // + "NA" for other events

export const eventType = {
  ASTHRA_PASS: false,
  ASTHRA_PASS_EVENT: false,
  COMPETITION: true,
  WORKSHOP: true,
} as const; // + "NA" for other events

export const registrationTypeEnum: { [k in string]: string } = {
  both: 'Both Online & Spot',
  online: 'Online Only ',
  spot: 'Spot Only ',
} as const; // + "NA" for other events

export const eventStatus: { [k in string]: string } = {
  uploaded: 'Currently in Review',
  approved: 'Approved',
  cancel: 'Cancelled',
} as const; // + "NA" for other events

export type EndTime = keyof typeof endTime;

// use https://www.epochconverter.com/ to convert date to epoch

/**
 * Asthra starts at
 *
 * Defualt March 6 9:00 AM "04-03-2025"
 *
 * Mon Mar 06 2025 09:00:00 GMT+0530 (India Standard Time)
 * */
export const AsthraStartsAt = new Date(1741231800000);
// AsthraStartsAt.toLocaleString() "4/3/2025, 9:00:00 am"

/**
 * last date of edits
 *
 * Defualt March 03 11:59 AM "02-03-2025"
 *
 * Mon March 03 2025 11:59:00 GMT+0530 (India Standard Time)
 * */
export const AsthraLastEditDay = new Date("2025-09-11");

export const getTimeUtils = (date: Date) => {
  if (date instanceof Date) {
    return date.toLocaleString('en-IN', {
      timeZone: 'Asia/Calcutta',
    });
  }
  return new Date(date).toLocaleString('en-IN', {
    timeZone: 'Asia/Calcutta',
  });
};

// console.log(getTimeUtils(AsthraStartsAt));

/**
 * Venue example
 *
 * ROOM 303, BLOCK SPB, 2nd FLOOR
 * || Ground
 * || Cafeteria
 * */

/**
 * Prize example
 *
 * ₹1000
 * || Certificate
 * || Stickers & Goodies
 * */

/**
 * eventIds: id|id|id|id|id|...|id
 * split("|")
 * example:
 *    erdfsghdjfkmldf|fsvghdjsnkmd|sghdfanmsdf|fgvhfjnkfdbsjnd|ghbjndfmgsdfhjs|gvhjbdnfsdf|gvshbjdfnmdf
 */

export const ASTHRA = {
  // dont change this ID (else it will break the system)
  id: '11111111-2222-3333-4444-555555555555',
  credit: 500,
  amount: 250,
  department: 'NA',
  dateTimeEnd: '2 FULL DAYS',
  name: 'ASTHRA PASS',
  venue: 'Registration Desk, SJCET',
  eventStatus: 'approved',
  eventType: 'ASTHRA_PASS',
  regLimit: Number.POSITIVE_INFINITY,
  regCount: 0,
  registrationType: 'both',
  secret: 'ASTHRA_PASS',
  description:
    'With Asthra Pass, you can now get access to all department and general events (excluding workshops) for just ₹250!\nHurry up before the deal ends!',
} satisfies Omit<
  EntireZodType['event'],
  'createdAt' | 'updatedAt' | 'createdById' | 'poster' | 'dateTimeStarts'
> & {
  credit: number;
};

// next year will be 11
export const currentAsthraCount = 10;
