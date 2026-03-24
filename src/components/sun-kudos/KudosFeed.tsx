"use client";

import { useEffect, useRef } from "react";
import { KudoPostCard } from "@/components/sun-kudos/KudoPostCard";
import { useTranslation } from "@/i18n";
import type { Kudo } from "@/types/kudos";

interface KudosFeedProps {
	kudos: Kudo[];
	isLoading: boolean;
	hasMore: boolean;
	onLoadMore: () => void;
	onLike: (id: string) => void;
	onHashtagClick?: (tag: string) => void;
}

export function KudosFeed({
	kudos,
	isLoading,
	hasMore,
	onLoadMore,
	onLike,
	onHashtagClick,
}: KudosFeedProps) {
	const { t } = useTranslation();
	const sentinelRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const sentinel = sentinelRef.current;
		if (!sentinel) return;

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && hasMore && !isLoading) {
					onLoadMore();
				}
			},
			{ threshold: 0.1 },
		);

		observer.observe(sentinel);
		return () => observer.disconnect();
	}, [hasMore, isLoading, onLoadMore]);

	return (
		<div role="feed" aria-label={t("aria.kudosFeed")} className="flex flex-col gap-6">
			{kudos.length === 0 && !isLoading ? (
				<p className="text-center text-white/50 py-12">
					{t("feed.emptyState")}
				</p>
			) : (
				kudos.map((kudo) => (
					<KudoPostCard
						key={kudo.id}
						kudo={kudo}
						onLike={onLike}
						onHashtagClick={onHashtagClick}
					/>
				))
			)}

			{/* Sentinel for infinite scroll */}
			<div ref={sentinelRef} aria-hidden="true" />

			{/* Loading spinner */}
			{isLoading && (
				<div className="flex justify-center py-6">
					<div className="w-8 h-8 border-2 border-[var(--color-text-gold)] border-t-transparent rounded-full animate-spin" />
				</div>
			)}
		</div>
	);
}
