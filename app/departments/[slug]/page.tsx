import Image from 'next/image';
import { NoiseTexture } from '@/components/noise-texture';
import FluidGlass from '@/components/madeup/FluidGlass';
import Header from '../../_components/header';
import { departmentData } from '@/lib/departmentData';
import { notFound } from 'next/navigation';
import localFont from 'next/font/local';
import Link from 'next/link';
import { api } from '@/trpc/server';
import { allDepartments } from '@/logic';

const dimensionFont = localFont({
    src: "../../../public/fonts/fonnts.com-Dimensions_600R.otf",
    variable: "--font-dimension",
});

export default async function Page({ params }: { params: { slug: string } }) {

    const department = departmentData.find(d => d.slug === params.slug);
    if (!department) {
        notFound();
    }

    // Map slug to actual department key from schema
    const departmentKeyMap: Record<string, string> = {
        'ad': 'ai',
        'cs': 'cs',
        'mba': 'mba',
        'ca': 'mca',
        'mca': 'mca',
        'eee': 'ee',
        'er': 'ecs',
        'ece': 'ec',
        'civil': 'ce',
        'mec': 'me',
        'cc': 'cy',
        'aiml': 'ct',
        "general": "NA"
    };

    const departmentKey = departmentKeyMap[params.slug] || params.slug;

    // Fetch approved events for this department
    const events = await api.event.getByDepartment({
        department: departmentKey,
        limit: 50
    });
    return (
        <div className="fixed inset-0 bg-black">
            <Header backgroundColor={department.colors.fg} />

            {/* Left vertical navbar */}
            <div className="fixed left-6 top-1/2 -translate-y-1/2 z-30 hidden md:block">
                <Image
                    src="/assets/side_lines.svg"
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

            <main className="z-10 absolute top-0 right-0 left-0 bottom-0 overflow-y-auto w-full md:w-[calc(100%-150px)] mx-auto scrollbar-hide scroll-smooth">
                {/* This div is no longer needed, we'll have sections be the direct children */}
                <section
                    id='Home'
                    className="flex flex-col items-center min-h-screen pt-24 md:pt-32 pb-16 md:rounded-[2rem] overflow-hidden"
                    style={{ background: department.colors.bg }}
                >
                    <h1
                        className={`max-w-xl text-7xl md:text-8xl  mb-8 text-center px-4 break-words ${dimensionFont.className}`}
                        style={{ color: department.colors.fg }}
                    >
                        {department.name}
                    </h1>

                    {/* 1. Grid container for the event posters */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-4 md:px-8 w-full max-w-7xl">

                        {/* 2. Map over the approved events from database */}
                        {events.length > 0 ? events.map((event) => (

                            <Link
                                key={event.id}
                                href={`/departments/${department.slug}/events/${event.id}`}
                            >
                                <div className="w-full">
                                    <Image
                                        src={event.poster || "/assets/poster.png"}
                                        alt={event.name || "Event"}

                                        width={290}
                                        height={386}
                                        className="w-full h-auto rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                            </Link>
                        )) : (
                            <div className="col-span-full text-center py-12 text-black">
                                <p className="text-lg text-black opacity-70">No approved events available for this department yet.</p>
                            </div>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
}