
import { TailwindIndicator } from "@/components/tailwind";
import { TRPCReactProvider } from "@/trpc/react";
import { HeroUIProvider } from "@heroui/react";
import { Toaster } from "@/components/ui/sonner";
import Middleware from "./_components/middleware";


export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TRPCReactProvider>
      <Middleware>
        <TailwindIndicator />
        <HeroUIProvider>{children}</HeroUIProvider>
        <Toaster />
      </Middleware>
    </TRPCReactProvider>
  );
}
