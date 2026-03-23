"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { VnFlagIcon } from "@/components/icons/VnFlagIcon";
import { EnFlagIcon } from "@/components/icons/EnFlagIcon";
import { ChevronDownIcon } from "@/components/icons/ChevronDownIcon";
import { useTranslation } from "@/i18n";
import type { Language } from "@/i18n/types";

const LANGUAGES: { code: Language; flag: typeof VnFlagIcon; label: string }[] = [
	{ code: "VN", flag: VnFlagIcon, label: "VN" },
	{ code: "EN", flag: EnFlagIcon, label: "EN" },
];

export function LanguageSelector() {
	const { language, setLanguage, t } = useTranslation();
	const [isOpen, setIsOpen] = useState(false);
	const [focusedIndex, setFocusedIndex] = useState(0);

	const containerRef = useRef<HTMLDivElement>(null);
	const triggerRef = useRef<HTMLButtonElement>(null);
	const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);

	// Click-outside detection
	const closeDropdown = useCallback(() => {
		setIsOpen(false);
	}, []);

	useEffect(() => {
		if (!isOpen) return;

		function handleMouseDown(e: MouseEvent) {
			if (
				containerRef.current &&
				!containerRef.current.contains(e.target as Node)
			) {
				closeDropdown();
			}
		}

		document.addEventListener("mousedown", handleMouseDown);
		return () => document.removeEventListener("mousedown", handleMouseDown);
	}, [isOpen, closeDropdown]);

	// Focus selected option when dropdown opens
	useEffect(() => {
		if (isOpen) {
			const selectedIdx = LANGUAGES.findIndex((l) => l.code === language);
			setFocusedIndex(selectedIdx >= 0 ? selectedIdx : 0);
		}
	}, [isOpen, language]);

	function handleSelect(lang: Language) {
		setLanguage(lang);
		setIsOpen(false);
		triggerRef.current?.focus();
	}

	function handleTriggerKeyDown(e: React.KeyboardEvent) {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			setIsOpen((prev) => !prev);
		} else if (e.key === "Escape") {
			closeDropdown();
		} else if (e.key === "ArrowDown" && !isOpen) {
			e.preventDefault();
			setIsOpen(true);
		}
	}

	function handleDropdownKeyDown(e: React.KeyboardEvent) {
		if (e.key === "Escape") {
			closeDropdown();
			triggerRef.current?.focus();
			return;
		}

		if (e.key === "ArrowDown") {
			e.preventDefault();
			const next = Math.min(focusedIndex + 1, LANGUAGES.length - 1);
			setFocusedIndex(next);
			optionRefs.current[next]?.focus();
		} else if (e.key === "ArrowUp") {
			e.preventDefault();
			const prev = Math.max(focusedIndex - 1, 0);
			setFocusedIndex(prev);
			optionRefs.current[prev]?.focus();
		} else if (e.key === "Enter") {
			e.preventDefault();
			handleSelect(LANGUAGES[focusedIndex].code);
		}
	}

	const CurrentFlag =
		LANGUAGES.find((l) => l.code === language)?.flag ?? VnFlagIcon;
	const currentOptionId = `lang-option-${LANGUAGES[focusedIndex]?.code}`;

	return (
		<div ref={containerRef} className="relative">
			<button
				ref={triggerRef}
				type="button"
				aria-label={t("aria.selectLanguage")}
				aria-expanded={isOpen}
				aria-haspopup="listbox"
				aria-controls={isOpen ? "language-listbox" : undefined}
				onClick={() => setIsOpen((prev) => !prev)}
				onKeyDown={handleTriggerKeyDown}
				className="flex items-center gap-0.5 p-4 rounded cursor-pointer transition-colors duration-150 ease-in-out hover:bg-white/10 focus:outline-2 focus:outline-white/50 focus:outline-offset-2"
			>
				<CurrentFlag className="w-6 h-6" />
				<span className="text-base font-bold leading-6 tracking-[0.15px] text-white font-[family-name:var(--font-montserrat)]">
					{language}
				</span>
				<ChevronDownIcon
					className={`w-6 h-6 transition-transform duration-150 ${isOpen ? "rotate-180" : ""}`}
				/>
			</button>

			{isOpen && (
				<div
					id="language-listbox"
					role="listbox"
					aria-activedescendant={currentOptionId}
					aria-label={t("aria.selectLanguage")}
					onKeyDown={handleDropdownKeyDown}
					className="absolute right-0 top-full mt-1 flex flex-col p-1.5 bg-[var(--color-dropdown-bg)] border border-[var(--color-dropdown-border)] rounded-lg z-20"
					style={{ animation: "fadeIn 150ms ease-out" }}
				>
					{LANGUAGES.map((lang, index) => {
						const FlagIcon = lang.flag;
						const isSelected = lang.code === language;
						const isFocused = index === focusedIndex;

						return (
							<button
								key={lang.code}
								ref={(el) => {
									optionRefs.current[index] = el;
								}}
								id={`lang-option-${lang.code}`}
								type="button"
								role="option"
								aria-selected={isSelected}
								onClick={() => handleSelect(lang.code)}
								className={`flex items-center gap-1 w-[110px] h-[56px] p-4 rounded cursor-pointer transition-colors duration-150 ${
									isSelected
										? "bg-[rgba(255,234,158,0.2)]"
										: "bg-transparent hover:bg-[var(--color-dropdown-item-hover)]"
								} ${isFocused ? "outline-2 outline-[var(--color-text-gold)] outline-offset-2" : ""} focus:outline-2 focus:outline-[var(--color-text-gold)] focus:outline-offset-2`}
							>
								<FlagIcon className="w-6 h-6" />
								<span className="text-base font-bold leading-6 tracking-[0.15px] text-white font-[family-name:var(--font-montserrat)]">
									{lang.label}
								</span>
							</button>
						);
					})}
				</div>
			)}
		</div>
	);
}
