"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/libs/supabase/client";
import type { AwardDetailCategory } from "@/types/awards";
import type { Language } from "@/i18n/types";

export function useAwardCategories(language: Language) {
	const [categories, setCategories] = useState<AwardDetailCategory[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		let cancelled = false;
		const supabase = createClient();

		async function fetchAwards() {
			try {
				const { data: cats, error: catError } = await supabase
					.from("award_categories")
					.select("*")
					.order("sort_order", { ascending: true });

				if (catError || !cats) {
					setCategories([]);
					setIsLoading(false);
					return;
				}

				const { data: prizes } = await supabase
					.from("award_prizes")
					.select("*")
					.order("sort_order", { ascending: true });

				if (cancelled) return;

				const mapped: AwardDetailCategory[] = cats.map((cat) => {
					const catPrizes = (prizes || []).filter(
						(p) => p.award_category_id === cat.id,
					);
					return {
						name: cat.name,
						slug: cat.slug,
						description:
							language === "EN"
								? cat.description_en
								: cat.description_vi,
						thumbnailPath: cat.thumbnail_path,
						quantity: cat.quantity,
						unit: language === "EN" ? cat.unit_en : cat.unit_vi,
						prizes: catPrizes.map((p) => ({
							value: p.value,
							note:
								language === "EN"
									? p.note_en || undefined
									: p.note_vi || undefined,
						})),
					};
				});

				setCategories(mapped);
			} catch {
				setCategories([]);
			} finally {
				if (!cancelled) setIsLoading(false);
			}
		}

		fetchAwards();
		return () => {
			cancelled = true;
		};
	}, [language]);

	return { categories, isLoading };
}
