'use client'

import { eventZod } from "@/lib/validator";
import React from "react";
import { z } from "zod";
import { PlusIcon } from "./plus";

interface EventCardProps {
	data: z.infer<typeof eventZod>;
	credits?: string;
	footerNote?: string;
}

const EventCard: React.FC<EventCardProps> = ({ data, credits, footerNote }) => {
	const [hovered, setHovered] = React.useState(false);
	return (
		<div
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
			className="border group/canvas-card flex items-center justify-center border-glass bg-glass max-w-sm w-full mx-auto p-4 relative"
		>
			<PlusIcon className="absolute h-6 w-6 -top-3 -left-3" />
			<PlusIcon className="absolute h-6 w-6 -bottom-3 -left-3" />
			<PlusIcon className="absolute h-6 w-6 -top-3 -right-3" />
			<PlusIcon className="absolute h-6 w-6 -bottom-3 -right-3" />

			<div className="relative z-20 bg-glass ambit">
				<div className="p-4 text-xl flex items-center flex-col justify-center opacity-0 group-hover/canvas-card:opacity-100 absolute left-0 top-0 right-0 bottom-0 z-10    font-bold group-hover/canvas-card:text-white group-hover/canvas-card:-translate-y-2 transition duration-200">
					<h5 className="text-4xl">{data.name}</h5>
					<p className="text-sm font-thin">{data.registrationType}</p>
					<p className="text-sm font-thin">{data.description}</p>
					<p className="text-xl font-thin mt-10">Registration Fees: {data.amount}</p>
				</div>
				<div className="text-center  group-hover/canvas-card:scale-105 group-hover/canvas-card:blur-sm group-hover/canvas-card:brightness-75 transition duration-200 w-full  mx-auto flex items-center justify-center">
					{/* <img src={data.poster} alt={data.name} className="w-full" /> */}
					<img src={data.poster} alt="Sjcet event" className="w-full" />
				</div>
			</div>
		</div>
	);
};

export default EventCard;
