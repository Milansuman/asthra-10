"use client";

import type React from "react";
import Plusbox from "@/components/madeup/box";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { signIn, useSession } from "@/hooks/session";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { NoiseTexture } from "@/components/noise-texture";

const GOOGLE_SVG: React.FC = () => {
  return (
    <div className="w-5 h-5">
      {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="100"
        height="100"
        viewBox="0 0 48 48"
        className="w-full h-full"
      >
        <path
          fill="#FFC107"
          d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
        />
        <path
          fill="#FF3D00"
          d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
        />
        <path
          fill="#4CAF50"
          d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
        />
        <path
          fill="#1976D2"
          d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
        />
      </svg>
    </div>
  );
};

const LoginPage = () => {
  const router = useRouter();
  const { status } = useSession();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  if (status === "authenticated") {
    // @ts-ignore
    return router.push("/profile");
  }

  const handleEmailLogin = async () => {
    setLoading(true);
    await signIn("email", { email, callbackUrl: "/profile" });
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black">
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
      <nav className="fixed top-0 left-1/2 transform -translate-x-1/2 w-[calc(100%-40px)] h-20 mt-4 bg-transparent flex items-center justify-end md:justify-center z-[9999]">
        <div className="hidden md:flex items-center w-full max-w-6xl">
          {/* Left Logo */}
          <div className="px-6 py-2 bg-transparent border border-black rounded-full font-black tracking-widest text-black">
            <Image src="/assets/ASTHRA.svg" alt="asthra" width={60} height={10} className="relative" />
          </div>

          {/* Connector Line */}
          <div className="flex items-center -ml-px">
            <div className="w-8 h-[2px] bg-gray-600"></div>
            <div className="w-2 h-2 border-2 border-gray-600 rounded-full -mx-px"></div>
            <div className="w-12 h-[2px] bg-gray-600 -mx-px"></div>
            <div className="w-2 h-2 border-2 border-gray-600 rounded-full -mx-px"></div>
            <div className="w-3 h-[2px] bg-gray-600 -mx-px"></div>
            <div className="w-2 h-2 border-2 border-gray-600 rounded-full -mx-px"></div>
            <div className="w-3 h-[2px] bg-gray-600 -mx-px"></div>
            <div className="w-2 h-2 border-2 border-gray-600 rounded-full -mx-px"></div>
            <div className="w-12 h-[2px] bg-gray-600 -mx-px"></div>
            <div className="w-2 h-2 border-2 border-gray-600 rounded-full -mx-px"></div>
            <div className="w-8 h-[2px] bg-gray-600"></div>
          </div>

          {/* Center Nav Links */}
          <div className="flex gap-12 justify-center px-8 py-3 bg-[#0B91A6] text-white rounded-full -ml-px -mr-px flex-1">
            <a href="/" className="hover:underline">Home</a>
            {/* <a href="/events" className="hover:underline">Events</a> */}
            <a href="/login" className="hover:underline font-bold">Login</a>
          </div>

          {/* Connector Line */}
          <div className="flex items-center -ml-px">
            <div className="w-8 h-[2px] bg-gray-600"></div>
            <div className="w-2 h-2 border-2 border-gray-600 rounded-full -mx-px"></div>
            <div className="w-12 h-[2px] bg-gray-600 -mx-px"></div>
            <div className="w-2 h-2 border-2 border-gray-600 rounded-full -mx-px"></div>
            <div className="w-3 h-[2px] bg-gray-600 -mx-px"></div>
            <div className="w-2 h-2 border-2 border-gray-600 rounded-full -mx-px"></div>
            <div className="w-3 h-[2px] bg-gray-600 -mx-px"></div>
            <div className="w-2 h-2 border-2 border-gray-600 rounded-full -mx-px"></div>
            <div className="w-12 h-[2px] bg-gray-600 -mx-px"></div>
            <div className="w-2 h-2 border-2 border-gray-600 rounded-full -mx-px"></div>
            <div className="w-8 h-[2px] bg-gray-600"></div>
          </div>

          {/* User Actions */}
          <div className="px-6 py-2 bg-black text-white rounded-full font-semibold cursor-pointer -ml-px">
            Sign In
          </div>
        </div>
        <div className="flex md:hidden px-6">
          <span className="font-extrabold text-2xl text-white">Login</span>
        </div>
      </nav>
      <div className="w-screen h-screen fixed pointer-events-none z-40">
        <NoiseTexture />
      </div>

      <main className="z-10 absolute top-0 right-0 left-0 bottom-0 overflow-y-auto w-full md:w-[calc(100%-150px)] mx-auto scroll-smooth">

        <div className="min-h-screen bg-white relative rounded-b-[2rem] overflow-y-auto scrollbar-hide scroll-smooth">
          {/* Hero section with ASTHRA branding */}
          <section className="flex flex-col items-center relative min-h-screen px-4 pt-24">
            <div className="w-full flex justify-center mb-8">
              <Image
                src="/asthra.svg"
                alt="ASTHRA Login"
                width={200}
                height={100}
                className="w-auto h-32"
              />
            </div>

            <div className="max-w-lg w-full">
              <Card className="bg-white/10 backdrop-blur-sm border border-white/20 shadow-2xl">
                <CardHeader className="text-center">
                  <CardTitle className="text-3xl md:text-4xl font-bold leading-tight tracking-tight text-gray-800 ambit">
                    Welcome to Asthra 10.0!
                  </CardTitle>
                  <CardDescription className="text-gray-600 text-lg">
                    Join the adventure—complete your profile after signing up to personalize your Asthra experience!
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex flex-col items-center gap-6">
                  {/* <Input
                                        type="email"
                                        placeholder="Enter your email address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full text-gray-800 bg-white/50 border-white/30 rounded-xl h-12"
                                    />
                                    <Button
                                        size="lg"
                                        onClick={handleEmailLogin}
                                        className="w-full bg-[#0B91A6] hover:bg-[#0B91A6]/80 text-white rounded-xl h-12 shadow-lg"
                                        disabled={loading}
                                    >
                                        {loading ? "Sending..." : "Login with Email"}
                                    </Button> */}
                  <Button
                    size="lg"
                    onClick={() => signIn("google", { callbackUrl: "/profile" })}
                    className="w-full bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 rounded-xl h-12 shadow-lg"
                  >
                    <GOOGLE_SVG />
                    <span className="text-sm font-medium ml-3">Sign in with Google</span>
                  </Button>
                  <p className="text-xs text-gray-600 text-center">
                    Use your college email ID for a smoother experience
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
