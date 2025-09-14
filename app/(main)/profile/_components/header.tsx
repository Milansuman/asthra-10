"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cdn } from "@/lib/cdn";
import { Menu } from 'lucide-react';
import Image from 'next/image';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

export default function Header({ backgroundColor }: { backgroundColor: string }) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-1/2 transform -translate-x-1/2 w-full md:w-[calc(100%-200px)] h-20 mt-0 md:mt-4 bg-transparent flex items-center justify-end md:justify-center  z-[9999] ">
      <div className="hidden md:flex items-center w-full max-w-6xl gap-0 md:gap-4 lg:gap-0">
        {/* Left Logo */}
        <div className="w-[230px] min-w-[136px] flex items-center justify-center bg-white border border-black rounded-full  tracking-widest text-black">
          <h1 className="font-dimension text-5xl min-w-[85px] min-h-[27px]">ASTHRA</h1>
        </div>

        {/* Connector Line */}
        {/* <div className="flex items-center -ml-px">
                <div className="w-8 min-w- h-[2px] bg-gray-600"></div>
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
              </div> */}

        <Image src={cdn("/assets/navbarline.webp")} alt="asthra" width={246.5} height={10} className="min-w-[100px] h-auto hidden lg:block" />


        {/* Center Nav Links */}
        <div className="flex gap-6 md:gap-8 lg:gap-12 justify-center px-8 py-3  text-white rounded-full -ml-px -mr-px flex-1 z-[99999] md:text-sm lg:text-base" style={{ backgroundColor: backgroundColor }}>
          <Link href="/" className="hover:scale-110">Home</Link>
          <Link href="/profile" className="hover:scale-110">Profile</Link>
          <Link href="/dashboard" className="hover:scale-110">Dashboard</Link>
        </div>

        {/* <div className="flex items-center -ml-px">
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
              </div> */}
        <Image src={cdn("/assets/navbarline.webp")} alt="asthra" width={246.5} height={10} className="min-w-[100px] h-auto hidden lg:block" />

        <div className="w-[230px] min-w-[136px] flex items-center justify-center bg-black border border-black rounded-full  tracking-widest text-white">
          <h1 className="font-dimension text-5xl min-w-[85px] min-h-[27px]">ASTHRA</h1>
        </div>

      </div>
      <div className="flex md:hidden">
        <Dialog open={menuOpen} onOpenChange={() => setMenuOpen(!menuOpen)}>
          <DialogTrigger>
            <Menu className='text-black h-8 w-8 mr-5' />
          </DialogTrigger>
          <DialogContent className="rounded-xl max-w-sm mx-auto">
            <DialogHeader>
              <DialogTitle className="text-center font-dimension text-5xl tracking-[1px] text-[#0B91A6]">MENU</DialogTitle>
              <DialogDescription className="mt-6">
                <div className="flex flex-col gap-2 items-center py-3">
                  <Link href="/" onClick={() => setMenuOpen(false)} className="block px-4 py-3 text-black text-center text-2xl font-bold">Home</Link>
                  <Link href="/profile" onClick={() => setMenuOpen(false)} className="block px-4 py-3 text-black text-center text-2xl font-bold">Profile</Link>
                  <Link href="/dashboard" onClick={() => setMenuOpen(false)} className="block px-4 py-3 text-black text-center text-2xl font-bold">Dashboard</Link>
                  {/* <button type='button' className='mt-4 px-4 py-3 bg-black text-white rounded-full text-center text-xl font-bold w-[80%]' onClick={() => router.push("/login")}>
                    <Suspense fallback={<div>👻</div>}>
                      <RegisterButton />
                    </Suspense>
                  </button> */}
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </nav>
  )
}