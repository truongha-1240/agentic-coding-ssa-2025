"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/libs/supabase/client";

const FALLBACK_DATE = process.env.NEXT_PUBLIC_EVENT_DATE || "2026-12-12T19:00:00+07:00";

export function useEventDate() {
	const [eventDate, setEventDate] = useState<Date | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		let cancelled = false;
		const supabase = createClient();

		async function fetchEventDate() {
			try {
				const { data, error: queryError } = await supabase
					.from("event_settings")
					.select("value")
					.eq("key", "event_start_at")
					.single();

				if (cancelled) return;

				if (queryError || !data) {
					setEventDate(new Date(FALLBACK_DATE));
					if (queryError) setError(queryError.message);
				} else {
					setEventDate(new Date(data.value));
				}
			} catch {
				if (!cancelled) {
					setEventDate(new Date(FALLBACK_DATE));
					setError("Failed to fetch event date");
				}
			} finally {
				if (!cancelled) setIsLoading(false);
			}
		}

		fetchEventDate();
		return () => { cancelled = true; };
	}, []);

	return { eventDate, isLoading, error };
}
