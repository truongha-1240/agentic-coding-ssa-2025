import Image from "next/image";
import { HeartButton } from "@/components/sun-kudos/HeartButton";
import { CopyLinkButton } from "@/components/sun-kudos/CopyLinkButton";
import { ImageGallery } from "@/components/sun-kudos/ImageGallery";
import { PlayIcon } from "@/components/icons/PlayIcon";
import { formatTimestamp } from "@/utils/format-kudos";
import type { Kudo } from "@/types/kudos";

interface KudoPostCardProps {
	kudo: Kudo;
	onLike: (id: string) => void;
	onHashtagClick?: (tag: string) => void;
}

export function KudoPostCard({ kudo, onLike, onHashtagClick }: KudoPostCardProps) {
	return (
		<article
			role="article"
			className="bg-[#FFF8E1] rounded-2xl p-6 flex flex-col gap-4"
		>
			{/* Row 1: Sender → Play → Recipient (centered layout) */}
			<div className="flex items-start justify-center gap-16">
				{/* Sender */}
				<div className="flex flex-col items-center gap-1.5">
					<Image
						src={kudo.sender.avatar}
						alt={kudo.sender.name}
						width={64}
						height={64}
						className="w-16 h-16 rounded-full object-cover border-2 border-[#FFEA9E]"
					/>
					<span className="text-base font-bold text-[#1A1A1A] text-center">
						{kudo.sender.name}
					</span>
					<span className="text-sm text-[#8E8E8E]">
						{kudo.isAnonymous ? "Anonymous User" : kudo.sender.department}
					</span>
					{kudo.sender.heroTitle && (
						<span
							className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
							style={{ backgroundColor: kudo.sender.heroTitleColor || "#4CAF50" }}
						>
							{kudo.sender.heroTitle}
						</span>
					)}
				</div>

				{/* Play/Arrow icon */}
				<div className="pt-5 flex-shrink-0">
					<PlayIcon className="w-7 h-7 text-[#1A1A1A]/60" />
				</div>

				{/* Recipient */}
				<div className="flex flex-col items-center gap-1.5">
					<Image
						src={kudo.recipient.avatar}
						alt={kudo.recipient.name}
						width={64}
						height={64}
						className="w-16 h-16 rounded-full object-cover border-2 border-[#FFEA9E]"
					/>
					<span className="text-base font-bold text-[#1A1A1A] text-center">
						{kudo.recipient.name}
					</span>
					<span className="text-sm text-[#8E8E8E]">
						{kudo.recipient.department}
					</span>
					{kudo.recipient.heroTitle && (
						<span
							className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
							style={{ backgroundColor: kudo.recipient.heroTitleColor || "#4CAF50" }}
						>
							{kudo.recipient.heroTitle}
						</span>
					)}
				</div>
			</div>

			{/* Divider after users */}
			<hr className="border-[#FFEA9E]" />

			{/* Row 2: Timestamp */}
			<div className="text-sm text-[#A0A0A0]">
				{formatTimestamp(kudo.createdAt)}
			</div>

			{/* Row 3: Title (centered, bold, uppercase) */}
			<div className="text-center">
				<span className="text-base font-extrabold text-[#1A1A1A] uppercase tracking-wider">
					{kudo.title}
				</span>
			</div>

			{/* Row 4: Content in yellow box with border */}
			<div className="bg-[#FFF3C4] border border-[#FFEA9E] rounded-xl p-4 min-h-[150px] flex items-center">
				<div
					className="text-base text-[#1A1A1A] prose prose-sm max-w-none [&_p]:m-0 [&_strong]:font-bold w-full"
					dangerouslySetInnerHTML={{ __html: kudo.content }}
				/>
			</div>

			{/* Row 5: Image Gallery */}
			{kudo.images.length > 0 && (
				<ImageGallery images={kudo.images} />
			)}

			{/* Row 6: Hashtags - flat gold text, no pills */}
			{kudo.hashtags.length > 0 && (
				<div className="flex flex-wrap gap-3">
					{kudo.hashtags.slice(0, 5).map((tag) => (
						<button
							key={tag}
							type="button"
							onClick={() => onHashtagClick?.(tag)}
							className="text-sm font-semibold text-[#D4A017] hover:text-[#B8860B] transition-colors cursor-pointer"
						>
							{tag.startsWith("#") ? tag : `#${tag}`}
						</button>
					))}
					{kudo.hashtags.length > 5 && (
						<span className="text-sm text-[#D4A017]">...</span>
					)}
				</div>
			)}

			{/* Divider before actions */}
			<hr className="border-[#FFEA9E]" />

			{/* Row 7: Actions */}
			<div className="flex justify-between items-center">
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
