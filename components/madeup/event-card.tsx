'use client'

import type { eventZod } from "@/lib/validator";
import type { z } from "zod";
import { Label } from "@/components/ui/label";
import Plusbox from "./box";
import { CheckCircleIcon } from "lucide-react";
import { type AllDepartments, allDepartments } from "@/logic";
import { Markdown } from "@/app/_components/md";
import { useState } from "react";

interface EventCardProps {
	data: z.infer<typeof eventZod>;
	footerNote?: string;
	className?: string;
}

const EventCard: React.FC<EventCardProps> = ({ data }) => {
	const [imageLoading, setImageLoading] = useState(true);
	return (
		<Plusbox className="p-2 relative group">
			<img
				className={`w-full ${imageLoading ? 'hidden' : 'block'}`}
				src={data.poster}
				alt={data.name ?? "SJCET Events"}
				onLoad={() => setImageLoading(false)}
			/>
			{imageLoading ? (
				<div className="w-full aspect-[3.2/4] bg-glass" />
			) : (
				<div className="absolute top-0 left-0 right-0 bottom-0 bg-glass p-4 opacity-0 group-hover:opacity-100 transition-all">
					<div className="flex flex-col items-center justify-around h-full gap-2">
						<div className="flex flex-col items-center gap-2">
							<Label variant={'glass'} className="text-sm font-thin">
								{data.department === "NA" ? "General Event" : allDepartments[data.department as AllDepartments]}
							</Label>
							<h4 className="mt-[4%]">{data.name}</h4>
							<div className="mt-[4%]">
								<Markdown>
									{data.description}
								</Markdown>
							</div>
						</div>
						<div className="flex gap-2 flex-wrap flex-row items-center justify-center">
							{data.eventType !== "ASTHRA_PASS_EVENT" && <Label variant={'glass'} className="text-sm font-thin inline-flex gap-1">KTU Points <CheckCircleIcon size={18} /></Label>}
						</div>
					</div>
				</div>
			)}
		</Plusbox>
	);
};

export default EventCard;
