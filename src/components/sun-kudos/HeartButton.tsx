"use client";

import { useState } from "react";
import { HeartIcon } from "@/components/icons/HeartIcon";
import { useTranslation } from "@/i18n";
import { formatHeartCount } from "@/utils/format-kudos";

interface HeartButtonProps {
	kudoId: string;
	isLiked: boolean;
	heartCount: number;
	onToggle: (kudoId: string) => void;
}

export function HeartButton({
	kudoId,
	isLiked,
	heartCount,
	onToggle,
}: HeartButtonProps) {
	const { t } = useTranslation();
	const [optimisticLiked, setOptimisticLiked] = useState(isLiked);
	const [optimisticCount, setOptimisticCount] = useState(heartCount);

	function handleClick() {
		setOptimisticLiked((prev) => !prev);
		setOptimisticCount((prev) => (optimisticLiked ? prev - 1 : prev + 1));
		onToggle(kudoId);
	}

	return (
		<button
			type="button"
			role="button"
			aria-pressed={optimisticLiked}
			aria-label={
				optimisticLiked
					? t("aria.heartButtonActive")
					: t("aria.heartButton")
			}
			onClick={handleClick}
			className="flex items-center gap-1 group focus:outline-2 focus:outline-[var(--color-text-gold)] focus:outline-offset-2"
		>
			<span
				className={`transition-transform duration-200 ease-out ${
					optimisticLiked
						? "text-[var(--color-notification-dot)] scale-110"
						: "text-[var(--color-heart-gray)]"
				} group-active:scale-110`}
			>
				<HeartIcon className="w-6 h-6" filled={optimisticLiked} />
			</span>
			<span className="text-base font-bold text-white">{formatHeartCount(optimisticCount)}</span>
		</button>
	);
}
