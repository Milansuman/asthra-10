'use client'

import type { eventZod } from "@/lib/validator";
import type { z } from "zod";
import { Label } from "@/components/ui/label";
import Plusbox from "./box";
import { CheckCircleIcon } from "lucide-react";
import { type AllDepartments, allDepartments } from "@/logic";
import { Markdown } from "@/app/_components/md";
import { useState } from "react";
import Image from "next/image";

interface EventCardProps {
	data: z.infer<typeof eventZod>;
	footerNote?: string;
	className?: string;
}

const EventCard: React.FC<EventCardProps> = ({ data }) => {
	// const [imageLoading, setImageLoading] = useState(true);
	return (
		<Plusbox className="p-2 relative group">
			{/* <img
				className={`w-full aspect-[3.2/4] ${imageLoading ? 'hidden' : 'block'}`}
				src={data.poster}
				alt={data.name ?? "SJCET Events"}
				onLoad={() => setImageLoading(false)}
			/> */}

			{/* Use this when cloudinary doesn't work */}
			<Image
				src={data.poster ?? '/sjcet/1.jpeg'}
				width={400}
				height={600}
				alt={data.name ?? "SJCET Events"}
				className="w-full rounded-t-md"
			/>
			<div className="absolute top-0 left-0 right-0 bottom-0 bg- p-4 opacity-0 group-hover:opacity-100 transition-all">
				<div className="flex flex-col items-center justify-between h-full gap-1 lg:gap-2 py-5">
					<div className="flex flex-col items-center gap-3 xl:gap-4 mb-[5%] overflow-hidden">
						<Label variant={''} className="text-sm font-thin text-center">
							{data.department === "NA" ? (data.registrationType === "spot" ? "Informal Event" : "General Event") : allDepartments[data.department as AllDepartments]}
						</Label>
						<h4 className="mt-[4%]">{data.name}</h4>
						<div className="mt-[4%] overflow-hidden">
							<Markdown>
								{data.description}
							</Markdown>
							<p className="text-center font-bold">...</p>
						</div>
					</div>
					<div className="flex gap-2 flex-wrap flex-row items-center justify-center">
						{data.eventType !== "ASTHRA_PASS_EVENT" && <Label variant={''} className="text-sm font-thin inline-flex gap-1">KTU Points <CheckCircleIcon size={18} /></Label>}
					</div>
				</div>
			</div>
		</Plusbox>
	);
};

export default EventCard;
