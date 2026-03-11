import Image from "next/image";
import { CountdownTimer } from "@/components/homepage/CountdownTimer";
import { EventInfo } from "@/components/homepage/EventInfo";
import { CTAButton } from "@/components/homepage/CTAButton";

export function HeroBanner() {
	return (
		<div className="flex flex-col items-start gap-10 px-6 lg:px-0 w-full max-w-[1224px] min-h-[calc(100svh-120px)] lg:min-h-[calc(100svh-176px)]">
			{/* ROOT FURTHER title */}
			<Image
				src="/images/homepage/root-further-logo.png"
				alt="ROOT FURTHER"
				width={451}
				height={200}
				className="w-[300px] lg:w-[451px] h-auto"
			/>

			{/* Countdown + Event Info sub-container (gap: 16px) */}
			<div className="flex flex-col gap-4 w-full">
				<CountdownTimer />
				<EventInfo />
			</div>

			{/* CTA Buttons */}
			<div className="flex flex-col md:flex-row gap-4 md:gap-10 w-full md:w-auto">
				<CTAButton href="/awards-information" label="ABOUT AWARDS" />
				<CTAButton href="/sun-kudos" label="ABOUT KUDOS" />
			</div>
		</div>
	);
}
