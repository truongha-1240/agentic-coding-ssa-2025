"use client";

import Image from "next/image";
import { useTranslation } from "@/i18n";
import type { GiftRecipient } from "@/types/kudos";

interface GiftRecipientsListProps {
	recipients: GiftRecipient[];
}

export function GiftRecipientsList({
	recipients,
}: GiftRecipientsListProps) {
	const { t } = useTranslation();

	return (
		<div className="flex flex-col gap-4 border border-[var(--color-border-gold)] rounded-2xl p-6">
			<h3 className="text-lg font-extrabold text-[var(--color-text-gold)] text-center uppercase tracking-wider">
				{t("sidebar.giftRecipientsTitle")}
			</h3>

			<div className="flex flex-col gap-3 max-h-80 overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-full">
				{recipients.map((recipient) => (
					<div key={recipient.id} className="flex items-center gap-3">
						{recipient.isNew && (
							<span className="w-2 h-2 rounded-full bg-[var(--color-notification-dot)] flex-shrink-0" />
						)}
						<Image
							src={recipient.user.avatar}
							alt={recipient.user.name}
							width={48}
							height={48}
							className="w-12 h-12 rounded-full object-cover flex-shrink-0 border-2 border-[var(--color-border-gold)]"
						/>
						<div className="flex flex-col min-w-0">
							<span className="text-base font-bold text-[var(--color-text-gold)] truncate">
								{recipient.user.name}
							</span>
							<span className="text-sm text-white truncate">
								{recipient.description}
							</span>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
