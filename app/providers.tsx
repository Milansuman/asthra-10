import { TailwindIndicator } from '@/components/tailwind';
import { HeroUIProvider } from '@heroui/react';
import 'cal-sans';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TailwindIndicator />
      <HeroUIProvider>{children}</HeroUIProvider>
    </>
  );
}
