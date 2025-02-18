import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import LoginButton from './_components/login';

export default function Page() {
  return (
    <div className="container flex h-screen items-center justify-center">
      <Card>
        <CardHeader> </CardHeader>
        <CardContent>
          <img src="/asthra.svg" alt="asthra logo" />
        </CardContent>
        <CardFooter className="flex justify-center">
          {/* <CardTitle>Coming Soon...</CardTitle> */}
          <LoginButton />
        </CardFooter>
      </Card>
    </div>
  );
}
