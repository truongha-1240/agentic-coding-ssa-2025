"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/libs/supabase/client";
import type { GiftRecipient, KudoUser } from "@/types/kudos";

const PAGE_SIZE = 5;

interface UseGiftRecipientsReturn {
	recipients: GiftRecipient[];
	hasMore: boolean;
	loadMore: () => void;
	isLoading: boolean;
}

export function useGiftRecipients(): UseGiftRecipientsReturn {
	const [allRecipients, setAllRecipients] = useState<GiftRecipient[]>([]);
	const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function fetchGifts() {
			setIsLoading(true);
			try {
				const supabase = createClient();
				const { data, error } = await supabase
					.from("gifts")
					.select(
						"*, recipient:profiles(*, department:departments(name), hero_title:hero_titles(name,color))",
					)
					.order("created_at", { ascending: false })
					.limit(50);

				if (error) throw error;

				const mapped: GiftRecipient[] = (data || []).map(
					(row: Record<string, unknown>) => {
						const profile = row.recipient as Record<string, unknown> | null;
						const dept = profile?.department as Record<
							string,
							string
						> | null;
						const heroTitle = profile?.hero_title as Record<
							string,
							string
						> | null;

						const user: KudoUser = {
							id: (profile?.id as string) || "",
							name:
								(profile?.full_name as string) ||
								(profile?.name as string) ||
								"",
							avatar: (profile?.avatar_url as string) || "",
							department: dept?.name || "",
							starCount: (profile?.star_count as number) || 0,
							title: heroTitle?.name || "",
						};

						return {
							id: row.id as string,
							user,
							description: (row.description as string) || "",
							isNew: (row.is_new as boolean) || false,
						};
					},
				);

				setAllRecipients(mapped);
			} catch (err) {
				console.error("Failed to load gift recipients:", err);
			} finally {
				setIsLoading(false);
			}
		}

		fetchGifts();
	}, []);

	const recipients = allRecipients.slice(0, visibleCount);
	const hasMore = visibleCount < allRecipients.length;

	const loadMore = useCallback(() => {
		setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, allRecipients.length));
	}, [allRecipients.length]);

	return { recipients, hasMore, loadMore, isLoading };
}
