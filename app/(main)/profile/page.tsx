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
import Image from "next/image";

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
import FluidGlass from "@/components/madeup/FluidGlass";
import { NoiseTexture } from "@/components/noise-texture";
import Header from "./_components/header";

export default function ProfilePage() {
  const { data } = useSession();

  if (!data || !data.user) {
    return (
      <div className="fixed inset-0 bg-black">
        {/* Decorative glass elements */}
        {/* <div className="absolute -top-[17%] md:top-[20%] pointer-events-none -left-[17%] md:-left-[3%] z-40">
          <FluidGlass mobileSize={100} desktopSize={290} />
        </div>

        <div className="absolute top-[10%] md:top-[6%] pointer-events-none -right-[12%] md:-right-[2%] z-40">
          <FluidGlass mobileSize={110} desktopSize={300} />
        </div> */}

        {/* Side navigation bars */}
        <div className="fixed left-6 top-1/2 -translate-y-1/2 z-30 hidden md:block">
          <Image
            src="/assets/side.png"
            alt="Left navigation"
            width={30}
            height={500}
            className="h-[95vh] w-auto"
          />
        </div>

        <div className="fixed right-6 top-1/2 -translate-y-1/2 z-30 hidden md:block">
          <Image
            src="/assets/side.png"
            alt="Right navigation"
            width={30}
            height={500}
            className="h-[95vh] w-auto"
          />
        </div>

        {/* Navigation bar */}
        <nav className="fixed top-0 left-1/2 transform -translate-x-1/2 w-[calc(100%-40px)] h-20 mt-4 bg-transparent flex items-center justify-center z-[9999]">
          <div className="flex items-center">
            <div className="px-6 py-2 bg-transparent border border-gray-600 rounded-full font-black tracking-widest">
              <Image src="/assets/asthra.svg" alt="asthra" width={60} height={10} className="relative" />
            </div>
          </div>
        </nav>

        <main className="z-10 absolute top-0 right-0 left-0 bottom-0 overflow-y-auto w-full md:w-[calc(100%-150px)] mx-auto">
          <NoiseTexture />
          <div className="h-screen bg-white relative rounded-b-[2rem] overflow-y-auto scrollbar-hide">
            <div className="flex flex-col justify-center items-center h-full p-6">
              <LoginButton />
            </div>
          </div>
        </main>
      </div>
    );
  }
  const user = data.user as UserZodType;

  return (
    <div className="fixed inset-0 bg-black">
      {/* Decorative glass elements
      <div className="absolute -top-[17%] md:top-[20%] pointer-events-none -left-[17%] md:-left-[3%] z-40">
        <FluidGlass mobileSize={100} desktopSize={290} />
      </div>

      <div className="absolute top-[10%] md:top-[6%] pointer-events-none -right-[12%] md:-right-[2%] z-40">
        <FluidGlass mobileSize={110} desktopSize={300} />
      </div>

      <div className="absolute top-[18%] md:top-[40%] left-[60%] md:left-[60%] pointer-events-none z-40 transform -translate-x-1/2">
        <FluidGlass mobileSize={70} desktopSize={90} />
      </div> */}

      {/* Side navigation bars */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 z-30 hidden md:block">
        <Image
          src="/assets/side.png"
          alt="Left navigation"
          width={30}
          height={500}
          className="h-[95vh] w-auto"
        />
      </div>

      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-30 hidden md:block">
        <Image
          src="/assets/side.png"
          alt="Right navigation"
          width={30}
          height={500}
          className="h-[95vh] w-auto"
        />
      </div>

      {/* Navigation bar */}
      <Header/>

      <div className="w-screen h-screen fixed pointer-events-none bg-blend-overlay z-40">
        <NoiseTexture />
      </div>

      <main className="z-10 absolute top-0 right-0 left-0 bottom-0 overflow-y-auto w-full md:w-[calc(100%-150px)] mx-auto scroll-smooth">


        <div className="min-h-screen bg-white relative rounded-b-[2rem] overflow-y-auto scrollbar-hide scroll-smooth">
          {/* Hero section with ASTHRA branding */}
          <section className="flex flex-col items-center relative min-h-[40vh] px-4 pt-24">
            <div className="w-full flex justify-center mb-8">
              <Image
                src="/asthra.svg"
                alt="ASTHRA Profile"
                width={150}
                height={80}
                className="w-auto h-24"
              />
            </div>
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 ambit">Profile Dashboard</h1>
              <p className="text-gray-600 text-lg">Manage your ASTHRA experience</p>
            </div>
          </section>

          {/* Profile content */}
          <section className="px-4 pb-8">
            <div className="max-w-4xl mx-auto">
              <ProfilePageCard editable user={user} />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export function ProfilePageCard({ user, editable = false }: { user: UserZodType, editable?: boolean }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Profile Card */}
      <Card className="lg:col-span-2 bg-white/10 backdrop-blur-sm border border-white/20 shadow-2xl">
        <CardHeader>
          <div className="flex flex-row gap-4 items-center">
            <Avatar className="h-16 w-16 md:h-24 md:w-24 rounded-2xl border-2 border-white/30 shadow-lg">
              <AvatarImage src={user.image ?? ""} />
              <AvatarFallback className="rounded-2xl bg-gradient-to-br from-[#0B91A6] to-blue-600 text-white font-bold text-xl">
                {user.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <CardTitle className="text-2xl md:text-3xl text-gray-800 mb-2">{user.name}</CardTitle>
              <CardDescription className="text-sm md:text-base break-all text-gray-600 flex items-center gap-2">
                {user.email}
                {user.email.endsWith(".ac.in") && (
                  <VerifiedIcon className="h-4 w-4 text-[#0B91A6]" />
                )}
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* User Info Tags */}
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" className="bg-[#0B91A6]/20 border-[#0B91A6]/50 text-gray-800 hover:bg-[#0B91A6]/30 rounded-full">
              {user.role as string}
            </Button>
            <Button variant="outline" className="bg-blue-500/20 border-blue-500/50 text-gray-800 hover:bg-blue-500/30 rounded-full">
              {allDepartments[user.department as keyof typeof allDepartments]}
            </Button>
            <Button variant="outline" className="bg-green-500/20 border-green-500/50 text-gray-800 hover:bg-green-500/30 rounded-full">
              {user.year as string}
            </Button>
            <Button variant="outline" className="bg-purple-500/20 border-purple-500/50 text-gray-800 hover:bg-purple-500/30 rounded-full">
              {user.college}
            </Button>
            {user.KTU && (
              <Button variant="outline" className="bg-orange-500/20 border-orange-500/50 text-gray-800 hover:bg-orange-500/30 rounded-full">
                {user.KTU}
              </Button>
            )}
          </div>

          {/* ASTHRA Pass Info */}
          {user.asthraPass && (
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-[#0B91A6]/20 to-blue-500/20 p-4 rounded-xl border border-[#0B91A6]/30 backdrop-blur-sm">
                <p className="text-sm font-medium text-gray-600 mb-1">Credits</p>
                <span className="text-2xl font-bold text-gray-800">{user.asthraCredit}</span>
              </div>
              <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 p-4 rounded-xl border border-green-500/30 backdrop-blur-sm">
                <p className="text-sm font-medium text-gray-600 mb-1">Pass Status</p>
                <span className="text-xl font-bold text-gray-800">ASTHRA</span>
              </div>
            </div>
          )}

          {/* Alerts */}
          {editable && (
            <Alert className="bg-yellow-50/80 border-yellow-200/50 backdrop-blur-sm rounded-xl">
              <Terminal className="h-4 w-4 text-[#0B91A6]" />
              <AlertTitle className="text-gray-800">Update your Profile</AlertTitle>
              <AlertDescription className="text-gray-700">
                Before generating certificate, make sure to use your correct name & details.
              </AlertDescription>
            </Alert>
          )}

          {user.number === null && editable && (
            <Alert className="bg-blue-50/80 border-blue-200/50 backdrop-blur-sm rounded-xl">
              <Terminal className="h-4 w-4 text-[#0B91A6]" />
              <AlertTitle className="text-gray-800">Add Phone Number</AlertTitle>
              <AlertDescription className="text-gray-700">
                And get instant updates on Asthra.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>

        {editable && (
          <CardFooter className="justify-between">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="border-[#0B91A6] text-[#0B91A6] hover:bg-[#0B91A6] hover:text-white rounded-full">
                  Edit Profile
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white/95 backdrop-blur-sm">
                <DialogHeader>
                  <DialogTitle className="text-gray-800">Edit your Profile</DialogTitle>
                </DialogHeader>
                <ProfileEdit />
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="destructive" className="rounded-full">Sign Out</Button>
              </DialogTrigger>
              <DialogContent className="bg-white/95 backdrop-blur-sm">
                <DialogHeader>
                  <DialogTitle className="text-gray-800">Are you absolutely sure?</DialogTitle>
                  <DialogDescription className="text-gray-600">
                    This action will sign you out of the application. But you can always sign back in.
                  </DialogDescription>
                </DialogHeader>
                <Button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  variant="destructive"
                  className="rounded-full"
                >
                  Sign Out
                </Button>
              </DialogContent>
            </Dialog>
          </CardFooter>
        )}
      </Card>

      {/* Quick Actions Card */}
      <Card className="bg-white/10 backdrop-blur-sm border border-white/20 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-xl text-gray-800">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full bg-[#0B91A6] hover:bg-[#0B91A6]/80 text-white shadow-lg rounded-xl h-12">
                <QrCodeIcon className="mr-2 h-5 w-5" />
                Profile QR Code
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white/95 backdrop-blur-sm">
              <DialogHeader>
                <DialogTitle className="text-gray-800">Show at Front Desk</DialogTitle>
                <DialogDescription className="text-gray-600">
                  Get your attendance marked by showing this QR code.
                </DialogDescription>
              </DialogHeader>
              <div className="p-6 bg-white rounded-xl">
                <QRCode
                  size={256}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  value={user.id}
                  viewBox={"0 0 256 256"}
                />
              </div>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      {/* Events List - Full Width */}
      <div className="lg:col-span-3">
        <ListOfEvents userId={user.id} userName={user.name ?? "Unknown Name"} />
      </div>
    </div>
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
        <Card className="bg-white/10 backdrop-blur-sm border border-white/20 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-800 flex items-center gap-2">
              <TicketIcon className="h-6 w-6 text-[#0B91A6]" />
              Registered Events
            </CardTitle>
            <CardDescription className="text-gray-600">
              View your event registrations and certificates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {listOfEvents.map((event, i) => (
                <div key={event.eventId} className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 text-lg mb-1">{event.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{event.type}</p>
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${event.status === "certified" ? "bg-green-100 text-green-800" :
                        event.status === "attended" ? "bg-blue-100 text-blue-800" :
                          event.status === "registered" ? "bg-yellow-100 text-yellow-800" :
                            "bg-gray-100 text-gray-800"
                        }`}>
                        {event.status?.toUpperCase()}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="border-[#0B91A6]/50 text-[#0B91A6] hover:bg-[#0B91A6] hover:text-white rounded-full">
                            <TicketIcon className="mr-1 h-4 w-4" />
                            Certificate
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md bg-white/95 backdrop-blur-sm">
                          <DialogHeader>
                            <DialogTitle className="text-gray-800">
                              Certificate for {event.name}
                            </DialogTitle>
                            <DialogDescription className="text-gray-600">
                              Certificate will be issued based on attendance.
                              <br />
                              Status: {event.status}
                              <br />
                              Make sure your profile details are correct before generating.
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

                      <Button
                        link={`/event/${event.eventId}`}
                        className="bg-gradient-to-r from-[#0B91A6] to-blue-600 hover:from-[#0B91A6]/80 hover:to-blue-600/80 text-white shadow-lg rounded-full"
                      >
                        View Event <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};
