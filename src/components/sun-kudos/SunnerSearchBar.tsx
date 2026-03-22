"use client";

import { useState } from "react";
import { SearchIcon } from "@/components/icons/SearchIcon";
import { SUN_KUDOS_TEXTS } from "@/utils/sun-kudos-data";

export function SunnerSearchBar() {
	const [query, setQuery] = useState("");

	return (
		<div className="flex items-center gap-2 w-full max-w-[500px] h-[72px] px-4 py-6 rounded-[68px] border border-[var(--color-border-gold)] bg-[var(--color-btn-secondary-bg)] hover:bg-[rgba(255,234,158,0.15)] hover:border-[var(--color-text-gold)] focus-within:border-[var(--color-text-gold)] focus-within:outline focus-within:outline-2 focus-within:outline-[var(--color-text-gold)] focus-within:outline-offset-2 transition-colors duration-150">
			<SearchIcon className="w-6 h-6 text-white shrink-0" />
			<input
				type="text"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				placeholder={SUN_KUDOS_TEXTS.kvBanner.searchPlaceholder}
				className="flex-1 bg-transparent text-white text-base font-normal placeholder:text-white/50 outline-none"
			/>
		</div>
	);
}
