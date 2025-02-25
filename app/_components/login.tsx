"use server";

import { Button } from "@/components/ui/button";
import { isValidUserDetails } from "@/lib/validator";
import { getServerAuthSession } from "@/server/auth";
import Link from "next/link";

const LoginButton = async () => {
  const session = await getServerAuthSession();

  if (!session) {
    return (
      <Button link={"/api/auth/signin"} size={"glass"} variant={"glass"}>
        Login with Google
      </Button>
    );
  }

  const valid = isValidUserDetails(session.user);

  if (!valid) {
    return (
      <Button link={"/profile"} size={"glass"} variant={"glass"}>
        Logged In, Edit Profile to Continue
      </Button>
    );
  }

  return (
    <Button link={"/events"} size={"glass"} variant={"glass"}>
      Logged In, Go to Events
    </Button>
  );
};

export default LoginButton;
