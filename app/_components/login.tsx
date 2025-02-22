'use server';

import { Button } from '@/components/ui/button';
import { isValidUserDetails } from '@/lib/validator';
import { getServerAuthSession } from '@/server/auth';
import Link from 'next/link';

const LoginButton = async () => {
  const session = await getServerAuthSession();

  if (!session) {
    return (
      <Link href={'/api/auth/signin'}>
        <Button size={"glass"} variant={"glass"}>
          Login with Google
        </Button>
      </Link>
    );
  }

  const valid = isValidUserDetails(session.user)

  if (!valid) {
    return (
      <Button size={"glass"} variant={"glass"}>
        Logged In, Edit Profile to Continue
      </Button>
    );
  }

  return (
    <Button size={"glass"} variant={"glass"}>
      Logged In
    </Button>
  );
};

export default LoginButton;
