import { TRPCReactProvider } from "@/trpc/react";
import { Toaster } from "@/components/ui/sonner";
import Middleware from "./_components/middleware";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TRPCReactProvider>
      <Middleware>
        {children}
        <Toaster />
      </Middleware>
    </TRPCReactProvider>
  );
}
