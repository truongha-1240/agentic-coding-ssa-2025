"use client";

import { useCallback, useState } from "react";
import { createClient } from "@/libs/supabase/client";

export function useLikeKudo() {
	const [isToggling, setIsToggling] = useState(false);

	const toggleLike = useCallback(async (kudoId: string): Promise<boolean | null> => {
		if (isToggling) return null;
		setIsToggling(true);
		try {
			const supabase = createClient();
			const {
				data: { user },
			} = await supabase.auth.getUser();

			if (!user) {
				console.warn("User not authenticated, cannot toggle like");
				return null;
			}

			const { data, error } = await supabase.rpc("toggle_kudo_like", {
				p_kudo_id: kudoId,
			});

			if (error) throw error;

			return data as boolean;
		} catch (err) {
			console.error("Failed to toggle like:", err);
			return null;
		} finally {
			setIsToggling(false);
		}
	}, [isToggling]);

	return { toggleLike };
}
