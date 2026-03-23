"use client";

import { useCallback } from "react";
import { SUN_KUDOS_TEXTS } from "@/utils/sun-kudos-data";
import { useUserStats } from "@/hooks/useUserStats";
import { useGiftRecipients } from "@/hooks/useGiftRecipients";
import { StatsOverview } from "@/components/sun-kudos/StatsOverview";
import { GiftRecipientsList } from "@/components/sun-kudos/GiftRecipientsList";

export function StatsSidebar() {
	const { stats } = useUserStats();
	const { recipients, hasMore, loadMore } = useGiftRecipients();

	const handleOpenSecretBox = useCallback(() => {
		// Will be implemented when API is ready
	}, []);

	return (
		<aside
			className="w-full lg:w-80 lg:sticky lg:top-[100px] flex flex-col gap-6"
			role="complementary"
			aria-label={SUN_KUDOS_TEXTS.aria.statsSidebar}
		>
			<StatsOverview stats={stats} onOpenSecretBox={handleOpenSecretBox} />
			<GiftRecipientsList
				recipients={recipients}
				hasMore={hasMore}
				onLoadMore={loadMore}
			/>
		</aside>
	);
}
