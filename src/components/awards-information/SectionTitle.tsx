"use client";

import { useTranslation } from "@/i18n";

export function SectionTitle() {
	const { t } = useTranslation();

	return (
		<div className="flex flex-col gap-4 w-full">
			<p className="text-2xl font-bold leading-8 text-white text-center w-full">
				{t("sections.sectionSubtitle")}
			</p>
			<div className="w-full h-px bg-[#2E3940]" />
			<div className="flex flex-row gap-8 items-center justify-center w-full">
				<h2 className="text-[32px] md:text-[40px] lg:text-[57px] font-bold leading-[40px] md:leading-[48px] lg:leading-[64px] tracking-[-0.25px] text-[var(--color-text-gold)]">
					{t("awards.pageTitle")}
				</h2>
			</div>
		</div>
	);
}
