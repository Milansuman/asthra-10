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

import {
  ChevronRight,
  QrCodeIcon,
  Terminal,
  TicketIcon,
  VerifiedIcon,
} from "lucide-react";
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
import type { UserZodType } from "@/lib/validator";
import { ASTHRA, allDepartments } from "@/logic";
import { api } from "@/trpc/react";
import { CertificateRender } from "./_components/certificate";
import { ProfileEdit } from "./_components/edit";

export default function ProfilePage() {
  const { data } = useSession();

  if (!data || !data.user) {
    return (
      <main className="flex flex-col justify-center items-center h-screen">
        <LoginButton />
      </main>
    );
  }
  const user = data.user as UserZodType;

  return (

    <main className="flex flex-col md:flex-row gap-6 justify-start p-6 min-h-screen ambit relative">
      <ProfilePageCard editable user={user} />
      <div className="flex-[1_auto] flex flex-col gap-6 items-center justify-center relative overflow-hidden">
        <div className="group">
          <ModelViewer
            className={`group-hover:blur-0 transition-all ${user.asthraPass ? "" : "blur"}`}
          />
          {!user.asthraPass && (
            <Button
              variant={"glass"}
              size={"glass"}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[90%] max-w-[300px]"
              link={`/event/${ASTHRA.id}`}
            >
              <ButtonText keyType={"Buy ASTHRA PASS"} />
            </Button>
          )}
        </div>
      </div>
    </main>
  )
}

export function ProfilePageCard({ user, editable = false }: { user: UserZodType, editable?: boolean }) {
  return (
    <Card className="max-w-2xl flex-col flex">
      <CardHeader>
        <div className="flex flex-row gap-3 items-center">
          <Avatar className="h-11 w-11 md:h-20 md:w-20 rounded-sm">
            <AvatarImage src={user.image ?? ""} />
            <AvatarFallback className="rounded-sm">
              {user.name}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-xl md:text-2xl">{user.name}</CardTitle>
            <CardDescription className="text-sm md:text-base break-all">
              {user.email}{" "}
              {user.email.endsWith(".ac.in") && (
                <VerifiedIcon className="inline-flex h-4" />
              )}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="py-4 md:py-0">
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
          {user.KTU && (
            <Button size={"thin"} variant="glass">
              {user.KTU}
            </Button>
          )}
        </div>
      </CardContent>
      {editable && <CardContent>
        <Alert className="relative text-black">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Update your Profile</AlertTitle>
          <AlertDescription>
            Before generating certificate, make sure to use your correct name
            & details.
          </AlertDescription>
          <div className="bg-glass-top absolute top-0 left-0 right-0 h-full" />
        </Alert>
      </CardContent>}
      {user.number === null && editable && (
        <CardContent>
          <Alert className="relative text-black">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Add Phone Number</AlertTitle>
            <AlertDescription>
              And get instant updates on Asthra.
            </AlertDescription>
            <div className="bg-glass-top absolute top-0 left-0 right-0 h-full" />
          </Alert>
        </CardContent>
      )}
      <CardContent className="flex justify-start flex-row flex-wrap gap-4">
        {user.asthraPass && (
          <>
            <div className="relative bg-glass py-2 px-4 border-glass border">
              <p className="opacity-70 text-sm font-normal">Credits</p>
              {user.asthraCredit}
            </div>
            <div className="relative bg-glass py-2 px-4 border-glass border">
              <p className="opacity-70 text-sm font-normal">Pass</p>
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
        {/* {user.asthraPass && (
            <Dialog>
              <DialogTrigger asChild>
                <Button size={"glass"} variant="glass">
                  Show Pass <TicketIcon />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Here is your ASTHRA PASS</DialogTitle>
                  <DialogDescription>
                    Get your attendance marked by showing this QR code at Front
                    Desk.
                  </DialogDescription>
                </DialogHeader>
                <div className="relative">
                  <img
                    src="/images/pass.png"
                    alt="Asthra Pass"
                    className="max-w-80 mx-auto"
                  />
                  <div className="p-6 absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2">
                    <QRCode
                      size={256}
                      style={{
                        height: "auto",
                        maxWidth: "100%",
                        width: "100%",
                      }}
                      value={user.id}
                      viewBox={"0 0 256 256"}
                    />
                  </div>
                  <div className="absolute top-2/3 left-5 md:translate-x-1/2 -translate-y-1/2 text-start">
                    <h4 className="text-black">{user.name}</h4>
                    <p className="text-black">{user.email}</p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )} */}
      </CardContent>

      <ListOfEvents userId={user.id} userName={user.name ?? "Unknown Name"} />

      {editable && <CardFooter className="justify-between mt-auto">
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
              <DialogTitle className="text-white">
                Are you absolutely sure?
              </DialogTitle>
              <DialogDescription className="text-white">
                This action will sign you out of the application. But you can
                always sign back in.
              </DialogDescription>
            </DialogHeader>
            <Button
              onClick={() =>
                signOut({
                  callbackUrl: "/",
                })
              }
              variant="destructive"
            >
              Sign Out
            </Button>
          </DialogContent>
        </Dialog>
      </CardFooter>}
    </Card>
  );
}

const ListOfEvents = ({ userName, userId }: { userName: string, userId: string }) => {
  const { data } = api.user.getUserRegisteredEvents.useQuery({
    userId,
  });

  if (!data) return null;

  const listOfEvents = data.map((e) => ({
    ...e.userRegisteredEvent,
    name: e?.event?.name ?? "Unknown Event",
    type: e?.event?.eventType ?? "ASTHRA_PASS_EVENT",
  }));

  return (
    <>
      {listOfEvents.length > 0 && (
        <CardContent>
          <CardTitle className="mb-3">Purchased Events</CardTitle>
          <Plusbox>
            <Table>
              <TableBody>
                {listOfEvents.map((event, i) => (
                  <TableRow key={event.eventId}>
                    <TableCell>{event.name}</TableCell>
                    <TableCell>{event.status}</TableCell>
                    <TableCell className="text-right">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size={"thin"} variant="glass">
                            Show Certificate <TicketIcon />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle>
                              Get your Certificate for {event.type}:{event.name}
                            </DialogTitle>
                            <DialogDescription>
                              Certificate will be issued based on attendence.
                            </DialogDescription>
                            <DialogDescription>
                              Your attendance status: {event.status}
                            </DialogDescription>
                            <DialogDescription>
                              Before generating certificate, make sure to update your correct name & details.
                            </DialogDescription>
                          </DialogHeader>
                          <CertificateRender data={{
                            qrText: `https://asthra.sjcetpalai.ac.in/profile/${event.userId}`,
                            userName,
                            eventType: event.type,
                            eventName: event.name,
                          }} />
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        link={`/event/${event.eventId}`}
                        size={"thin"}
                        variant="glass"
                      >
                        Show Event <ChevronRight />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Plusbox>
        </CardContent>
      )}
    </>
  );
};
