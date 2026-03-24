import { EVENT_LOCATION, EVENT_NOTE } from "@/utils/homepage-data";

interface EventInfoProps {
	eventDate: Date | null;
}

function formatEventDate(date: Date): string {
	const day = String(date.getDate()).padStart(2, "0");
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const year = date.getFullYear();
	return `${day}/${month}/${year}`;
}

export function EventInfo({ eventDate }: EventInfoProps) {
	return (
		<div className="flex flex-col gap-2 text-sm md:text-base font-bold leading-6 tracking-[0.15px] text-white">
			<p>
				{eventDate ? `Thời gian: ${formatEventDate(eventDate)}` : "Thời gian: --/--/----"} &nbsp;&nbsp; Địa điểm: {EVENT_LOCATION}
			</p>
			<p>{EVENT_NOTE}</p>
		</div>
	);
}
