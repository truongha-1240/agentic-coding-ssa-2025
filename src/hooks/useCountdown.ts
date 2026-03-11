"use client";

import { useState, useEffect } from "react";

interface CountdownResult {
	days: number;
	hours: number;
	minutes: number;
	isExpired: boolean;
}

function calculateTimeLeft(targetDate: Date): CountdownResult {
	const now = new Date();
	const diff = targetDate.getTime() - now.getTime();

	if (diff <= 0) {
		return { days: 0, hours: 0, minutes: 0, isExpired: true };
	}

	const totalMinutes = Math.floor(diff / (1000 * 60));
	const days = Math.floor(totalMinutes / (60 * 24));
	const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
	const minutes = totalMinutes % 60;

	return { days, hours, minutes, isExpired: false };
}

export function useCountdown(): CountdownResult {
	const [timeLeft, setTimeLeft] = useState<CountdownResult>(() => {
		const dateStr = process.env.NEXT_PUBLIC_EVENT_DATETIME;
		if (!dateStr) {
			return { days: 0, hours: 0, minutes: 0, isExpired: true };
		}
		const target = new Date(dateStr);
		if (isNaN(target.getTime())) {
			return { days: 0, hours: 0, minutes: 0, isExpired: true };
		}
		return calculateTimeLeft(target);
	});

	useEffect(() => {
		const dateStr = process.env.NEXT_PUBLIC_EVENT_DATETIME;
		if (!dateStr) return;

		const target = new Date(dateStr);
		if (isNaN(target.getTime())) return;

		const interval = setInterval(() => {
			setTimeLeft(calculateTimeLeft(target));
		}, 60000);

		return () => clearInterval(interval);
	}, []);

	return timeLeft;
}
