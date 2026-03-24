"use client";

import { useTranslation } from "@/i18n";

interface ErrorProps {
	error: Error & { digest?: string };
	reset: () => void;
}

export default function SunKudosError({ error, reset }: ErrorProps) {
	const { t } = useTranslation();

	return (
		<div className="min-h-screen bg-[var(--color-bg-primary)] flex flex-col items-center justify-center px-6">
			<div className="text-center max-w-md">
				<h2 className="text-2xl font-bold text-white mb-4">
					{t("errors.loadFailed")}
				</h2>
				<p className="text-white/60 mb-6 text-sm">{error.message}</p>
				<button
					type="button"
					onClick={reset}
					className="px-6 py-3 border border-[var(--color-border-gold)] bg-[var(--color-btn-secondary-bg)] text-white font-bold rounded-lg hover:bg-[var(--color-btn-login-hover)] hover:text-[var(--color-btn-login-text)] transition-colors duration-150"
				>
					{t("errors.retry")}
				</button>
			</div>
		</div>
	);
}
