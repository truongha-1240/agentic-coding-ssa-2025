import { EVENT_LOCATION, EVENT_NOTE } from "@/utils/homepage-data";

export function EventInfo() {
	return (
		<div className="flex flex-col gap-2 text-sm md:text-base font-bold leading-6 tracking-[0.15px] text-white">
			<p>
				Thời gian: 26/12/2025 &nbsp;&nbsp; Địa điểm: {EVENT_LOCATION}
			</p>
			<p>{EVENT_NOTE}</p>
		</div>
	);
}
