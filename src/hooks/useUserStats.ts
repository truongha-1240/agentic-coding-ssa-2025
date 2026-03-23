"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/libs/supabase/client";
import type { UserStats } from "@/types/kudos";

const DEFAULT_STATS: UserStats = {
	kudosReceived: 0,
	kudosSent: 0,
	heartsReceived: 0,
	secretBoxesOpened: 0,
	secretBoxesUnopened: 0,
};

interface UseUserStatsReturn {
	stats: UserStats;
	isLoading: boolean;
	error: string | null;
}

export function useUserStats(): UseUserStatsReturn {
	const [stats, setStats] = useState<UserStats>(DEFAULT_STATS);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function fetchStats() {
			setIsLoading(true);
			setError(null);
			try {
				const supabase = createClient();
				const {
					data: { user },
				} = await supabase.auth.getUser();

				if (!user) {
					setStats(DEFAULT_STATS);
					return;
				}

				const { data, error: rpcError } = await supabase.rpc(
					"get_user_stats",
					{
						p_user_id: user.id,
					},
				);

				if (rpcError) throw rpcError;

				const row = Array.isArray(data) ? data[0] : data;

				if (row) {
					setStats({
						kudosReceived: row.kudos_received ?? 0,
						kudosSent: row.kudos_sent ?? 0,
						heartsReceived: row.hearts_received ?? 0,
						secretBoxesOpened: row.secret_boxes_opened ?? 0,
						secretBoxesUnopened: row.secret_boxes_unopened ?? 0,
					});
				}
			} catch (err) {
				setError(
					err instanceof Error ? err.message : "Failed to load user stats",
				);
			} finally {
				setIsLoading(false);
			}
		}

		fetchStats();
	}, []);

	return { stats, isLoading, error };
}
