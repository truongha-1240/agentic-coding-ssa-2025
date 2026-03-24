"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { CopyLinkIcon } from "@/components/icons/CopyLinkIcon";
import { useTranslation } from "@/i18n";

interface CopyLinkButtonProps {
	url: string;
}

export function CopyLinkButton({ url }: CopyLinkButtonProps) {
	const { t } = useTranslation();
	const [showToast, setShowToast] = useState(false);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const handleCopy = useCallback(async () => {
		await navigator.clipboard.writeText(url);
		setShowToast(true);
	}, [url]);

	useEffect(() => {
		if (!showToast) return;
		const timer = setTimeout(() => setShowToast(false), 3000);
		return () => clearTimeout(timer);
	}, [showToast]);

	return (
		<>
			<button
				type="button"
				aria-label={t("aria.copyLink")}
				onClick={handleCopy}
				className="flex items-center gap-1 text-white font-bold cursor-pointer hover:opacity-80 focus:outline-2 focus:outline-[var(--color-text-gold)] focus:outline-offset-2 transition-opacity duration-150"
			>
				<CopyLinkIcon className="w-5 h-5" />
				<span className="text-sm">{t("actions.copyLink")}</span>
			</button>
			{showToast &&
				mounted &&
				createPortal(
					<div
						className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-lg border border-[var(--color-border-gold)] text-sm font-bold text-white"
						style={{ background: "rgba(0, 16, 26, 0.95)" }}
						role="status"
						aria-live="polite"
					>
						{t("toast.linkCopied")}
					</div>,
					document.body,
				)}
		</>
	);
}
