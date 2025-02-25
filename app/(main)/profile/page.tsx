"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

import { ChevronRight, Terminal } from "lucide-react";

import Plusbox from "@/components/madeup/box";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  isValidUserDetails,
  type EventZodType,
  type UserZodType,
} from "@/lib/validator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ProfileEdit } from "./_componetns/edit";
import { useSession, signOut } from "@/hooks/session";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import { ModelViewer } from "@/components/madeup/model";

export default function ProfilePage() {
  const { status, data, valid } = useSession();

  if (!data || !data.user) {
    return null;
  }
  const user = data.user as UserZodType;
  const listOfEvents: EventZodType[] = [];

  return (
    <main className="flex flex-col md:flex-row gap-6 justify-start p-6 min-h-screen ambit relative">
      <Card className="flex-1 flex-col flex">
        <CardHeader>
          <Avatar className="h-20 w-20">
            <AvatarImage src={user.image ?? ""} />
            <AvatarFallback>{user.name}</AvatarFallback>
          </Avatar>
          <CardTitle>
            {user.name} ({user.role})
          </CardTitle>
          <CardDescription>{user.email}</CardDescription>
          <CardDescription>
            department: {user.department}, year: {user.year}, college:{" "}
            {user.college}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!valid && (
            <Alert className="relative text-black">
              <Terminal className="h-4 w-4" />
              <AlertTitle>Complete Profile</AlertTitle>
              <AlertDescription>
                Please complete your profile to purchase Asthra Pass.
              </AlertDescription>
              <div className="bg-glass-top absolute top-0 left-0 right-0 h-full" />
            </Alert>
          )}
        </CardContent>
        <CardContent className="flex justify-start flex-row flex-wrap gap-2">
          {user.asthraPass && (
            <>
              <Button size={"sm"} variant="glass">
                {user.asthraCredit} Credits <ChevronRight />
              </Button>
              <Button size={"sm"} variant="glass">
                ASTHRA Pass Unlocked <ChevronRight />
              </Button>
            </>
          )}
          <Button size={"sm"} variant="glass">
            Show Profile QR <ChevronRight />
          </Button>
        </CardContent>
        {listOfEvents.length > 0 && (
          <CardContent>
            <CardTitle>Purchased Events</CardTitle>
            <Plusbox>
              <Table>
                <TableBody>
                  {listOfEvents.map((event, i) => (
                    <TableRow key={event.id}>
                      <TableCell className="font-medium">{i + 1}</TableCell>
                      <TableCell>{event.name}</TableCell>
                      <TableCell>{"attended"}</TableCell>
                      <TableCell className="text-right">
                        <Button size={"thin"} variant="glass">
                          View <ChevronRight />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Plusbox>
          </CardContent>
        )}
        <CardFooter className="justify-between mt-auto">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive">Edit Profile</Button>
            </DialogTrigger>
            <DialogContent className="h-auto">
              <DialogHeader>
                <DialogTitle>Edit your Profile</DialogTitle>
                <DialogDescription>
                  This is required before purchasing Asthra Pass.
                </DialogDescription>
              </DialogHeader>
              <ProfileEdit />
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive">Sign Out</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-white">Are you absolutely sure?</DialogTitle>
                <DialogDescription className="text-white">
                  This action will sign you out of the application. But you can always sign back in.
                </DialogDescription>
              </DialogHeader>
              <Button onClick={() => signOut({
                callbackUrl: "/",
              })} variant="destructive">
                Sign Out
              </Button>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
      <div className="flex-[1_auto] flex flex-col gap-6">
        <Card className="relative">
          <ModelViewer className={`absolute mt-20 ${!user.asthraPass ? "blur" : ""}`} />
          <CardHeader>
            <Image src="/assets/asthraps.png" alt="" width={200} height={200} />
          </CardHeader>
          <CardContent>
            <Label size={"md"} className="text-center">
              You don't have an Asthra Pass
            </Label>
          </CardContent>
          <CardFooter>
            <Button link="/asthra" variant={"glass"}>
              Purchase Now <ShoppingBag />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
