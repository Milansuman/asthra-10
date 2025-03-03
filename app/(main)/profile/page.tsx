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

import { ChevronRight, QrCodeIcon, Terminal, TicketIcon, VerifiedIcon } from "lucide-react";
import QRCode from "react-qr-code";

import LoginButton from "@/app/_components/login";
import { ButtonText } from "@/app/_components/pay";
import Plusbox from "@/components/madeup/box";
import { ModelViewer } from "@/components/madeup/model";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { signOut, useSession } from "@/hooks/session";
import type {
  UserZodType
} from "@/lib/validator";
import { ASTHRA, allDepartments } from "@/logic";
import { api } from "@/trpc/react";
import { ProfileEdit } from "./_componetns/edit";

export default function ProfilePage() {
  const { status, data, valid } = useSession();

  if (!data || !data.user) {
    return <main className="flex flex-col justify-center items-center h-screen">
      <LoginButton />
    </main>;
  }
  const user = data.user as UserZodType;

  return (
    <main className="flex flex-col md:flex-row gap-6 justify-start p-6 min-h-screen ambit relative">
      <Card className="max-w-2xl flex-col flex">
        <CardHeader>
          <div className="flex flex-row gap-3 items-center">
            <Avatar className="h-20 w-20 rounded-sm">
              <AvatarImage src={user.image ?? ""} />
              <AvatarFallback>{user.name}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>
                {user.name}
              </CardTitle>
              <CardDescription>{user.email} {user.email.endsWith(".ac.in") && <VerifiedIcon className="inline-flex h-4" />}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="py-0">
          <div className="flex-row gap-2 flex-wrap flex">
            <Button size={"thin"} variant="glass">
              {user.role}
            </Button>
            <Button size={"thin"} variant="glass">
              {allDepartments[user.department as keyof typeof allDepartments]}
            </Button>
            <Button size={"thin"} variant="glass">
              {user.year}
            </Button>
            <Button size={"thin"} variant="glass">
              {user.college}
            </Button>
            <Button size={"thin"} variant="glass">
              {user.KTU}
            </Button>
          </div>
        </CardContent>
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
          {user.number === null && (
            <Alert className="relative text-black">
              <Terminal className="h-4 w-4" />
              <AlertTitle>Add Phone Number</AlertTitle>
              <AlertDescription>
                And get instant updates on Asthra.
              </AlertDescription>
              <div className="bg-glass-top absolute top-0 left-0 right-0 h-full" />
            </Alert>
          )}
        </CardContent>
        <CardContent className="flex justify-start flex-row flex-wrap gap-4">
          {user.asthraPass && (
            <>
              <div className='relative bg-glass py-2 px-4 border-glass border'>
                <p className='opacity-70 text-sm font-normal'>Credits</p>
                {user.asthraCredit}
              </div>
              <div className='relative bg-glass py-2 px-4 border-glass border'>
                <p className='opacity-70 text-sm font-normal'>Pass</p>
                ASTHRA
              </div>
            </>
          )}
          <Dialog>
            <DialogTrigger asChild>
              <Button size={"glass"} variant="glass">
                Profile QR <QrCodeIcon />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Show at Front Desk</DialogTitle>
                <DialogDescription>
                  Get your attendance marked by showing this QR code.
                </DialogDescription>
              </DialogHeader>
              <div className="p-4 bg-white">
                <QRCode
                  size={256}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  value={user.id}
                  viewBox={"0 0 256 256"}
                />
              </div>
            </DialogContent>
          </Dialog>
          {user.asthraPass && <Button size={"glass"} variant="glass">
            Show Pass <TicketIcon />
          </Button>}
        </CardContent>

        <ListOfEvents />

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
      <div className="flex-[1_auto] flex flex-col gap-6 items-center justify-center relative">
        <div className="group">
          <ModelViewer className={`group-hover:blur-0 transition-all ${user.asthraPass ? "" : "blur"}`} />
          {!user.asthraPass && <Button variant={"glass"} size={"glass"} className="absolute top-1/2 left-1/2 -translate-x-1/2" link={`/event/${ASTHRA.id}`}>
            <ButtonText keyType={"Buy ASTHRA PASS"} />
          </Button>}
        </div>
      </div>
    </main>
  );
}

const ListOfEvents = () => {
  const { data } = api.user.getRegisteredEventList.useQuery();

  if (!data) return null

  const listOfEvents = data;

  return (<>
    {
      listOfEvents.length > 0 && (
        <CardContent>
          <CardTitle className="mb-3">Purchased Events</CardTitle>
          <Plusbox>
            <Table>
              <TableBody>
                {listOfEvents.map((event, i) => (
                  <TableRow key={event.eventId}>
                    {/* <TableCell>{event.}</TableCell> */}
                    <TableCell>{event.status}</TableCell>
                    <TableCell className="text-right">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size={"thin"} variant="glass">
                            View QR <QrCodeIcon />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Scan this QR to get Attendence</DialogTitle>
                            <DialogDescription>
                              Show this QR code to the venue staff or student coordinator to get your attendence for your participation.
                            </DialogDescription>
                            <DialogDescription>
                              Certificate will be issued based on this attendence.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="p-4 bg-white">
                            <QRCode
                              size={256}
                              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                              value={event.registrationId}
                              viewBox={"0 0 256 256"}
                            />
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button link={`/event/${event.eventId}`} size={"thin"} variant="glass">
                        Show Event <ChevronRight />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Plusbox>
        </CardContent>
      )
    }
  </>);
}