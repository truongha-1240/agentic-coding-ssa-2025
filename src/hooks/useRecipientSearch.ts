"use client";

import { useState, useEffect, useRef } from "react";
import { createClient } from "@/libs/supabase/client";

interface RecipientResult {
	id: string;
	name: string;
	email: string;
	avatar_url: string;
	department: string;
}

export function useRecipientSearch(query: string) {
	const [results, setResults] = useState<RecipientResult[]>([]);
	const [isSearching, setIsSearching] = useState(false);
	const timerRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		if (timerRef.current) clearTimeout(timerRef.current);

		if (query.trim().length < 1) {
			setResults([]);
			setIsSearching(false);
			return;
		}

		setIsSearching(true);
		timerRef.current = setTimeout(async () => {
			const supabase = createClient();
			const { data, error } = await supabase
				.from("profiles")
				.select("id, name, email, avatar_url, department:departments(name)")
				.ilike("name", `%${query}%`)
				.limit(10);

			if (!error && data) {
				setResults(
					data.map((r) => ({
						id: r.id,
						name: r.name,
						email: r.email,
						avatar_url: r.avatar_url || "",
						department:
							(r.department as unknown as Record<string, string>)?.name || "",
					})),
				);
			}
			setIsSearching(false);
		}, 300);

		return () => {
			if (timerRef.current) clearTimeout(timerRef.current);
		};
	}, [query]);

	return { results, isSearching };
}
