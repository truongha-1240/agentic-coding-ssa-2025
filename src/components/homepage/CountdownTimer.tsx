"use client";

import { useCountdown } from "@/hooks/useCountdown";
import { CountdownTile } from "@/components/homepage/CountdownTile";

export function CountdownTimer() {
	const { days, hours, minutes, isExpired } = useCountdown();

	return (
		<div className="flex flex-col gap-4 w-full max-w-[1224px]">
			{!isExpired && (
				<p className="text-2xl font-bold leading-8 text-white">
					Comming soon
				</p>
			)}
			<div
				className="flex flex-row gap-4 md:gap-10 items-center"
				aria-live="polite"
			>
				<CountdownTile value={days} label="Days" />
				<CountdownTile value={hours} label="Hours" />
				<CountdownTile value={minutes} label="Minutes" />
			</div>
		</div>
	);
}
