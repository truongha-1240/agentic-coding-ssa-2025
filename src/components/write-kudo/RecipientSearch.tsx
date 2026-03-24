"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useTranslation } from "@/i18n";
import { FieldLabel } from "@/components/write-kudo/FieldLabel";

interface RecipientResult {
	id: string;
	name: string;
	email: string;
	avatar_url: string;
	department: string;
}

interface RecipientSearchProps {
	value: string | null;
	selectedName: string;
	onChange: (id: string, name: string) => void;
	searchResults: RecipientResult[];
	onSearch: (q: string) => void;
	isSearching: boolean;
}

export function RecipientSearch({
	value,
	selectedName,
	onChange,
	searchResults,
	onSearch,
	isSearching,
}: RecipientSearchProps) {
	const { t } = useTranslation();
	const [query, setQuery] = useState("");
	const [isOpen, setIsOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		function handleClickOutside(e: MouseEvent) {
			if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
				setIsOpen(false);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		const val = e.target.value;
		if (value) onChange("", "");
		setQuery(val);
		onSearch(val);
		setIsOpen(true);
	}

	function handleFocus() {
		// Show dropdown on focus — if already has query, show results; otherwise trigger search with empty to show all
		setIsOpen(true);
		if (!query && !value) {
			onSearch("");
		}
	}

	function handleChevronClick() {
		if (isOpen) {
			setIsOpen(false);
		} else {
			setIsOpen(true);
			onSearch(query || "");
			inputRef.current?.focus();
		}
	}

	function handleSelect(r: RecipientResult) {
		onChange(r.id, r.name);
		setQuery("");
		setIsOpen(false);
	}

	const showDropdown = isOpen && (isSearching || searchResults.length > 0 || query.length > 0);

	return (
		<div className="flex items-center gap-4">
			<FieldLabel label={t("writeKudo.recipient")} required />
			<div className="relative flex-1" ref={containerRef}>
				<input
					ref={inputRef}
					type="text"
					value={value ? selectedName : query}
					onChange={handleInputChange}
					onFocus={handleFocus}
					placeholder={t("writeKudo.searchPlaceholder")}
					className="w-full bg-white border border-[#998C5F] px-6 py-4 pr-12 text-[16px] font-bold font-montserrat text-[#00101A] placeholder:text-[#999] outline-none focus:border-[#FFEA9E] focus:border-2 rounded-none"
				/>
				<button
					type="button"
					onClick={handleChevronClick}
					className="absolute right-3 top-1/2 -translate-y-1/2 p-1 cursor-pointer"
					aria-label="Toggle dropdown"
				>
					<svg
						className={`w-5 h-5 text-[#999] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
					>
						<path d="M6 9l6 6 6-6" />
					</svg>
				</button>

				{showDropdown && (
					<div className="absolute top-full left-0 right-0 bg-white border border-[#998C5F] border-t-0 shadow-lg z-50 max-h-60 overflow-y-auto">
						{isSearching && (
							<div className="px-4 py-3 text-[#999] text-sm animate-pulse">
								{t("writeKudo.searching") || "Searching..."}
							</div>
						)}
						{!isSearching && searchResults.length === 0 && query.length > 0 && (
							<div className="px-4 py-3 text-[#999] text-sm">
								{t("writeKudo.noResults")}
							</div>
						)}
						{searchResults.map((r) => (
							<button
								key={r.id}
								type="button"
								onClick={() => handleSelect(r)}
								className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[rgba(255,234,158,0.15)] text-left transition-colors"
							>
								<Image
									src={r.avatar_url || "/images/default-avatar.png"}
									alt=""
									width={36}
									height={36}
									className="w-9 h-9 rounded-full object-cover"
								/>
								<div>
									<div className="text-sm font-bold text-[#00101A]">{r.name}</div>
									<div className="text-xs text-[#999]">{r.department} · {r.email}</div>
								</div>
							</button>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
