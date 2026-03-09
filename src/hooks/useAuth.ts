"use client";

import { useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";

export function useAuth() {
	const searchParams = useSearchParams();

	const errorDescription = searchParams.get("error_description");
	const redirectTo = searchParams.get("redirectTo") ?? "/";

	const [isLoading, setIsLoading] = useState(false);
	const [localError, setLocalError] = useState<string | null>(
		errorDescription
	);

	const clearError = useCallback(() => {
		setLocalError(null);
	}, []);

	return {
		isLoading,
		error: localError,
		redirectTo,
		setIsLoading,
		clearError,
	};
}
