import Plusbox from '@/components/madeup/box';
import CircularGalleryMade from '@/components/madeup/circularGalleryMade';
import { FAQ } from '@/components/madeup/faq';
import Image from 'next/image';
import LoginButton from '../_components/login';
import { TextRotatingAnimation } from '@/components/madeup/text-animate';
import { Button } from '@/components/ui/button';
import WhatsApp from '@/components/icons/whatsapp';

export default function Page() {
  return (
    <main className="z-10 relative">
      <section className="flex flex-col items-center">
        <Image
          src="asthra.svg"
          alt="logo"
          width={500}
          height={500}
          className="w-5/6"
        />
        <Image
          src="/assets/final.webp"
          alt="logo"
          width={1728}
          height={1117}
          className="w-5/6"
        />
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
