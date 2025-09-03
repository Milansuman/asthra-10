import Image from 'next/image';
import { NoiseTexture } from '@/components/noise-texture';
import FluidGlass from '@/components/madeup/FluidGlass';
import Header from '../../_components/header';
import { departmentData } from '@/lib/departmentData';
import { notFound } from 'next/navigation';
import localFont from 'next/font/local';

const dimensionFont = localFont({
  src: "../../../public/fonts/fonnts.com-Dimensions_600R.otf",
  variable: "--font-dimension",
});

export default function Page({ params }: { params: { slug: string } }) {

    const department = departmentData.find(d => d.slug === params.slug);
    if (!department) {
        notFound();
    }
    return (
        <div className="fixed inset-0 bg-black">
            <Header backgroundColor={department.colors.fg} />

           {/* Left vertical navbar */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 z-30 hidden md:block">
        <Image
          src="/assets/test.svg"
          alt="Left navigation"
          width={30}
          height={500}
          className="h-[95vh] w-auto text-white"
          
        />
      </div>

      {/* Right vertical navbar */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-30 hidden md:block">
        <Image
          src="/assets/side_lines.svg"
          alt="Right navigation"
          width={30}
          height={500}
          className="h-[95vh] w-auto"
        />
      </div>

      <NoiseTexture />

            <main className="z-10 absolute top-0 right-0 left-0 bottom-0 overflow-y-auto w-full md:w-[calc(100%-150px)] mx-auto scroll-smooth">
                {/* This div is no longer needed, we'll have sections be the direct children */}
                <section 
                    id='Home' 
                    className="flex flex-col items-center min-h-screen pt-24 md:pt-32 pb-16 md:rounded-[2rem] overflow-hidden" 
                    style={{ background: department.colors.bg }}
                >
                    <h1 
                        className={`max-w-xl text-7xl md:text-8xl  font-extrabold mb-8 text-center px-4 break-words ${dimensionFont.className}`} 
                        style={{ color: department.colors.fg }}
                    >
                        {department.name}
                    </h1>

                    {/* 1. Grid container for the event posters */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-4 md:px-8 w-full max-w-7xl">
                        
                        {/* 2. Map over the department's events array */}
                        {department.events.map((event) => (
                            // 3. Render a poster for each event
                            <div key={event.id} className="w-full">
                                <Image
                                    src="/assets/poster.png" // Using the placeholder poster for now
                                    alt={event.title} // Use the actual event title for the alt text
                                    width={290}
                                    height={386}
                                    className="w-full h-auto rounded-lg shadow-lg"
                                />
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}