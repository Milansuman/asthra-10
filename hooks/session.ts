import { isValidUserDetails } from '@/lib/validator';
import { sjcetMailSchema } from '@/logic/extract';
import { useSession as sessionHook } from 'next-auth/react';
export { signIn, signOut } from 'next-auth/react';
import { useMemo } from 'react';

export const useSession = (...arg: Parameters<typeof sessionHook>) => {
  const session = sessionHook(...arg);
  const valid = useMemo(
    () => isValidUserDetails(session.data?.user),
    [session.data?.user]
  );

  const isSJCET = useMemo(
    () => sjcetMailSchema.safeParse(session.data?.user).success,
    [session.data?.user]
  );

  return {
    ...session,
    valid,
    isSJCET,
  };
};
