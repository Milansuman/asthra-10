'use server';

import { getServerAuthSession } from '@/server/auth';
import { Button } from '@heroui/button';
import Link from 'next/link';

const LoginButton = async () => {
  const session = await getServerAuthSession();

  if (!session) {
    return (
      <Link href={'/api/auth/signin'}>
        <Button className="border border-white/50 bg-none p-10 backdrop-blur-xl">
          Login with Google
        </Button>
      </Link>
    );
  }

  return (
    <Button className="border border-white/50 bg-none p-10 backdrop-blur-xl">
      Logged in
    </Button>
  );
};

export default LoginButton;
