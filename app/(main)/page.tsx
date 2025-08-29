import Plusbox from '@/components/madeup/box';
import CircularGalleryMade from '@/components/madeup/circularGalleryMade';
import { FAQ } from '@/components/madeup/faq';
import Image from 'next/image';
import LoginButton from '../_components/login';
import { TextRotatingAnimation } from '@/components/madeup/text-animate';
import { Button } from '@/components/ui/button';
import WhatsApp from '@/components/icons/whatsapp';
import { NoiseTexture } from '@/components/noise-texture';
import FluidGlass from '@/components/madeup/FluidGlass';

export default function Page() {
  return (
    <div className="bg-black w-full min-h-screen relative">
      {/* Place glass elements here, outside the main container */}
      <div className="absolute -top-[8%] md:top-[29%] pointer-events-none -left-[10%] md:left-[-2%] z-40">
        <FluidGlass mobileSize={130} desktopSize={250} />
      </div>

      <div className="absolute top-[5%] md:top-[8%] pointer-events-none -right-[5%] md:right-[-3%] z-40">
        <FluidGlass mobileSize={140} desktopSize={250} />
      </div>

      <div className="absolute top-[60%] md:top-[40%] left-[55%] pointer-events-none z-40 transform -translate-x-1/2 ">
        <FluidGlass mobileSize={90} desktopSize={110} />
      </div>

      <main className="z-10 relative w-[calc(100%-150px)] min-h-screen overflow-x-hidden mx-auto bg-white">
        <NoiseTexture />
        <nav className="fixed top-0 left-1/2 transform -translate-x-1/2 w-[calc(100%-40px)] h-20 mt-4 bg-transparent flex items-center justify-center z-50">
          <div className="hidden md:flex items-center w-full max-w-6xl">
            {/* Left Logo */}
            <div className="px-6 py-2 bg-transparent border border-black rounded-full font-black tracking-widest text-black">
              <Image src="/assets/asthra.svg" alt="asthra" width={60} height={10} className="relative" />
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
              <a href="#" className="hover:underline">Home</a>
              <a href="#" className="hover:underline">About</a>
              <a href="#" className="hover:underline">Discover</a>
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

            {/* Sign In */}
            <div className="px-6 py-2 bg-black text-white rounded-full font-semibold cursor-pointer -ml-px">
              Sign In
            </div>
          </div>
          <div className="flex md:hidden px-6">
            <span className="font-extrabold text-2xl text-black">Menu</span>
          </div>
        </nav>

        {/* SAR Logo */}
        <div className="w-full flex justify-center mt-32 mb-8">
          <Image
            src="/asthra.svg"
            alt="SAR 10.0"
            width={200}
            height={100}
            className="w-auto h-36"
          />
        </div>

        {/* Main ASTHRA section */}
        <section className="flex flex-col items-center relative min-h-[60vh] px-4">
          <div className="w-full max-w-6xl">

            {/* ASTHRA Logo */}
            <div className="flex justify-center mb-8">
              <Image
                src="/assets/final.webp"
                alt="logo"
                width={1200}
                height={400}
                className="w-full max-w-5xl"
              />
            </div>


          </div>
        </section>

      </main>

    </div>
  );
}
