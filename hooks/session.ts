import { isValidUserDetails } from '@/lib/validator';
import { useSession as sessionHook, signIn, signOut } from 'next-auth/react';
import { useMemo } from 'react';

export const useSession = (...arg: Parameters<typeof sessionHook>) => {
  const session = sessionHook(...arg);
  const valid = useMemo(
    () => isValidUserDetails(session.data?.user),
    [session.data?.user]
  );
  return {
    ...session,
    valid,
  };
};

export { signIn, signOut };
