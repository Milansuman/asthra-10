import React from 'react';
import Image from 'next/image';

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
    // You can add the 12th item back here if you wish
];

const GridCell = ({ backgroundSrc, foregroundSrc }: Department) => {
    return (
        // 2. Add responsive width classes to each cell and padding for the gap
        <div className="w-1/2 md:w-1/4 p-2">
            <div className="group relative rounded-xl overflow-hidden border border-gray-300 shadow-sm aspect-[4/3]">
                <Image
                    src={backgroundSrc}
                    alt="Department background"
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
                        alt="Department logo"
                        fill
                        className="object-contain"
                    />
                </div>
            </div>
        </div>
    );
};

const DepGrid = () => {
    return (
        <div className="p-6 w-full">
            {/* 1. Change the container from 'grid' to 'flex flex-wrap' */}
            <div className="flex flex-wrap justify-center max-w-5xl mx-auto">
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