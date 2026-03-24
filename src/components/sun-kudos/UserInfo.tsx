import Image from "next/image";
import Link from "next/link";
import { StarIcon } from "@/components/icons/StarIcon";
import type { KudoUser } from "@/types/kudos";

interface UserInfoProps {
	user: KudoUser;
	size?: "small" | "default";
	variant?: "dark" | "light";
}

export function UserInfo({ user, size = "default", variant = "dark" }: UserInfoProps) {
	const avatarSize = size === "small" ? 32 : 48;
	const isDark = variant === "dark";
	const nameColor = isDark ? "text-white" : "text-[#00101A]";
	const nameHover = isDark ? "hover:text-[var(--color-text-gold)]" : "hover:text-[#998C5F]";
	const subColor = isDark ? "text-white/50" : "text-[#00101A]/50";

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
						className={`font-bold ${nameColor} ${nameHover} transition-colors duration-150 truncate ${size === "small" ? "text-xs" : "text-sm"}`}
					>
						{user.name}
					</span>
					<div className="flex items-center gap-1.5 flex-wrap">
						<span className={`text-[10px] ${subColor}`}>{user.department}</span>
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
