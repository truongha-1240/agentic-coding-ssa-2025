"use client";

import { useTranslation } from "@/i18n";
import { getAwardCategories } from "@/utils/awards-data";
import { AwardsLayout } from "@/components/awards-information/AwardsLayout";

export function AwardsContent() {
	const { language } = useTranslation();
	const categories = getAwardCategories(language);

	return <AwardsLayout categories={categories} />;
}
