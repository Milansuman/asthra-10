import React from 'react';
import Image from 'next/image'; // Import the Next.js Image component

interface Department {
    backgroundSrc: string;
    foregroundSrc: string;
}

const departmentData: Department[] = [
    { backgroundSrc: "/assets/department_bg/ad_bg.webp", foregroundSrc: "/assets/department/AD.svg" },
    { backgroundSrc: "/assets/department_bg/mba_bg.webp", foregroundSrc: "/assets/department/MBA.svg" },
    { backgroundSrc: "/assets/department_bg/ca_bg.webp", foregroundSrc: "/assets/department/CA.svg" },
    { backgroundSrc: "/assets/department_bg/mca_bg.webp", foregroundSrc: "/assets/department/MCA.svg" },
    { backgroundSrc: "/assets/department_bg/ece_bg.webp", foregroundSrc: "/assets/department/ECE.svg" },
    { backgroundSrc: "/assets/department_bg/er_bg.webp", foregroundSrc: "/assets/department/ER.svg" },
    { backgroundSrc: "/assets/department_bg/eee_bg.webp", foregroundSrc: "/assets/department/EEE.svg" },
    { backgroundSrc: "/assets/department_bg/civil_bg.webp", foregroundSrc: "/assets/department/CIVIL.svg" },
    { backgroundSrc: "/assets/department_bg/mec_bg.webp", foregroundSrc: "/assets/department/MEC.svg" },
    { backgroundSrc: "/assets/department_bg/cc_bg.webp", foregroundSrc: "/assets/department/CC.svg" },
    { backgroundSrc: "/assets/department_bg/cs_bg.webp", foregroundSrc: "/assets/department/cs.svg" },
    { backgroundSrc: "/assets/department_bg/cs_bg.webp", foregroundSrc: "/assets/department/cs.svg" },
];

const GridCell = ({ backgroundSrc, foregroundSrc }: Department) => {
    return (
        <div className="group relative rounded-xl overflow-hidden border border-gray-300 shadow-sm aspect-[4/3]">
            {/* Background Image using next/image */}
            <Image
                src={backgroundSrc}
                alt="Department background"
                fill
                className="object-cover z-10 transition-all duration-300 ease-in-out  group-hover:opacity-60"
            />

            {/* Foreground Image (Logo) using next/image */}
            <div
                className="absolute inset-0 m-auto w-3/4 h-3/4 z-20 
                   transition-all duration-300 ease-in-out 
                   group-hover:scale-110"
            >
                {/* Step 2: Place the logo Image inside the new container */}
                <Image
                    src={foregroundSrc}
                    alt="Department logo"
                    fill
                    className="object-contain" // Classes are simpler now
                />
            </div>
        </div>
    );
};

const DepGrid = () => {
    return (
        <div className="p-6 w-full">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
                {departmentData.map((dept, index) => (
                    <GridCell
                        key={index}
                        backgroundSrc={dept.backgroundSrc}
                        foregroundSrc={dept.foregroundSrc}
                    />
                ))}
            </div>
        </div>
    );
};

export default DepGrid;