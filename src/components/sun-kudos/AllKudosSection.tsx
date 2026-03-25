"use client";

import { useState } from "react";
import { SectionHeader } from "@/components/sun-kudos/SectionHeader";
import { KudosFeed } from "@/components/sun-kudos/KudosFeed";
import { useKudosFeed } from "@/hooks/useKudosFeed";
import { useLikeKudo } from "@/hooks/useLikeKudo";
import { StatsSidebar } from "@/components/sun-kudos/StatsSidebar";
import { useTranslation } from "@/i18n";

export function AllKudosSection() {
	const { t } = useTranslation();
	const { toggleLike } = useLikeKudo();
	const [selectedHashtag, setSelectedHashtag] = useState<string | null>(null);

	const { kudos, isLoading, hasMore, loadMore } = useKudosFeed({
		hashtag: selectedHashtag,
	});

	function handleHashtagClick(tag: string) {
		setSelectedHashtag((prev) => (prev === tag ? null : tag));
	}

	return (
		<section className="w-full max-w-[1152px] flex flex-col items-center gap-10">
			<SectionHeader title={t("sections.allKudos")} />
			<div className="flex flex-col lg:flex-row gap-8 lg:gap-10 w-full">
				{/* Left column: Kudos Feed */}
				<div className="flex-1">
					<KudosFeed
						kudos={kudos}
						isLoading={isLoading}
						hasMore={hasMore}
						onLoadMore={loadMore}
						onLike={toggleLike}
						onHashtagClick={handleHashtagClick}
					/>
				</div>
				{/* Right column: Stats Sidebar */}
				<StatsSidebar />
			</div>
		</section>
	);
}
