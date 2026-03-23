"use client";

import { useState } from "react";
import type { UserStats } from "@/types/kudos";

const MOCK_STATS: UserStats = {
	kudosReceived: 25,
	kudosSent: 25,
	heartsReceived: 25,
	secretBoxesOpened: 25,
	secretBoxesUnopened: 25,
};

interface UseUserStatsReturn {
	stats: UserStats;
	isLoading: boolean;
	error: string | null;
}

export function useUserStats(): UseUserStatsReturn {
	const [stats] = useState<UserStats>(MOCK_STATS);
	const [isLoading] = useState(false);
	const [error] = useState<string | null>(null);

	return { stats, isLoading, error };
}
