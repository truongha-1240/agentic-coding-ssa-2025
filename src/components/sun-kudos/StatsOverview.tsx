import { GiftBoxIcon } from "@/components/icons/GiftBoxIcon";
import { HeartIcon } from "@/components/icons/HeartIcon";
import { SUN_KUDOS_TEXTS } from "@/utils/sun-kudos-data";
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
			<span className="text-base font-bold text-white">{label}</span>
			<span className="flex items-center text-2xl font-bold text-[var(--color-text-gold)]">
				{formatHeartCount(value)}
				{children}
			</span>
		</div>
	);
}

export function StatsOverview({ stats, onOpenSecretBox }: StatsOverviewProps) {
	const isDisabled = stats.secretBoxesUnopened === 0;

	return (
		<div className="flex flex-col gap-4">
			<StatRow
				label={SUN_KUDOS_TEXTS.sidebar.kudosReceived}
				value={stats.kudosReceived}
			/>
			<StatRow
				label={SUN_KUDOS_TEXTS.sidebar.kudosSent}
				value={stats.kudosSent}
			/>
			<StatRow
				label={SUN_KUDOS_TEXTS.sidebar.heartsReceived}
				value={stats.heartsReceived}
			>
				<span className="inline-flex items-center ml-2">
					<HeartIcon className="w-4 h-4 text-[var(--color-text-gold)]" filled />
					<span className="text-sm font-bold text-[var(--color-text-gold)] ml-0.5">
						{SUN_KUDOS_TEXTS.sidebar.heartMultiplier}
					</span>
				</span>
			</StatRow>

			<div className="h-px bg-[var(--color-border-footer)]" role="separator" />

			<StatRow
				label={SUN_KUDOS_TEXTS.sidebar.secretBoxesOpened}
				value={stats.secretBoxesOpened}
			/>
			<StatRow
				label={SUN_KUDOS_TEXTS.sidebar.secretBoxesUnopened}
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
				{SUN_KUDOS_TEXTS.sidebar.openSecretBox}
			</button>
		</div>
	);
}
