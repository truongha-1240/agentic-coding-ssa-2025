"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/libs/supabase/client";
import type { Hashtag, Department } from "@/types/kudos";

interface UseFilterOptionsReturn {
	hashtags: Hashtag[];
	departments: Department[];
	isLoading: boolean;
}

export function useFilterOptions(): UseFilterOptionsReturn {
	const [hashtags, setHashtags] = useState<Hashtag[]>([]);
	const [departments, setDepartments] = useState<Department[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function fetch() {
			const supabase = createClient();
			const [hashtagsRes, departmentsRes] = await Promise.all([
				supabase.from("hashtags").select("id, name").order("name"),
				supabase.from("departments").select("id, name").order("name"),
			]);

			setHashtags(
				(hashtagsRes.data || []).map((h) => ({
					id: h.id,
					name: h.name,
				})),
			);
			setDepartments(
				(departmentsRes.data || []).map((d) => ({
					id: d.id,
					name: d.name,
				})),
			);
			setIsLoading(false);
		}

		fetch();
	}, []);

	return { hashtags, departments, isLoading };
}
