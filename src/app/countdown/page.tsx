"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useTranslation } from "@/i18n";
import { useEventDate } from "@/hooks/useEventDate";
import { useCountdown } from "@/hooks/useCountdown";
import { CountdownTimer } from "@/components/countdown/CountdownTimer";

export default function CountdownPage() {
	const router = useRouter();
	const { t } = useTranslation();
	const { eventDate, isLoading } = useEventDate();
	const { days, hours, minutes, isExpired } = useCountdown(eventDate);
	const redirectTimerRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		if (isLoading) return;

		if (isExpired) {
			// Show 00 00 00 for 3 seconds then redirect
			redirectTimerRef.current = setTimeout(() => {
				router.push("/");
			}, 3000);
		}

		return () => {
			if (redirectTimerRef.current) {
				clearTimeout(redirectTimerRef.current);
			}
		};
	}, [isExpired, isLoading, router]);

	return (
		<main className="relative w-full h-screen bg-[var(--color-bg-primary)] overflow-hidden">
			{/* Background KV image */}
			<Image
				src="/images/sun-kudos/keyvisual.png"
				alt=""
				width={1512}
				height={1077}
				priority
				sizes="100vw"
				className="absolute inset-0 w-full h-full object-cover z-[1]"
				aria-hidden="true"
			/>

			{/* Gradient overlay */}
			<div
				className="absolute inset-0 z-[2]"
				style={{
					background:
						"linear-gradient(18deg, #00101A 15.48%, rgba(0, 18, 29, 0.46) 52.13%, rgba(0, 19, 32, 0) 63.41%)",
				}}
				aria-hidden="true"
			/>

			{/* Content */}
			<div className="relative z-[3] flex flex-col items-center justify-center h-full gap-6 px-6">
				<h1 className="text-white font-bold text-xl md:text-2xl lg:text-[36px] lg:leading-[48px] text-center font-montserrat">
					{t("countdown.title")}
				</h1>

				<CountdownTimer days={days} hours={hours} minutes={minutes} />
			</div>
		</main>
	);
}
