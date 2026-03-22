interface HashtagListProps {
	hashtags: string[];
	onHashtagClick?: (tag: string) => void;
}

export function HashtagList({ hashtags, onHashtagClick }: HashtagListProps) {
	if (hashtags.length === 0) return null;

	const visibleTags = hashtags.slice(0, 5);
	const hasMore = hashtags.length > 5;

	return (
		<div className="flex flex-wrap gap-2">
			{visibleTags.map((tag) => (
				<button
					key={tag}
					type="button"
					onClick={() => onHashtagClick?.(tag)}
					className="bg-[var(--color-btn-secondary-bg)] rounded px-2 py-1 text-sm font-bold text-[var(--color-text-gold)] cursor-pointer hover:bg-[rgba(255,234,158,0.2)] transition-colors duration-150"
				>
					#{tag}
				</button>
			))}
			{hasMore && (
				<span className="rounded px-2 py-1 text-sm font-bold text-[var(--color-text-gold)]">
					...
				</span>
			)}
		</div>
	);
}
