import { z } from 'zod';
import {
  type AllDepartments,
  type AllYears,
  type College,
  allDepartments,
  allYears,
} from '.';

/**
 * eg: name2025@ai.sjcetpalai.ac.in
 */
const simpleSjcetEmailregex =
  /^([a-zA-Z]+)([0-9]{4})@([a-zA-Z]+)\.sjcetpalai\.ac\.in$/;
/**
 * eg: name2025.ecs@sjcetpalai.ac.in
 */
const otherCasesSjcetRegex =
  /^([a-zA-Z]+)([0-9]{4})\.([a-zA-Z]+)@sjcetpalai\.ac\.in$/;

/**
 * eg: username@sjcetpalai.ac.in
 */
const allEmailSjcetRegex = /^(.+)@sjcetpalai\.ac\.in$/;

type SJCETstudent = {
  department: AllDepartments;
  year: AllYears;
  college: College;
};

const emailZod = z.string().trim().email();

export const sjcetMailSchema = z
  .string()
  .refine((mail) => mail.endsWith('sjcetpalai.ac.in'), {
    message: 'Email is not from SJCET Palai',
  });

const verifyData = (y?: string, d?: string) => {
  const newD = (d === 'es' ? 'ecs' : d) ?? 'NA';
  const department = newD in allDepartments ? newD : 'NA';
  const year = y && y in allYears ? y : 'NA';
  return { year, department } as { year: AllYears; department: AllDepartments };
};

export const getDataFromMailOld = (
  email: string
): { SJCET: boolean; data: SJCETstudent | null } => {
  const SJCET = email.endsWith('sjcetpalai.ac.in');

  if (SJCET) {
    const match = email.match(simpleSjcetEmailregex);

    if (match !== null) {
      const data: SJCETstudent = {
        year: (match[2] as AllYears) ?? 'NA',
        department:
          (match[3] as AllDepartments) === 'es'
            ? 'ecs'
            : ((match[3] as AllDepartments) ?? 'NA'),
        college: 'SJCET',
      };
      return { SJCET, data };
    }

    const otherMatch = email.match(otherCasesSjcetRegex);

    if (otherMatch !== null) {
      const data: SJCETstudent = {
        year: (otherMatch[2] as AllYears) ?? 'NA',
        department:
          (otherMatch[3] as AllDepartments) === 'es'
            ? 'ecs'
            : ((otherMatch[3] as AllDepartments) ?? 'NA'),
        college: 'SJCET',
      };
      return { SJCET, data };
    }
  }
  return { SJCET, data: null };
};

export const getDataFromMail = (mail: string) => {
  const { success: SJCET, data: email } = sjcetMailSchema.safeParse(mail);

  if (!SJCET) {
    return { SJCET, data: null };
  }
  const match = email.match(simpleSjcetEmailregex);

  if (match !== null) {
    const { department, year } = verifyData(match[2], match[3]);
    const data = {
      year,
      department,
      college: 'SJCET',
      name: match[1] ?? '',
    };
    return { SJCET, data };
  }

  const otherMatch = email.match(otherCasesSjcetRegex);

  if (otherMatch !== null) {
    const { department, year } = verifyData(otherMatch[2], otherMatch[3]);
    const data = {
      year,
      department,
      college: 'SJCET',
      name: otherMatch[1] ?? '',
    };
    return { SJCET, data };
  }

  const facultyMatch = email.match(allEmailSjcetRegex);

  if (facultyMatch) {
    const data = {
      year: 'NA',
      department: 'NA',
      college: 'SJCET',
      name: facultyMatch[1] ?? '',
    };
    return { SJCET, data };
  }

  return { SJCET: false, data: null };
};

// console.log(
//   getDataFromMail('abcdxyz2025@ai.sjcetpalai.ac.in'),
//   getDataFromMail('abcdxyz2025.es@sjcetpalai.ac.in'),
//   getDataFromMail('abcd1234.xyz@sjcetpalai.ac.in'),
//   getDataFromMail('abcd.xyz@sjcetpalai.ac.in'),
//   getDataFromMail('abcd.xyz@mbcet.ac.in')
// );
// console.log(
//   getDataFromMailOld('abcdxyz2025@ai.sjcetpalai.ac.in'),
//   getDataFromMailOld('abcdxyz2025.es@sjcetpalai.ac.in'),
//   getDataFromMailOld('abcd1234.xyz@sjcetpalai.ac.in'),
//   getDataFromMailOld('abcd.xyz@sjcetpalai.ac.in'),
//   getDataFromMailOld('abcd.xyz@mbcet.ac.in')
// );
