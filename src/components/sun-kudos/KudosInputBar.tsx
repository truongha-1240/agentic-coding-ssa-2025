"use client";

import { PenIcon } from "@/components/icons/PenIcon";
import { SUN_KUDOS_TEXTS } from "@/utils/sun-kudos-data";

interface KudosInputBarProps {
	onWriteKudo: () => void;
}

export function KudosInputBar({ onWriteKudo }: KudosInputBarProps) {
	return (
		<button
			type="button"
			onClick={onWriteKudo}
			className="flex items-center gap-2 w-full max-w-[738px] h-[72px] px-4 py-6 rounded-[68px] border border-[var(--color-border-gold)] bg-[var(--color-btn-secondary-bg)] cursor-pointer text-white font-normal text-base hover:bg-[rgba(255,234,158,0.15)] hover:border-[var(--color-text-gold)] focus:outline-2 focus:outline-[var(--color-text-gold)] focus:outline-offset-2 transition-colors duration-150"
		>
			<PenIcon className="w-6 h-6 shrink-0" />
			<span className="opacity-50">
				{SUN_KUDOS_TEXTS.kvBanner.inputPlaceholder}
			</span>
		</button>
	);
}
