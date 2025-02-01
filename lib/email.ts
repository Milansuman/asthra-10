import { z } from 'zod';
import {
  type AllDepartments,
  type AllYears,
  type SJCET,
  allDepartments,
  allYears,
} from './type';

/**
 * eg: username2025@ai.sjcetpalai.ac.in
 */
const studentsRegex = /^([a-zA-Z]+)([0-9]{4})@([a-zA-Z]+)\.sjcetpalai\.ac\.in$/;
/**
 * eg: username2025.ecs@sjcetpalai.ac.in
 */
const otherStudentsRegex =
  /^([a-zA-Z]+)([0-9]{4})\.([a-zA-Z]+)@sjcetpalai\.ac\.in$/;

/**
 * eg: username@sjcetpalai.ac.in
 */
const globalEmailCase = /^(.+)@sjcetpalai\.ac\.in$/;

export type ReturnGetDataFromMail =
  | {
      isSJCET: true;
      data: SJCET;
    }
  | {
      isSJCET: false;
      data: null;
    };

const verifyData = (y?: string, d?: string) => {
  const newD = (d === 'es' ? 'ecs' : d) ?? 'NA';
  const department = newD in allDepartments ? newD : 'NA';
  const year = y && y in allYears ? y : 'NA';
  return { year, department } as { year: AllYears; department: AllDepartments };
};

export const sjcetMailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .email()
  .refine((mail) => mail.endsWith('sjcetpalai.ac.in'), {
    message: 'Email is not from SJCET Palai',
  });

const sjcetMailSchemaWithoutZod = (mail: string) => {
  const email = mail.trim().toLowerCase();
  if (!email.endsWith('sjcetpalai.ac.in'))
    return { success: false, data: null } as const;
  return { success: true, data: email } as const;
};

export const getDataFromMail = (mail: string): ReturnGetDataFromMail => {
  const { success: isSJCET, data: email } = sjcetMailSchema.safeParse(mail);
  // const { success: isSJCET, data: email } = sjcetMailSchemaWithoutZod(mail)

  if (!isSJCET) return { isSJCET, data: null };
  const match = email.match(studentsRegex);

  if (match !== null) {
    const { department, year } = verifyData(match[2], match[3]);
    const data: SJCET = {
      year,
      department,
      college: 'SJCET',
      role: 'student',
      name: match[1] ?? '',
      email,
    };
    return { isSJCET, data };
  }

  const otherMatch = email.match(otherStudentsRegex);

  if (otherMatch !== null) {
    const { department, year } = verifyData(otherMatch[2], otherMatch[3]);
    const data: SJCET = {
      year,
      department,
      college: 'SJCET',
      role: 'student',
      name: otherMatch[1] ?? '',
      email,
    };
    return { isSJCET, data };
  }

  const facultyMatch = email.match(globalEmailCase);

  if (facultyMatch) {
    const data: SJCET = {
      year: 'NA',
      department: 'NA',
      college: 'SJCET',
      role: 'student',
      name: facultyMatch[1] ?? '',
      email,
    };
    return { isSJCET, data };
  }

  return { isSJCET: false, data: null };
};

/**
 * 910000111100 to 0000111100
 */

export const extractNumber = (number: string) => {
  const n = number.trim().replace(/\D/g, '');

  if (n.length !== 12) throw new Error('Mobile number is not 10 digits');

  if (n.startsWith('91')) return n.slice(2);

  throw new Error('Number outside India is not permitted yet');
};

// console.log(
//     getDataFromMail("abcdxyz2025@ai.sjcetpalai.ac.in"),
//     getDataFromMail("abcdxyz2025.es@sjcetpalai.ac.in"),
//     getDataFromMail("abcd1234.xyz@sjcetpalai.ac.in"),
//     getDataFromMail("abcd.xyz@sjcetpalai.ac.in"),
// )
