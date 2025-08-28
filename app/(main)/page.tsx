import Plusbox from '@/components/madeup/box';
import CircularGalleryMade from '@/components/madeup/circularGalleryMade';
import { FAQ } from '@/components/madeup/faq';
import Image from 'next/image';
import LoginButton from '../_components/login';
import { TextRotatingAnimation } from '@/components/madeup/text-animate';
import { Button } from '@/components/ui/button';
import WhatsApp from '@/components/icons/whatsapp';
import { NoiseTexture } from '@/components/noise-texture';

export default function Page() {
  return (
    <main className="z-10 relative w-screen min-h-screen overflow-x-hidden">
      <NoiseTexture />
      <nav className=" fixed top-0 left-0  w-screen h-20 mt-4 bg-transparent flex items-center justify-end md:justify-center z-50">
        <div className="hidden md:flex items-center">

          {/* Left Logo */}
          <div className="px-14 py-2 bg-transparent border border-black rounded-full font-black tracking-widest text-black">
            ASTHRA
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
          <div className="flex gap-6 px-48 py-3 bg-[#0B91A6] text-white rounded-full -ml-px -mr-px">
            <a href="#" className="hover:underline">Home</a>
            <a href="#" className="hover:underline">About</a>
            <a href="#" className="hover:underline">Discover</a>
          </div>

          {/* Connector Line */}
          <div className="flex items-center -ml-px">
            <div className="w-6 h-[2px] bg-gray-600"></div>
            <div className="w-2 h-2 border-2 border-gray-600 rounded-full -mx-px"></div>
            <div className="w-10 h-[2px] bg-gray-600 -mx-px"></div>
            <div className="w-2 h-2 border-2 border-gray-600 rounded-full -mx-px"></div>
            <div className="w-2 h-[2px] bg-gray-600 -mx-px"></div>
            <div className="w-2 h-2 border-2 border-gray-600 rounded-full -mx-px"></div>
            <div className="w-2 h-[2px] bg-gray-600 -mx-px"></div>
            <div className="w-2 h-2 border-2 border-gray-600 rounded-full -mx-px"></div>
            <div className="w-10 h-[2px] bg-gray-600 -mx-px"></div>
            <div className="w-2 h-2 border-2 border-gray-600 rounded-full -mx-px"></div>
            <div className="w-6 h-[2px] bg-gray-600"></div>
          </div>

          {/* Sign In */}
          <div className="px-14 py-2 bg-black text-white rounded-full font-semibold cursor-pointer -ml-px">
            Sign In
          </div>
        </div>
        <div className="flex md:hidden px-6">
          <span className="font-extrabold text-2xl text-black">Menu</span>
        </div>
      </nav>
      <section className="flex flex-col items-center relative min-h-screen mt-6 mb-10 mt-24">
        <Image
          src="asthra.svg"
          alt="logo"
          width={300}
          height={300}
          className="w-[80%] md:w-[24%] absolute top-0"
        />
        <picture className="w-[90%] md:w-[80%] absolute bottom-0 top-[17%] md:top-[23%]">
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

      {/* <section className="flex flex-col justify-center items-center min-h-screen gap-8">
        <Plusbox className='opacity-100 w-auto'>
          <TextRotatingAnimation text={['Events', 'Workshops', 'Games', "Competitions", "Cultural"]} />
        </Plusbox>

        <CircularGalleryMade />
        <Button size={"default"} variant={"glass"} link='/events'>
          View More
        </Button>
      </section>
      <section className="flex flex-col justify-center items-center min-h-screen gap-8">
        <div className="flex flex-col items-center justify-center p-8 gap-5">
          <p className="ambit mb-2 text-center font-thin text-2xl md:text-3xl">
            What are you waiting for?
            <br />
            Mark your calendar on <b className="text-bold underline decoration-wavy">6 & 7th March 2025</b>
          </p>
          <LoginButton />
          <Button size={"thin"} variant={"glass"} link='https://whatsapp.com/channel/0029Vb814WN8PgsMKbk1gF0d'>
            Join <WhatsApp /> for live updates
          </Button>
        </div>
      </section> */}
      {/* <FAQ /> */}
    </main >
  );
}
