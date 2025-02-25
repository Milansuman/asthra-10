'use client'
import { api } from "@/trpc/react";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Label } from "../ui/label";
import EventCard from "./event-card";
import Link from "next/link";

const images = [
    "/assets/Ref2.webp",
    "/assets/Ref4.webp",
    "/assets/Ref5.webp",
    "/assets/Ref6.webp",
];

const CircularGalleryMade: React.FC = () => {

    const { data, isLoading, isPending, isError } = api.event.getLatest.useQuery();

    if (isLoading || isPending) return (<div className="w-full min-h-[300px] flex items-center justify-center">
        <Label size={'md'} >Loading Events...</Label>
    </div>);

    return (
        <div>
            {data && data.length > 0 ? <div className="relative w-full mt-10 gap-10 no-scrollbar px-10 py-10 flex items-start md:justify-center justify-start overflow-scroll select-none">
                {data.map((event, index) => (

                    <Link key={index} href={`/event/${event.id}`}>
                        <EventCard credits={false} className="max-h-[350px] aspect-[4.5/5] h-full" data={event} />
                    </Link>
                ))}
            </div> : <div className="w-full min-h-[200px] flex items-center justify-center">
                <Label size={'md'} >No Events Available</Label>
            </div>}
        </div>
    );
};


export default CircularGalleryMade;