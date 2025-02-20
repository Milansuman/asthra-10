import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardTitle,
} from "@/components/ui/card";
import { eventZod } from "@/lib/validator";
import React from "react";
import { z } from "zod";

interface EventCardProps {
	data: z.infer<typeof eventZod>;
	credits?: string;
	footerNote?: string;
}

const EventCard: React.FC<EventCardProps> = ({ data, credits, footerNote }) => {
	return (
		<Card className="ambit w-full max-w-2xl bg-white rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 border border-gray-100 p-6 text-white">
			<div className="flex flex-col space-y-3">
				{/* Header and Credits Section */}
				<div className="flex justify-between items-start">
					<div className="flex-1 pr-4">
						<CardTitle className="text-4xl mb-3">{data.name}</CardTitle>
						{data.description && (
							<CardDescription className="text-xl text-white">
								{data.description}
							</CardDescription>
						)}
					</div>
					{credits && (
						<div className="bg-white text-blue-600 px-4 py-2 rounded-lg flex-shrink-0">
							<span className="ambit">{credits}</span>
						</div>
					)}
				</div>

				{/* Card with logo and bullet points */}
				<div className="flex mt-4">
					<Card className="bg-white w-52 h-64 flex justify-center items-center rounded-md overflow-hidden flex-shrink-0">
						<CardContent className="flex flex-col justify-center items-center p-0 w-full h-full">
							<img
								src={data.poster}
								alt="Event logo"
								className="w-full h-full object-cover"
							/>
						</CardContent>
					</Card>

					<div className="ml-8 flex items-center">
						<ul className="list-disc space-y-1 pl-6">
							<li className="list-item text-xl">
								<span className="ambit">Amount:</span>
								{data.amount}
							</li>
							<li className="list-item text-xl">
								<span className="ambit">Venue:</span>
								{data.venue}
							</li>
							<li className="list-item text-xl">
								<span className="ambit">Event Type:</span>
								{data.eventType}
							</li>
							<li className="list-item text-xl">
								<span className="ambit">Only {data.regLimit} seats!</span>
							</li>
						</ul>
					</div>
				</div>

				{/* Footer */}
				<div className="flex justify-between items-center mt-4">
					{footerNote && <p className="text-xl">{footerNote}</p>}
					<Button
						variant="outline"
						className="bg-white text-blue-500 border-2 border-gray-300 px-6 py-6 text-xl rounded-lg"
					>
						{data.eventType === "ASTHRA_PASS" && "Buy Ticket"}
						{data.eventType === "WORKSHOP" && `Purchase for ₹${data.amount}`}
						{data.eventType === "ASTHRA_PASS_EVENT" && "Buy Asthra Pass First"}
					</Button>
				</div>
			</div>
		</Card>
	);
};

export default EventCard;
