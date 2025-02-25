'use client'

import type { eventZod } from "@/lib/validator";
import type { z } from "zod";
import { Label } from "@/components/ui/label";
import Plusbox from "./box";
import Image from "next/image";

interface EventCardProps {
	data: z.infer<typeof eventZod>;
	credits?: boolean;
	footerNote?: string;
	className?: string;
}

const EventCard: React.FC<EventCardProps> = ({ data, credits = true }) => {
	return (
		<Plusbox className="p-2 relative group">
			<Image width={400} height={500} src={data.poster} alt={data.name ?? "SJCET Events"} />
			<div className="absolute top-0 left-0 right-0 bottom-0 bg-glass p-4 opacity-0 group-hover:opacity-100 transition-all">
				<div className="flex flex-col items-center justify-center h-full">
					<h4>{data.name}</h4>
					<p>{data.description}</p>
					<Label variant={'glass'} className="text-sm font-thin mt-2">{data.registrationType}</Label>
					{credits && <p className="text-xl font-thin mt-10">Registration Fees: {data.amount}</p>}
				</div>
			</div>
		</Plusbox>
	);
};

export default EventCard;
