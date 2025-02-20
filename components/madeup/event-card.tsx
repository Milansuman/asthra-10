'use client'
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { eventZod } from "@/lib/validator";
import { AnimatePresence, motion } from "motion/react";
import React from "react";
import { z } from "zod";

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
			className="border  group/canvas-card flex items-center justify-center dark:border-white/[0.2]  max-w-sm w-full mx-auto p-2 h-[30rem] relative"
		>
			<Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
			<Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
			<Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
			<Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />

			<div className="relative z-20 glass ambit">
				<div className="text-white p-4 text-xl flex flex-col justify-end opacity-0 group-hover/canvas-card:opacity-100 absolute left-0 top-0 right-0 bottom-0 z-10    font-bold group-hover/canvas-card:text-white group-hover/canvas-card:-translate-y-2 transition duration-200">
					<h5 className="text-4xl">{data.name}</h5>
					<p className="text-sm font-thin">{data.description}</p>
				</div>
				<div className="text-center  group-hover/canvas-card:scale-105 group-hover/canvas-card:blur-sm group-hover/canvas-card:brightness-75 transition duration-200 w-full  mx-auto flex items-center justify-center">
					<img src="/assets/Ref2.webp" alt="Sjcet event" className="w-full" />
				</div>
			</div>
		</div>
	);
};
const AceternityIcon = () => {
	return (
		<svg
			width="66"
			height="65"
			viewBox="0 0 66 65"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className="h-10 w-10 text-black dark:text-white group-hover/canvas-card:text-white "
		>
			<path
				d="M8 8.05571C8 8.05571 54.9009 18.1782 57.8687 30.062C60.8365 41.9458 9.05432 57.4696 9.05432 57.4696"
				stroke="currentColor"
				strokeWidth="15"
				strokeMiterlimit="3.86874"
				strokeLinecap="round"
				style={{ mixBlendMode: "darken" }}
			/>
		</svg>
	);
};

export const Icon = ({ className, ...rest }: any) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth="1.5"
			stroke="currentColor"
			className={className}
			{...rest}
		>
			<path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
		</svg>
	);
};
export default EventCard;
