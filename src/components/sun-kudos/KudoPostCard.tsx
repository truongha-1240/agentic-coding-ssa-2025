import { ArrowRightIcon } from "@/components/icons/ArrowRightIcon";
import { UserInfo } from "@/components/sun-kudos/UserInfo";
import { HeartButton } from "@/components/sun-kudos/HeartButton";
import { CopyLinkButton } from "@/components/sun-kudos/CopyLinkButton";
import { ImageGallery } from "@/components/sun-kudos/ImageGallery";
import { HashtagList } from "@/components/sun-kudos/HashtagList";
import { formatTimestamp } from "@/utils/format-kudos";
import type { Kudo } from "@/types/kudos";

interface KudoPostCardProps {
	kudo: Kudo;
	onLike: (id: string) => void;
	onHashtagClick?: (tag: string) => void;
}

export function KudoPostCard({ kudo, onLike, onHashtagClick }: KudoPostCardProps) {
	return (
		<article role="article" className="border-b border-[var(--color-border-footer)] py-6">
			{/* Row 1: Sender → Recipient */}
			<div className="flex items-center gap-3">
				<UserInfo user={kudo.sender} />
				<ArrowRightIcon className="w-6 h-6 text-[var(--color-text-gold)] flex-shrink-0" />
				<UserInfo user={kudo.recipient} />
			</div>

			{/* Row 2: Timestamp + Category */}
			<div className="mt-3">
				<span className="text-sm text-white/50">
					{formatTimestamp(kudo.createdAt)}
				</span>
				{" "}
				<span className="text-sm font-bold text-[var(--color-text-gold)]">
					{kudo.category}
				</span>
			</div>

			{/* Row 3: Content */}
			<p className="mt-3 text-base text-white line-clamp-5">
				{kudo.content}
			</p>

			{/* Row 4: Image Gallery */}
			{kudo.images.length > 0 && (
				<div className="mt-3">
					<ImageGallery images={kudo.images} />
				</div>
			)}

			{/* Row 5: Hashtags */}
			{kudo.hashtags.length > 0 && (
				<div className="mt-3">
					<HashtagList hashtags={kudo.hashtags} onHashtagClick={onHashtagClick} />
				</div>
			)}

			{/* Row 6: Actions */}
			<div className="mt-4 flex justify-between items-center">
				<HeartButton
					kudoId={kudo.id}
					isLiked={kudo.isLikedByMe}
					heartCount={kudo.heartCount}
					onToggle={onLike}
				/>
				<CopyLinkButton url={`/sun-kudos/${kudo.id}`} />
			</div>
		</article>
	);
}
