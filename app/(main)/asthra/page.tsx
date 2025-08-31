"use client"

import { ButtonText } from "@/app/_components/pay";
import { ModelViewer } from "@/components/madeup/model";
import { Button } from "@/components/ui/button";
import { ASTHRA } from "@/logic";

const Page = () => {
  return <div className="flex container min-h-screen flex-col items-center justify-center relative">
    <div className="group">
      <ModelViewer className="group-hover:blur-0 blur transition-all" />
      <Button variant={"default"} size={"lg"} className="bg-black p-3 absolute top-1/2 left-1/2 -translate-x-1/2" link={`/event/${ASTHRA.id}`}>
        <ButtonText keyType={"Buy ASTHRA PASS"} />
      </Button>
    </div>
  </div>;
};

export default Page;
