export const allRoles = {
  "NA": true,
  student: true,
  faculty: true,
  admin: true,
  lead: true
} as const;

export type AllRoles = keyof typeof allRoles;

export const allDepartments = {
  NA: 'NA',
  ai: 'Artificial Intelligence & DS',
  ec: 'Electronics and Communication',
  cs: 'Computer Science',
  cy: 'Cyber Security',
  ct: 'Computer Technology (AI)',
  ecs: 'Electronics and Computer Science',
  ee: 'Electrical Engineering',
  ce: 'Civil Engineering',
  me: 'Mechanical Engineering',
  mca: 'Master of Computer Applications',
  mba: 'Master of Business Administration',
  es: 'Electronics and Computer Science',
  ei: 'Electronic & Instrumentation',
} as const; // + "NA" for other users/managements

export type AllDepartments = keyof typeof allDepartments;

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
} as const; // + "NA" for other users/managements

export type AllYears = keyof typeof allYears;

export type College = 'SJCET' | 'NA' | (string & {})

export const allClubs = {
  IEDC: "Startup Bootcamp SJCET",
  IEEE: "IEEE SB SJCET",
  GDSC: "Google Developer Students Club",
  TINKERHUB: "Tinkerhub",
  NEXUS: "The Nexus Project",
  MULEARN: "Gtech Mulearn",

  // todo: fill all
} as const;

export type AllClubs = keyof typeof allClubs;

export type SimpleSJCET = {
  role: AllRoles;
  name: string;
  email: string;
}

export type SJCET = SimpleSJCET & ({
  college: College;
  department: AllDepartments;
  year: AllYears;
})

export type UserOtp = {
  otp: number,
  email: string
}