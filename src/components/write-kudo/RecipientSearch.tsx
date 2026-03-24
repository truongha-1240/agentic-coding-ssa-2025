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

	useEffect(() => {
		function handleClickOutside(e: MouseEvent) {
			if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
				setIsOpen(false);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<div className="flex items-center gap-4">
			<FieldLabel label={t("writeKudo.recipient")} required />
			<div className="relative flex-1" ref={containerRef}>
				<input
					type="text"
					value={value ? selectedName : query}
					onChange={(e) => {
						if (value) onChange("", "");
						setQuery(e.target.value);
						onSearch(e.target.value);
						setIsOpen(true);
					}}
					onFocus={() => query.length > 0 && setIsOpen(true)}
					placeholder={t("writeKudo.searchPlaceholder")}
					className="w-full bg-white border border-[#998C5F] px-6 py-4 text-[16px] font-bold font-montserrat text-[#00101A] placeholder:text-[#999] outline-none focus:border-[#FFEA9E] focus:border-2"
				/>
				<svg className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-[#999]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>

				{isOpen && (query.length > 0 || isSearching) && (
					<div className="absolute top-full left-0 right-0 bg-white border border-[#998C5F] shadow-lg z-50 max-h-60 overflow-y-auto">
						{isSearching && (
							<div className="px-4 py-3 text-[#999] text-sm">...</div>
						)}
						{!isSearching && searchResults.length === 0 && query.length > 0 && (
							<div className="px-4 py-3 text-[#999] text-sm">{t("writeKudo.noResults")}</div>
						)}
						{searchResults.map((r) => (
							<button
								key={r.id}
								type="button"
								onClick={() => {
									onChange(r.id, r.name);
									setQuery("");
									setIsOpen(false);
								}}
								className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[rgba(255,234,158,0.1)] text-left"
							>
								<Image src={r.avatar_url || "/images/default-avatar.png"} alt="" width={32} height={32} className="rounded-full object-cover" />
								<div>
									<div className="text-sm font-bold text-[#00101A]">{r.name}</div>
									<div className="text-xs text-[#999]">{r.department}</div>
								</div>
							</button>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
