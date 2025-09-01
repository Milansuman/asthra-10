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
    <div className="fixed inset-0 bg-black">


      <div className="absolute -top-[17%] md:top-[30%] pointer-events-none -left-[17%] md:-left-[3%] z-40 ">
        <FluidGlass mobileSize={100} desktopSize={290} />
      </div>

      <div className="absolute top-[10%] md:top-[6%] pointer-events-none -right-[12%] md:-right-[2%] z-40">
        <FluidGlass mobileSize={110} desktopSize={300} />
      </div>

      <div className="absolute top-[18%] md:top-[40%] left-[60%] md:left-[60%] pointer-events-none z-40 transform -translate-x-1/2 ">
        <FluidGlass mobileSize={70} desktopSize={90} />
      </div>
      {/* Left vertical navbar */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 z-30 hidden md:block">
        <Image
          src="/assets/side.png"
          alt="Left navigation"
          width={30}
          height={500}
          className="h-[95vh] w-auto"
        />
      </div>

      {/* Right vertical navbar */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-30 hidden md:block">
        <Image
          src="/assets/side.png"
          alt="Right navigation"
          width={30}
          height={500}
          className="h-[95vh] w-auto"
        />
      </div>

      <nav className="fixed top-0 left-1/2 transform -translate-x-1/2 w-[calc(100%-40px)] h-20 mt-4 bg-transparent flex items-center justify-end md:justify-center  z-[9999]">
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

      <main className="z-10 absolute top-0 right-0 left-0 bottom-0 overflow-y-auto w-full md:w-[calc(100%-150px)] mx-auto h-screen">
        <NoiseTexture />
        <div className="min-h-full bg-white relative rounded-b-[2rem]">

          {/* Main ASTHRA section */}
          <section className="flex flex-col items-center relative min-h-[60vh] px-4">
            <div className="w-full flex justify-center mt-24 mb-2">
              <Image
                src="/asthra.svg"
                alt="SAR 10.0"
                width={200}
                height={100}
                className="w-auto h-36"
              />
            </div>
            <picture className="w-[90%] md:w-[80%] bottom-0 top-[17%] md:top-[23%]">
              <source
                media="(max-width: 768px)"
                srcSet="/assets/mobile_landing.webp"
              />
              <Image
                src="/assets/final.webp"
                alt="logo"
                width={1728}
                height={1117}
                style={{ objectFit: 'contain', width: '100%', height: 'auto' }}
              />
            </picture>
          </section>
        </div>

      </main>

    </div>
  );
}
