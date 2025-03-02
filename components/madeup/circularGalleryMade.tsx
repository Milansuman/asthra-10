'use client'

import { api } from "@/trpc/react";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import EventCard from "./event-card";
import { Loader } from "lucide-react";

const CircularGalleryMade: React.FC = () => {

    const { data, isLoading, isPending, isError } = api.event.getGeneral.useQuery(6);

    if (isLoading || isPending) {
        return (
            <div className="w-full min-h-[300px] flex items-center justify-center">
                <Loader size={50} className="animate-spin" />
            </div>
        );
    }

    return (
        <div>
            {data && data.length > 0 ?
                <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
                    {data.map((event, index) => (
                        <Link key={index} href={`/event/${event.id}`}>
                            <EventCard data={event} />
                        </Link>
                    ))}
                </div> :
                <div className="w-full min-h-[200px] flex items-center justify-center">
                    <Label variant={"glass"} size={'md'} >No Events Available</Label>
                </div>}
        </div>
    );
};


export default CircularGalleryMade;