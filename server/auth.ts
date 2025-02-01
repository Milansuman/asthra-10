import { CustomPgDrizzleAdapter } from '@/server/db/adapter';
import {
  type DefaultSession,
  type NextAuthOptions,
  getServerSession,
} from 'next-auth';
import type { Adapter } from 'next-auth/adapters';
import GoogleProvider from 'next-auth/providers/google';

import { env } from '@/env';
import { db } from '@/server/db';

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
      // role: UserRole;
    } & DefaultSession['user'];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
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
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  // session: { strategy: 'jwt' },
  // callbacks: {
  //   async jwt({ token, trigger, session, user, account, profile }) {
  //     if (trigger === 'update' && session) return { ...token, ...session.user };

  //     return { ...token, ...user };
  //   },
  //   async session({ session, token }) {
  //     session.user = token;
  //     return session;
  //   },
  // },
  // providers: [
  //   GoogleProvider({
  //     clientId: env.GOOGLE_CLIENT_ID,
  //     clientSecret: env.GOOGLE_CLIENT_SECRET,
  //     // biome-ignore lint/suspicious/useAwait: <explanation>
  //     profile: async (profile: GoogleProfile) => {
  //       const { isSJCET: SJCET, data } = getDataFromMail(profile.email);

  //       return {
  //         id: profile.sub,
  //         name: profile.name,
  //         email: profile.email,
  //         image: profile.picture,
  //         email_verified: profile.email_verified,
  //         // emailVerified: profile.email_verified,
  //         role: 'USER',
  //         asthraPass: false,
  //         transactionId: '',
  //         asthraCredit: 0,
  //         number: null,
  //         ...(SJCET && data
  //           ? data
  //           : {
  //               department: 'NA',
  //               year: 'NA',
  //               college: SJCET ? 'SJCET' : 'NA',
  //             }),
  //       };
  //     },
  //   }),
  // ],
  theme: {
    colorScheme: 'light',
    buttonText: 'white',
    brandColor: 'black',
    logo: '/assets/logo_with_text.svg',
  },
  secret: env.NEXTAUTH_SECRET,
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
