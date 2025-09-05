"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Menu } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from "next/navigation";



export default function Header({ backgroundColor }: { backgroundColor: string }) {
  const router = useRouter();

  return (
    <nav className="fixed top-0 left-1/2 transform -translate-x-1/2 w-full md:w-[calc(100%-200px)] h-20 mt-0 md:mt-4 bg-transparent flex items-center justify-end md:justify-center  z-[9999] ">
      <div className="hidden md:flex items-center w-full max-w-6xl gap-0 md:gap-4 lg:gap-0">
        {/* Left Logo */}
        <div className="w-[230px] min-w-[136px] flex items-center justify-center py-2 bg-white border border-black rounded-full font-black tracking-widest text-black">
          <Image src="/asthratext.svg" alt="asthra" width={85.65} height={27.26} className="min-w-[85px] min-h-[27px]" />
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

        <Image src="/assets/navbarline.webp" alt="asthra" width={246.5} height={10} className="min-w-[100px] h-auto hidden lg:block" />


        {/* Center Nav Links */}
        <div className="flex gap-6 md:gap-8 lg:gap-12 justify-center px-8 py-3  text-white rounded-full -ml-px -mr-px flex-1 z-[99999] md:text-sm lg:text-base" style={{ backgroundColor: backgroundColor }}>
          <a href="/#Home" className="hover:scale-110">Home</a>
          <a href="/#About" className="hover:scale-110">About</a>
          <a href="/#Discover" className="hover:scale-110">Discover</a>
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
        <Image src="/assets/navbarline.webp" alt="asthra" width={246.5} height={10} className="min-w-[100px] h-auto hidden lg:block" />


        {/* Sign In */}
        <button type='button' className='bg-black text-white font-semibold py-3 rounded-full w-[230px] min-w-[100px]' onClick={() => router.push("/login")}>
          Sign In
        </button>
      </div>
      <div className="flex md:hidden">
        <Dialog>
          <DialogTrigger>
            <Menu className='text-black h-8 w-8 mr-5' />
          </DialogTrigger>
          <DialogContent className="rounded-xl max-w-sm mx-auto">
            <DialogHeader>
              <DialogTitle className="text-center text-black font-semibold">Menu</DialogTitle>
              <DialogDescription className="mt-6">
                <div className="flex flex-col gap-2 items-stretch py-3">
                  <a href="#Home" className="block px-4 py-3 text-white bg-[#0B91A6] rounded-full text-center hover:bg-[#0A7A8A] transition-colors hover:scale-110">Home</a>
                  <a href="#About" className="block px-4 py-3 text-white bg-[#0B91A6] rounded-full text-center hover:bg-[#0A7A8A] transition-colors hover:scale-110">About</a>
                  <a href="#Discover" className="block px-4 py-3 text-white bg-[#0B91A6] rounded-full text-center hover:bg-[#0A7A8A] transition-colors hover:scale-110">Discover</a>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </nav>
  )
}
