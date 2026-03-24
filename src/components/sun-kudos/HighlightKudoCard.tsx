"use client";

import Image from "next/image";
import type { HighlightKudo } from "@/types/kudos";
import { HeartButton } from "@/components/sun-kudos/HeartButton";
import { CopyLinkButton } from "@/components/sun-kudos/CopyLinkButton";
import { ArrowRightIcon } from "@/components/icons/ArrowRightIcon";
import { ArrowUpRightIcon } from "@/components/icons/ArrowUpRightIcon";
import { useTranslation } from "@/i18n";
import { formatTimestamp } from "@/utils/format-kudos";

interface HighlightKudoCardProps {
	kudo: HighlightKudo;
	onLike: (id: string) => void;
	isFeatured?: boolean;
}

const BADGE_COLORS: Record<string, string> = {
	"New Hero": "bg-[#4CAF50]",
	"Rising Hero": "bg-[#FF9800]",
	"Super Hero": "bg-[#2196F3]",
	"Legend Hero": "bg-[#9C27B0]",
};

function HeroBadge({ title }: { title: string }) {
	const bg = BADGE_COLORS[title] || "bg-gray-500";
	return (
		<span
			className={`${bg} text-white text-[10px] font-bold px-2 py-0.5 rounded-full`}
		>
			{title}
		</span>
	);
}

export function HighlightKudoCard({
	kudo,
	onLike,
	isFeatured = false,
}: HighlightKudoCardProps) {
	const { t } = useTranslation();

	return (
		<article
			className={`rounded-2xl overflow-hidden flex flex-col bg-[#FFF8E1] transition-all duration-200 hover:shadow-[0_4px_12px_rgba(0,0,0,0.3)] ${
				isFeatured
					? "border-2 border-[var(--color-text-gold)]"
					: "border border-[var(--color-border-footer)]"
			}`}
		>
			<div className="p-6 flex flex-col gap-3 flex-1">
				{/* Sender → Receiver (avatars centered, names below) */}
				<div className="flex items-start justify-center gap-6">
					{/* Sender */}
					<div className="flex flex-col items-center gap-1 min-w-0 max-w-[160px]">
						<Image
							src={kudo.sender.avatar}
							alt={kudo.sender.name}
							width={64}
							height={64}
							className="w-16 h-16 rounded-full object-cover"
						/>
						<span className="text-sm font-bold text-[#1a1a1a] text-center truncate w-full">
							{kudo.sender.name}
						</span>
						<div className="flex items-center gap-1 flex-wrap justify-center">
							<span className="text-[10px] text-[#666]">
								{kudo.sender.department}
							</span>
							<span className="text-[10px] text-[#666]">·</span>
							<HeroBadge title={kudo.sender.title} />
						</div>
					</div>

					{/* Arrow icon */}
					<div className="pt-5">
						<ArrowRightIcon className="w-6 h-6 text-[#666]" />
					</div>

					{/* Receiver */}
					<div className="flex flex-col items-center gap-1 min-w-0 max-w-[160px]">
						<Image
							src={kudo.recipient.avatar}
							alt={kudo.recipient.name}
							width={64}
							height={64}
							className="w-16 h-16 rounded-full object-cover"
						/>
						<span className="text-sm font-bold text-[#1a1a1a] text-center truncate w-full">
							{kudo.recipient.name}
						</span>
						<div className="flex items-center gap-1 flex-wrap justify-center">
							<span className="text-[10px] text-[#666]">
								{kudo.recipient.department}
							</span>
							<span className="text-[10px] text-[#666]">·</span>
							<HeroBadge title={kudo.recipient.title} />
						</div>
					</div>
				</div>

				{/* Separator */}
				<hr className="border-t border-[#E0D5C0]" />

				{/* Timestamp */}
				<p className="text-sm text-[#999]">
					{formatTimestamp(kudo.createdAt)}
				</p>

				{/* Category label */}
				<p className="text-sm font-bold text-[#1a1a1a] text-center uppercase tracking-wider">
					{kudo.title}
				</p>

				{/* Content in inner cream box */}
				<div className="bg-[#FFF3D0] rounded-xl p-4">
					<p className="text-sm text-[#1a1a1a] font-bold line-clamp-3 leading-relaxed">
						{kudo.content}
					</p>
				</div>

				{/* Hashtags */}
				{kudo.hashtags.length > 0 && (
					<div className="flex flex-wrap gap-x-2 gap-y-1">
						{kudo.hashtags.slice(0, 5).map((tag, i) => (
							<span
								key={`${tag}-${i}`}
								className="text-sm font-bold text-[#D4271D]"
							>
								{tag}
							</span>
						))}
						{kudo.hashtags.length > 5 && (
							<span className="text-sm text-[#D4271D]">...</span>
						)}
					</div>
				)}

				{/* Separator */}
				<hr className="border-t border-[#E0D5C0] mt-auto" />

				{/* Actions bar */}
				<div className="flex items-center justify-between">
					<HeartButton
						kudoId={kudo.id}
						isLiked={kudo.isLikedByMe}
						heartCount={kudo.heartCount}
						onToggle={onLike}
					/>
					<CopyLinkButton url={`/sun-kudos/kudo/${kudo.id}`} />
					<a
						href={`/sun-kudos/kudo/${kudo.id}`}
						className="flex items-center gap-1 text-sm font-bold text-[#1a1a1a] transition-colors duration-150 hover:text-[#B8860B] focus:outline-2 focus:outline-[var(--color-text-gold)] focus:outline-offset-2"
					>
						{t("highlight.viewDetail")}
						<ArrowUpRightIcon className="w-4 h-4" />
					</a>
				</div>
			</div>
		</article>
	);
}
