import {
	Img,
	Section,
	Text,
	Row,
	Column,
} from "@react-email/components";
import { allDepartments, getTimeUtils } from "@/logic";
import type { EventZodType } from '@/lib/validator';

export default function EventSection({ event }: { event: EventZodType }) {
	return (
		<Section className="bg-white border-2 border-solid border-[#5B9BE6] py-[3%] px-[1%] max-w-[350px] mt-8 rounded-lg">
			<Row>
				<Row>
					<Column align="center" className="w-1/2">
						<Img src={event.poster} className="w-[90%] max-w-[120px] object-contain rounded-lg" />
					</Column>
					<Column align="left" className="w-1/2">
						<Text className="m-0 mb-[4%] text-[15px] underline font-extrabold">Event Details</Text>
						<Text className="m-0"><strong>Name:</strong> {event.name}</Text>
						<Text className="m-0 mt-[1%]"><strong>Venue:</strong> {event.venue}</Text>
						<Text className="m-0 mt-[1%]"><strong>Date:</strong> {getTimeUtils(event.dateTimeStarts)}</Text>
						{event.department === "NA" ?
							<>
								<Text className="m-0 mt-[1%]"><strong>Dept:</strong> General</Text>
								<Text className="m-0 mt-[1%] break-words"><strong>Reg Type:</strong> {event.registrationType.charAt(0).toUpperCase() + event.registrationType.slice(1)}</Text>
							</>
							:
							<Text className="m-0 mt-[1%]"><strong>Dept:</strong> {allDepartments[event.department as keyof typeof allDepartments]}</Text>
						}
					</Column>
				</Row>
			</Row>
		</Section>
	)
}