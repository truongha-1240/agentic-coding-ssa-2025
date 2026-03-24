"use client";

import Image from "next/image";
import { useTranslation } from "@/i18n";
import type { GiftRecipient } from "@/types/kudos";

interface GiftRecipientsListProps {
	recipients: GiftRecipient[];
	hasMore: boolean;
	onLoadMore: () => void;
}

export function GiftRecipientsList({
	recipients,
	hasMore,
	onLoadMore,
}: GiftRecipientsListProps) {
	const { t } = useTranslation();

	return (
		<div className="flex flex-col gap-4">
			<h3 className="text-base font-bold text-[var(--color-text-gold)]">
				{t("sidebar.giftRecipientsTitle")}
			</h3>

			<div className="flex flex-col gap-3">
				{recipients.map((recipient) => (
					<div key={recipient.id} className="flex items-center gap-3">
						{recipient.isNew && (
							<span className="w-2 h-2 rounded-full bg-[var(--color-notification-dot)] flex-shrink-0" />
						)}
						<Image
							src={recipient.user.avatar}
							alt={recipient.user.name}
							width={40}
							height={40}
							className="w-10 h-10 rounded-full object-cover flex-shrink-0"
						/>
						<div className="flex flex-col min-w-0">
							<span className="text-sm font-bold text-white truncate">
								{recipient.user.name}
							</span>
							<span className="text-sm text-white/50 truncate">
								{recipient.description}
							</span>
						</div>
					</div>
				))}
			</div>

			{hasMore && (
				<button
					type="button"
					onClick={onLoadMore}
					className="w-full py-3 px-4 bg-transparent border border-[var(--color-border-footer)] rounded text-sm font-bold text-[var(--color-text-gold)] text-center transition-colors hover:bg-[rgba(255,234,158,0.1)]"
				>
					{t("sidebar.viewMore")}
				</button>
			)}
		</div>
	);
}
