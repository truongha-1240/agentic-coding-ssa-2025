"use client";

import { useTranslation } from "@/i18n";

interface SectionHeaderProps {
	title: string;
}

export function SectionHeader({ title }: SectionHeaderProps) {
	const { t } = useTranslation();

	return (
		<div className="flex flex-col items-start gap-3 w-full">
			<p className="text-xl font-bold text-[var(--color-text-gold)]">
				{t("sections.sectionSubtitle")}
			</p>
			<hr
				role="separator"
				className="w-full border-t border-[var(--color-border-footer)]"
			/>
			<h2
				className="text-4xl lg:text-[57px] font-bold text-[var(--color-text-gold)] leading-tight"
				style={{ textShadow: "var(--shadow-text-glow)" }}
			>
				{title}
			</h2>
		</div>
	);
}
