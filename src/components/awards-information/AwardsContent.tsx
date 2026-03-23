"use client";

import { useTranslation } from "@/i18n";
import { useAwardCategories } from "@/hooks/useAwardCategories";
import { AwardsLayout } from "@/components/awards-information/AwardsLayout";

export function AwardsContent() {
	const { language } = useTranslation();
	const { categories } = useAwardCategories(language);

	return <AwardsLayout categories={categories} />;
}
