"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "@/hooks/session";
import { ButtonText } from "./pay";

const LoginButton = () => {
  const { status, valid, data } = useSession()

  if (status === "loading") {
    return (
      <Button size={"glass"} variant={"glass"}>
        <ButtonText keyType={"Loading"} />
      </Button>
    );
  }

  if (!data) {
    return (
      <Button link={"/api/auth/signin"} size={"glass"} variant={"glass"} className="bg-black p-3">
        <ButtonText keyType={"Login to Register"} />
      </Button>
    );
  }

  if (!valid) {
    return (
      <Button link={"/profile"} size={"glass"} variant={"glass"}>
        <ButtonText keyType={"Complete your Profile Data before Registration"} />
      </Button>
    );
  }

  return (
    <Button link={"/events"} size={"glass"} variant={"glass"}>
      <ButtonText keyType={"Register Now"} />
    </Button>
  );
};

export default LoginButton;
