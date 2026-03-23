import { useCallback } from "react";

export function useLikeKudo() {
	const toggleLike = useCallback((kudoId: string) => {
		console.log(`Toggle like for kudo: ${kudoId}`);
	}, []);

	return { toggleLike };
}
