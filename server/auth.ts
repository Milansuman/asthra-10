import { CustomPgDrizzleAdapter } from '@/server/db/adapter';
import {
  type DefaultSession,
  type NextAuthOptions,
  getServerSession,
} from 'next-auth';
import type { Adapter } from 'next-auth/adapters';
import GoogleProvider, { type GoogleProfile } from 'next-auth/providers/google';
import EmailProvider from 'next-auth/providers/email';

import { env } from '@/env';
import type { UserZodType } from '@/lib/validator';
import { getDataFromMail } from '@/logic/extract';
import { db } from '@/server/db';
import MailAPI from '@/server/api/routers/mail';

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserZodType['role'];
    } & DefaultSession['user'] &
      UserZodType;
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

declare module '@auth/core/types' {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession['user'] &
      UserZodType;
  }

  // interface User {
  // 	type: "unknown" | "client" | "resource";
  // } & x
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, user, newSession, trigger }) => ({
      ...session,
      user: {
        ...user,
        ...session.user,
        id: user.id,
      },
    }),
  },
  session: { strategy: 'database' },
  adapter: CustomPgDrizzleAdapter(db) as Adapter,
  providers: [
    EmailProvider({
      server: {
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
          user: env.NM_EMAIL,
          pass: env.NM_PASS,
        },
      },
      from: env.NM_EMAIL,
    }),
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,

      // biome-ignore lint/suspicious/useAwait: <explanation>
      profile: async (profile: GoogleProfile) => {
        const { SJCET, data } = getDataFromMail(profile.email);

        return {
          id: profile.sub,
          email: profile.email,
          image: profile.picture,
          email_verified: profile.email_verified,
          // emailVerified: profile.email_verified,
          role: 'USER',
          asthraPass: false,
          transactionId: null,
          asthraCredit: 0,
          number: null,
          ...(SJCET && data
            ? data
            : {
                department: 'NA',
                year: 'NA',
                college: SJCET ? 'SJCET' : 'NA',
              }),
          name: profile.name ?? data?.name ?? null,
        };
      },
    }),
  ],
  events: {
    createUser: async (message) => {
      const user = message.user;

      if (!user || !user.email) return;

      await MailAPI.welcome({
        email: user.email,
        name: user.name ?? 'User',
      });
    },
  },
  pages: {
    newUser: '/profile',
    signIn: '/login',
  },
  theme: {
    colorScheme: 'dark',
    buttonText: 'black',
    brandColor: 'white',
    logo: '/asthra.svg',
  },
  secret: env.NEXTAUTH_SECRET,
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
