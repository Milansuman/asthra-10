'use client'

import { api } from "@/trpc/react";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import EventCard from "./event-card";
import { Loader } from "lucide-react";

const CircularGalleryMade: React.FC = () => {

    const { data, isLoading, isPending, isError } = api.event.getLatest.useQuery(6);

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
                <div className="container mt-20 flex flex-row flex-wrap gap-4 justify-center">
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