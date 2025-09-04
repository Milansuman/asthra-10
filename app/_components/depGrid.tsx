import React from 'react';
import Image from 'next/image';
import Link from 'next/link'; // 1. Import the Link component

// Define the shape of the data
interface Dep {
    slug: string; // 2. Added a 'slug' for linking
    backgroundSrc: string;
    foregroundSrc: string;
}

// 3. Added the 'slug' property to your existing data array
const depData: Dep[] = [
    { slug: 'ad', backgroundSrc: "/assets/department_bg/ad_bg.webp", foregroundSrc: "/assets/department/AD.svg" },
    { slug: 'mba', backgroundSrc: "/assets/department_bg/mba_bg.webp", foregroundSrc: "/assets/department/MBA.svg" },
    { slug: 'ca', backgroundSrc: "/assets/department_bg/ca_bg.webp", foregroundSrc: "/assets/department/CA.svg" },
    { slug: 'mca', backgroundSrc: "/assets/department_bg/mca_bg.webp", foregroundSrc: "/assets/department/MCA.svg" },
    { slug: 'ece', backgroundSrc: "/assets/department_bg/ece_bg.webp", foregroundSrc: "/assets/department/ECE.svg" },
    { slug: 'er', backgroundSrc: "/assets/department_bg/er_bg.webp", foregroundSrc: "/assets/department/ER.svg" },
    { slug: 'eee', backgroundSrc: "/assets/department_bg/eee_bg.webp", foregroundSrc: "/assets/department/EEE.svg" },
    { slug: 'civil', backgroundSrc: "/assets/department_bg/civil_bg.webp", foregroundSrc: "/assets/department/CIVIL.svg" },
    { slug: 'mec', backgroundSrc: "/assets/department_bg/mec_bg.webp", foregroundSrc: "/assets/department/MEC.svg" },
    { slug: 'cc', backgroundSrc: "/assets/department_bg/cc_bg.webp", foregroundSrc: "/assets/department/CC.svg" },
    { slug: 'cs', backgroundSrc: "/assets/department_bg/cs_bg.webp", foregroundSrc: "/assets/department/cs.svg" },
];

const GridCell = ({ backgroundSrc, foregroundSrc }: Omit<Dep, 'slug'>) => {
    return (
        <div className="group relative rounded-xl overflow-hidden border border-gray-300 shadow-sm aspect-[4/3]">
            <Image
                src={backgroundSrc}
                alt="Dep background"
                fill
                className="object-cover z-10 transition-all duration-300 ease-in-out group-hover:opacity-60"
            />
            <div
                className="absolute inset-0 m-auto w-3/4 h-3/4 z-20 
                           transition-all duration-300 ease-in-out 
                           group-hover:scale-110"
            >
                <Image
                    src={foregroundSrc}
                    alt="Dep logo"
                    fill
                    className="object-contain"
                />
            </div>
        </div>
    );
};

const DepGrid = () => {
    return (
        <div className="p-6 w-full">
            <div className="flex flex-wrap justify-center -m-2 max-w-5xl mx-auto">
                {depData.map((dept) => (
                    // 4. Wrap the cell in a Link and use the new slug for the href
                    <Link
                        key={dept.slug}
                        href={`/departments/${dept.slug}`}
                        className="w-1/2 md:w-1/4 p-2 cursor-pointer"
                    >
                        <GridCell
                            backgroundSrc={dept.backgroundSrc}
                            foregroundSrc={dept.foregroundSrc}
                        />
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default DepGrid;