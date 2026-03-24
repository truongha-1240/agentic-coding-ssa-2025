"use client";

import { GiftBoxIcon } from "@/components/icons/GiftBoxIcon";
import { FireIcon } from "@/components/icons/FireIcon";
import { useTranslation } from "@/i18n";
import { formatHeartCount } from "@/utils/format-kudos";
import type { UserStats } from "@/types/kudos";

interface StatsOverviewProps {
	stats: UserStats;
	onOpenSecretBox: () => void;
}

function StatRow({
	label,
	value,
	children,
}: {
	label: string;
	value: number;
	children?: React.ReactNode;
}) {
	return (
		<div className="flex justify-between items-center">
			<span className="flex items-center gap-1 text-base font-bold text-white">
				{label}
				{children}
			</span>
			<span className="text-2xl font-bold text-[var(--color-text-gold)]">
				{formatHeartCount(value)}
			</span>
		</div>
	);
}

export function StatsOverview({ stats, onOpenSecretBox }: StatsOverviewProps) {
	const { t } = useTranslation();
	const isDisabled = stats.secretBoxesUnopened === 0;

	return (
		<div className="flex flex-col gap-4 border border-[var(--color-border-gold)] rounded-2xl p-6">
			<StatRow
				label={t("sidebar.kudosReceived")}
				value={stats.kudosReceived}
			/>
			<StatRow
				label={t("sidebar.kudosSent")}
				value={stats.kudosSent}
			/>
			<StatRow
				label={t("sidebar.heartsReceived")}
				value={stats.heartsReceived}
			>
				<span className="relative inline-flex items-center justify-center">
					<FireIcon className="w-7 h-7" />
					<span className="absolute text-[8px] font-bold text-white">
						{t("sidebar.heartMultiplier")}
					</span>
				</span>
			</StatRow>

			<div className="h-px bg-[var(--color-border-footer)]" role="separator" />

			<StatRow
				label={t("sidebar.secretBoxesOpened")}
				value={stats.secretBoxesOpened}
			/>
			<StatRow
				label={t("sidebar.secretBoxesUnopened")}
				value={stats.secretBoxesUnopened}
			/>

			<button
				type="button"
				onClick={onOpenSecretBox}
				disabled={isDisabled}
				className={`w-full py-4 px-6 border border-[var(--color-border-gold)] bg-[var(--color-btn-secondary-bg)] rounded font-bold text-white flex items-center justify-center gap-2 transition-colors ${
					isDisabled
						? "opacity-30 cursor-not-allowed pointer-events-none"
						: "hover:bg-[rgba(255,234,158,0.2)] focus:outline-2 focus:outline-[var(--color-text-gold)]"
				}`}
			>
				<GiftBoxIcon className="w-6 h-6" />
				{t("sidebar.openSecretBox")}
			</button>
		</div>
	);
}
