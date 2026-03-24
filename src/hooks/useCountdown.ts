"use client";

import { useState, useEffect, useCallback } from "react";

interface CountdownResult {
	days: number;
	hours: number;
	minutes: number;
	isExpired: boolean;
}

function calculate(target: Date): CountdownResult {
	const diff = target.getTime() - Date.now();
	if (diff <= 0) {
		return { days: 0, hours: 0, minutes: 0, isExpired: true };
	}
	return {
		days: Math.min(99, Math.floor(diff / 86400000)),
		hours: Math.floor((diff % 86400000) / 3600000),
		minutes: Math.floor((diff % 3600000) / 60000),
		isExpired: false,
	};
}

export function useCountdown(targetDate: Date | null): CountdownResult {
	const [result, setResult] = useState<CountdownResult>({
		days: 0,
		hours: 0,
		minutes: 0,
		isExpired: false,
	});

	const update = useCallback(() => {
		if (!targetDate) return;
		setResult(calculate(targetDate));
	}, [targetDate]);

	useEffect(() => {
		if (!targetDate) return;
		update();
		const interval = setInterval(update, 1000);
		return () => clearInterval(interval);
	}, [targetDate, update]);

	return result;
}
