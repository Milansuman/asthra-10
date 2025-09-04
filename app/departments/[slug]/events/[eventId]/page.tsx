import { departmentData } from '@/lib/departmentData';
import { notFound } from 'next/navigation';
import Header from '@/app/_components/header';
import Image from 'next/image';
import { NoiseTexture } from '@/components/noise-texture';

interface EventPageProps {
    params: {
        slug: string;
        eventId: string;
    };
}

export default function EventPage({ params }: EventPageProps) {

    console.log("this is params:", params);
    // 1. Find the correct department using the first URL parameter
    const department = departmentData.find(d => d.slug === params.slug);

    // 2. If department not found, show 404
    if (!department) {
        notFound();
    }

    // 3. Find the correct event within that department using the second URL parameter
    const event = department.events.find(e => e.id === params.eventId);

    // 4. If event not found, show 404
    if (!event) {
        notFound();
    }
    const eventDate = event.date
    const eventFee = event.fee
    const rules = event.rules
    return (
        // We'll theme the entire page with the department's colors
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
                    className="container flex flex-col items-center justify-center min-h-screen pt-24 md:pt-32 pb-16 md:rounded-[2rem] overflow-hidden "
                    style={{ background: department.colors.bg }}
                >
                    <h1
                        className={`max-w-xl text-7xl md:text-8xl  mb-8 text-center px-4 break-words font-dimension`}
                        style={{ color: department.colors.fg }}
                    >
                        {department.name}
                    </h1>
                    <div className='max-w-6xl flex flex-wrap mx-auto  justify-center  gap-16 '>
                        <div className="w-full md:w-1/3 flex-shrink-0 flex items-center justify-center mb-0 min-w-[296px]">
                            <Image
                                src="/assets/poster.png"
                                alt={event.title}
                                width={290}
                                height={386}
                                className="w-full max-w-[290px] h-auto rounded-lg border-2 border-black"
                                style={{ minWidth: '296px' }} // fallback for inline style if needed
                            />
                        </div>
                        <div className="flex-1 flex flex-col justify-start md:min-w-[400px]">
                            <h2 className="event-title font-black text-5xl md:text-7xl mb-2 text-black font-dimension">{event.title}</h2>
                            <p className="event-desc text-xl md:text-lg text-black text-justify mb-4">{event.description}</p>
                            <div className='flex flex-col md:flex-row justify-between flex-wrap '>
                                <div className="flex gap-2 justify-center mb-4 md:mb-0 bg-[#F6E7D6] py-2">
                                    <span
                                        className="px-7 py-2 md:py-3 rounded-full border-2 border-[#2D2926] bg-transparent text-[#2D2926] text-base font-semibold text-center shadow-[inset_0_2px_4px_#e4d4c2]"
                                    >
                                        Date : {eventDate}
                                    </span>
                                    <span
                                        className="px-7 py-2 md:py-3 rounded-full border-2 border-[#2D2926] bg-transparent text-[#2D2926] text-base font-semibold text-center shadow-[inset_0_2px_4px_#e4d4c2]"
                                    >
                                        Reg Fees : Rs.{eventFee}
                                    </span>
                                </div>
                                <button className=" text-white text-xl  font-normal px-10 py-3 rounded-full tracking-normal shadow-none border-none outline-none" style={{ backgroundColor: department.colors.fg }}>
                                    REGISTER
                                </button>
                            </div>

                        </div>

                    </div>
                    <div className="mt-6">
                        <h3 className="rules-header font-bold text-xl text-black mb-2">Rules:</h3>
                        <ol className="rules-list list-decimal pl-4 text-black text-xl text-justify">
                            {Array.isArray(rules)
                                ? rules.map((rule, idx) => (
                                    <li key={idx} className="mb-1">{rule}</li>
                                ))
                                : typeof rules === 'string' && rules.trim() !== ''
                                    ? <li className="mb-1">{rules}</li>
                                    : null
                            }
                        </ol>
                    </div>


                </section>
            </main>
        </div>
    );
}