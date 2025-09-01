"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "@/hooks/session";
import { ButtonText } from "./pay";

const LoginButton = () => {
  const { status, valid, data } = useSession()

  if (status === "loading") {
    return (
      <Button >
        <ButtonText keyType={"Loading"} />
      </Button>
    );
  }

  if (!data) {
    return (
      <Button link={"/api/auth/signin"}   className="bg-black p-3">
        <ButtonText keyType={"Login to Register"} />
      </Button>
    );
  }

  if (!valid) {
    return (
      <Button link={"/profile"}  >
        <ButtonText keyType={"Complete your Profile Data before Registration"} />
      </Button>
    );
  }

  return (
    <Button link={"/events"}  >
      <ButtonText keyType={"Register Now"} />
    </Button>
  );
};

export default LoginButton;
