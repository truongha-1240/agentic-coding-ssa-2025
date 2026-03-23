"use client";

import { SearchIcon } from "@/components/icons/SearchIcon";
import { useTranslation } from "@/i18n";

interface SpotlightSearchProps {
	value: string;
	onChange: (v: string) => void;
}

export function SpotlightSearch({ value, onChange }: SpotlightSearchProps) {
	const { t } = useTranslation();

	return (
		<div className="flex items-center gap-2 border border-[var(--color-border-footer)] rounded-lg px-3 py-2 focus-within:border-[var(--color-text-gold)]">
			<SearchIcon className="w-4 h-4 text-white/50 flex-shrink-0" />
			<input
				type="text"
				value={value}
				onChange={(e) => onChange(e.target.value)}
				placeholder={t("spotlight.searchPlaceholder")}
				className="bg-transparent text-white text-base placeholder:text-white/50 outline-none w-full"
			/>
		</div>
	);
}
