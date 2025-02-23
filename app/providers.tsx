import { TailwindIndicator } from '@/components/tailwind';
import { TRPCReactProvider } from '@/trpc/react';
import { HeroUIProvider } from '@heroui/react';
import { Toaster } from "@/components/ui/sonner"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TRPCReactProvider>
      <TailwindIndicator />
      <HeroUIProvider>{children}</HeroUIProvider>
      <Toaster />
    </TRPCReactProvider>
  );
}
