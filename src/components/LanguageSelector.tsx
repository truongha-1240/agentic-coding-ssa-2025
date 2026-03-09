"use client";

import { useState } from "react";
import { VnFlagIcon } from "@/components/icons/VnFlagIcon";
import { ChevronDownIcon } from "@/components/icons/ChevronDownIcon";

export function LanguageSelector() {
	const [isOpen, setIsOpen] = useState(false);

	function handleToggle() {
		setIsOpen((prev) => !prev);
	}

	function handleKeyDown(e: React.KeyboardEvent) {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			handleToggle();
		} else if (e.key === "Escape") {
			setIsOpen(false);
		}
	}

	return (
		<button
			type="button"
			aria-label="Select language"
			aria-expanded={isOpen}
			onClick={handleToggle}
			onKeyDown={handleKeyDown}
			className="flex items-center gap-0.5 p-4 rounded cursor-pointer transition-colors duration-150 ease-in-out hover:bg-white/10 focus:outline-2 focus:outline-white/50 focus:outline-offset-2"
		>
			<VnFlagIcon className="w-6 h-6" />
			<span className="text-base font-bold leading-6 tracking-[0.15px] text-white font-[family-name:var(--font-montserrat)]">
				VN
			</span>
			<ChevronDownIcon className="w-6 h-6" />
		</button>
	);
}
