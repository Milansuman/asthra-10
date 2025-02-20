import DecryptedText from '@/components/bits/DecryptedText/DecryptedText';
import Image from 'next/image';

export default function Page() {
  return (
    <main className="z-10">
      <section className="flex h-screen w-screen flex-col">
        <div className="flex h-1/3 flex-row flex-wrap">
          <div className="flex h-full w-full items-center justify-center border border-neutral-300 font-bold text-2xl md:w-2/3">
            <p className="ambit px-4 text-center font-thin text-3xl md:text-5xl">
              {/* Making things pop since 2015 */}
              <DecryptedText
                text="Making things pop since 2015"
                speed={100}
                maxIterations={20}
                characters="ABCD1234!?"
                className="revealed"
                parentClassName="all-letters"
                encryptedClassName="encrypted"
                animateOn="view"
              />
            </p>
          </div>
          <div className="z-10 flex h-full w-full items-center justify-center border border-neutral-300 bg-slate-400/50 backdrop-blur-xl md:w-1/3">
            {/* <Orb
              hoverIntensity={0.5}
              rotateOnHover={true}
              hue={2}
              forceHoverState={false}
            /> */}
            <Image
              src="/asthra2.svg"
              alt="logo"
              width={100}
              height={100}
              className="absolute w-1/4 md:w-3/4"
            />
          </div>
        </div>
        <div className="flex h-1/3 flex-row flex-wrap">
          <div className="flex h-full w-full border border-neutral-300 bg-slate-400/50 backdrop-blur-xl md:w-2/3" />
          <div className="flex h-full w-full border border-neutral-300 md:w-1/3" />
        </div>
        <div className="flex h-1/3 w-full items-center justify-center px-4">
          <p className="ambit text-center font-thin text-3xl md:text-5xl">
            "Culture shouldn't exist only for those who can afford it"
          </p>
        </div>
      </section>

      <section className="flex h-screen w-screen flex-col md:hidden">
        <div className="flex h-1/3 flex-row flex-wrap">
          <div className="flex h-full w-full items-center justify-center border border-neutral-300 font-bold">
            <p className="ambit px-4 text-center font-thin text-3xl">
              <DecryptedText
                text="Making things pop since 2015"
                speed={100}
                maxIterations={20}
                characters="ABCD1234!?"
                className="revealed"
                parentClassName="all-letters"
                encryptedClassName="encrypted"
                animateOn="view"
              />
            </p>
          </div>
        </div>
        <div className="flex h-1/3 flex-row flex-wrap">
          <div className="flex h-full w-full items-center justify-center border border-neutral-300 bg-slate-400/50 backdrop-blur-xl">
            <ul className="ambit flex list-disc flex-col justify-center space-y-4 pl-8 font-thin text-xl">
              <li>40 events</li>
              <li>10 workshops</li>
              <li>2 hackathons</li>
            </ul>
          </div>
        </div>
        <div className="flex h-1/3 w-full items-center justify-center px-4">
          <p className="ambit text-center font-thin text-3xl">
            "Culture shouldn't exist only for those who can afford it"
          </p>
        </div>
      </section>

      <section className="hidden h-screen w-screen flex-col md:flex">
        <div className="flex h-1/3 flex-row flex-wrap">
          <div className="flex h-full w-full items-center justify-center border border-neutral-300 font-bold text-2xl md:w-2/3">
            <p className="ambit px-4 text-center font-thin text-3xl md:text-5xl">
              {/* Making things pop since 2015 */}
              <DecryptedText
                text="Making things pop since 2015"
                speed={100}
                maxIterations={20}
                characters="ABCD1234!?"
                className="revealed"
                parentClassName="all-letters"
                encryptedClassName="encrypted"
                animateOn="view"
              />
            </p>
          </div>
          <div className="flex h-full w-full items-center justify-center border border-neutral-300 md:w-1/3" />
        </div>
        <div className="flex h-1/3 flex-row flex-wrap">
          <div className="flex h-full w-full border border-neutral-300 md:w-2/3" />
          <div className="flex h-full w-full items-center justify-center border border-neutral-300 bg-slate-400/50 backdrop-blur-xl md:w-1/3">
            <ul className="ambit flex list-disc flex-col justify-center space-y-4 pl-8 font-thin text-xl md:text-2xl">
              <li>40 events</li>
              <li>10 workshops</li>
              <li>2 hackathons</li>
            </ul>
          </div>
        </div>
        <div className="flex h-1/3 w-full items-center justify-center px-4">
          <p className="ambit text-center font-thin text-3xl md:text-5xl">
            "Culture shouldn't exist only for those who can afford it"
          </p>
        </div>
      </section>
    </main>
  );
}
