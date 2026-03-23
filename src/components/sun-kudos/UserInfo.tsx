import Image from "next/image";
import Link from "next/link";
import { StarIcon } from "@/components/icons/StarIcon";
import type { KudoUser } from "@/types/kudos";

interface UserInfoProps {
	user: KudoUser;
	size?: "small" | "default";
}

export function UserInfo({ user, size = "default" }: UserInfoProps) {
	const avatarSize = size === "small" ? 32 : 48;

	return (
		<div className="flex items-center gap-2 min-w-0">
			<Link
				href={`/profile/${user.id}`}
				className="flex items-center gap-2 min-w-0"
			>
				<Image
					src={user.avatar}
					alt={user.name}
					width={avatarSize}
					height={avatarSize}
					className="rounded-full object-cover flex-shrink-0"
					style={{ width: avatarSize, height: avatarSize }}
				/>
				<div className="flex flex-col min-w-0">
					<span
						className={`font-bold text-white hover:text-[var(--color-text-gold)] transition-colors duration-150 truncate ${size === "small" ? "text-xs" : "text-sm"}`}
					>
						{user.name}
					</span>
					<div className="flex items-center gap-1.5 flex-wrap">
						<span className="text-[10px] text-white/50">{user.department}</span>
						<span className="flex items-center gap-0.5 text-[var(--color-text-gold)]">
							<StarIcon className="w-2.5 h-2.5" />
							<span className="text-[10px] font-bold">
								{user.starCount}
							</span>
						</span>
						{user.title && (
							<span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[var(--color-text-gold)]/20 text-[var(--color-text-gold)] truncate">
								{user.title}
							</span>
						)}
					</div>
				</div>
			</Link>
		</div>
	);
}
