"use client";

import { useTranslation } from "@/i18n";
import { DigitGroup } from "@/components/countdown/DigitGroup";

interface CountdownTimerProps {
	days: number;
	hours: number;
	minutes: number;
}

export function CountdownTimer({ days, hours, minutes }: CountdownTimerProps) {
	const { t } = useTranslation();

	return (
		<div
			className="flex items-center gap-6 md:gap-10 lg:gap-[60px]"
			role="timer"
			aria-live="polite"
		>
			<DigitGroup value={days} label={t("countdown.days")} />
			<DigitGroup value={hours} label={t("countdown.hours")} />
			<DigitGroup value={minutes} label={t("countdown.minutes")} />
		</div>
	);
}
