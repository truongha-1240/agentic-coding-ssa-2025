"use client";

import Image from "next/image";
import { useTranslation } from "@/i18n";
import { KVBannerActions } from "@/components/sun-kudos/KVBannerActions";

interface KVBannerProps {
	onWriteKudo?: () => void;
}

export function KVBanner({ onWriteKudo }: KVBannerProps) {
	const { t } = useTranslation();

	return (
		<div className="w-full max-w-[1152px] flex flex-col items-center gap-10 text-center">
			{/* Title + KUDOS Logo */}
			<div className="flex flex-col items-center gap-4">
				<h2 className="text-xl md:text-2xl font-bold text-white">
					{t("kvBanner.subtitle")}
				</h2>

				{/* KUDOS Logo with star */}
				<div className="flex items-center gap-3">
					<Image
						src="/images/sun-kudos/kudos-logo.svg"
						alt="KUDOS"
						width={600}
						height={140}
						className="h-[60px] md:h-[100px] lg:h-[140px] w-auto"
						priority
					/>
				</div>
			</div>

			{/* Input bar + Search bar row (Client Component boundary) */}
			<KVBannerActions onWriteKudo={onWriteKudo} />
		</div>
	);
}
