import CircularGallery from '@/components/bits/CircularGallery/CircularGallery';
import DecryptedText from '@/components/bits/DecryptedText/DecryptedText';
import { FAQ } from '@/components/madeup/faq';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import LoginButton from '../_components/login';
import Plusbox from '@/components/madeup/box';
import CircularGalleryMade from '@/components/madeup/circularGalleryMade';


export default function Page() {
  return (
    <main className="z-10 relative">
      <section className="grid min-h-screen grid-cols-1 md:grid-cols-3">
        <div className="col-span-1 flex items-center border border-glass p-8 md:col-span-2">
          <p className="ambit w-full px-4 text-left font-thin text-2xl md:text-5xl">
            Envisioned to explore
            the possibilities of
            tomorrow
          </p>
        </div>
        <div className="relative col-span-1 flex items-center justify-center border-l-[0.02rem] border-b-[0.02rem] p-4 bg-glass border-glass">
          {/* <Orb
            hoverIntensity={0.5}
            rotateOnHover={true}
            hue={2}
            forceHoverState={false}
          /> */}
          <Image
            src="/asthra.svg"
            alt="logo"
            width={100}
            height={100}
            className="w-3/4 md:w-2/3 lg:w-1/2"
          />
        </div>

        <div className="col-span-1 flex items-center border border-glass p-8 bg-glass md:col-span-2">
          <p className="ambit text-balance px-4 text-left font-extralight text-lg md:text-xl lg:text-2xl">
            ASTHRA, the national-level technical fest of St. Joseph's College of
            Engineering and Technology, Palai, is a premier inter-college event
            in Kerala. With 5,000+ annual visitors, it features professional
            shows, competitions, lectures, and workshops, offering an immersive
            experience for all participants.
          </p>
        </div>
        <div className="col-span-1 border border-glass hidden md:block" />

        <div className="col-span-1 flex items-center justify-center p-8 md:col-span-3">
          <p className="ambit text-center font-thin text-2xl md:text-3xl lg:text-5xl">
            "Culture shouldn't exist only for those who can afford it"
          </p>
        </div>
      </section>

      <section className="grid min-h-screen grid-cols-1 md:grid-cols-3">
        <div className="col-span-1 flex flex-col items-center justify-center border p-8 md:col-span-2 bg-glass border-glass">
          <p className="ambit mb-4 text-center font-thin text-xl md:text-2xl">
            VISION
          </p>
          <p className="ambit max-w-2xl px-4 text-center font-thin text-md md:text-xl lg:text-2xl">
            Developing into a world-class, pace-setting Institute of Engineering and Technology with distinct identity and character, meeting the goals and aspirations of the society.
          </p>
        </div>
        <div className="col-span-1 flex flex-col items-center justify-center border p-8 md:col-span-1 border-glass">
          <p className="ambit mb-4 text-center font-thin text-xl md:text-2xl">
            MISSION
          </p>
          <p className="ambit px-4 text-center font-thin text-md md:text-md">
            To maintain a conducive infrastructure and learning environment for world class education.
            To nurture a team of dedicated, competent and research oriented faculty.
            To develop students with moral & ethical values, for their successful career by offering variety of programmes and services.
          </p>
        </div>

        <div className="col-span-1 flex flex-col items-center justify-center border border-glass md:col-span-2" />
        <div className="col-span-1 flex flex-col items-center justify-center border border-glass p-8 bg-glass border-glass md:col-span-1">
          <ul className="ambit flex list-disc flex-col justify-center space-y-4 pl-8 font-thin text-xl md:text-2xl">
            <li>40 events</li>
            <li>10 workshops</li>
            <li>2 hackathons</li>
          </ul>
        </div>
        <div className="col-span-1 flex items-center justify-center p-8 md:col-span-3">
          <p className="ambit text-left font-thin text-xl md:w-3/4 md:text-3xl">
            SJCET Palai, managed by the Syro-Malabar Catholic Diocese of Pala,
            is an AICTE-approved private college in Kerala, offering engineering
            and management programs.
          </p>
        </div>
      </section>

      <section className="grid min-h-screen grid-cols-1 gap-8">
        <div className="relative">
          <div className='ambit   mb-[-20px]  flex items-center justify-center w-full text-center'>
            <Plusbox className='opacity-100 w-auto'>
              <h4 className='ambit text-6xl tracking-wide font-bold bg-glass p-2'>Events</h4>
            </Plusbox>
          </div>
          {/* <CircularGallery bend={1} textColor="#ffffff" borderRadius={0.05} /> */}
          <CircularGalleryMade />
        </div>
        <div className="flex flex-col items-center justify-center p-8">
          <p className="ambit mb-6 text-center font-thin text-2xl md:text-3xl">
            What are you waiting for?
            <br />
            Mark your calendar on <b className="text-bold">March 6,7 2025</b>
          </p>
          <LoginButton />
        </div>
      </section>
      <FAQ />
    </main>
  );
}
