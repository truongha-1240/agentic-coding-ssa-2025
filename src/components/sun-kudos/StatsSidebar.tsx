"use client";

import { useCallback } from "react";
import { useTranslation } from "@/i18n";
import { useUserStats } from "@/hooks/useUserStats";
import { useGiftRecipients } from "@/hooks/useGiftRecipients";
import { StatsOverview } from "@/components/sun-kudos/StatsOverview";
import { GiftRecipientsList } from "@/components/sun-kudos/GiftRecipientsList";

export function StatsSidebar() {
	const { t } = useTranslation();
	const { stats } = useUserStats();
	const { recipients } = useGiftRecipients();

	const handleOpenSecretBox = useCallback(() => {
		// Will be implemented when API is ready
	}, []);

	return (
		<aside
			className="w-full lg:w-80 lg:sticky lg:top-[100px] flex flex-col gap-6"
			role="complementary"
			aria-label={t("aria.statsSidebar")}
		>
			<StatsOverview stats={stats} onOpenSecretBox={handleOpenSecretBox} />
			<GiftRecipientsList recipients={recipients} />
		</aside>
	);
}
