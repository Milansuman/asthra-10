import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  GlowCard,
} from '@/components/ui/card';
import { GlowArea } from '@/components/ui/glow';

export default function Page() {
  return (
    <GlowArea
      size={430}
      className="container flex h-screen items-center justify-center"
    >
      <GlowCard color="#FFD700">
        <CardHeader> </CardHeader>
        <CardContent>
          <img src="/asthra.svg" alt="asthra logo" />
        </CardContent>
        <CardFooter className="flex justify-center">
          <CardTitle>Coming Soon...</CardTitle>
        </CardFooter>
      </GlowCard>
    </GlowArea>
  );
}
