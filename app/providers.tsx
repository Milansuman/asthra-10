import { PointerWrapper } from '@/components/magicui/pointer';
import { TailwindIndicator } from '@/components/tailwind';
import { TRPCReactProvider } from '@/trpc/react';
import { HeroUIProvider } from '@heroui/react';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TRPCReactProvider>
      <TailwindIndicator />
      <PointerWrapper>
        <HeroUIProvider>{children}</HeroUIProvider>
      </PointerWrapper>
    </TRPCReactProvider>
  );
}
