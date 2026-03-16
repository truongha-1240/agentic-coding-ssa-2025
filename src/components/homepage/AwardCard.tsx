import Link from "next/link";
import Image from "next/image";
import { ArrowUpRightIcon } from "@/components/icons/ArrowUpRightIcon";

interface AwardCardProps {
	name: string;
	slug: string;
	description: string;
	thumbnailPath: string;
}

export function AwardCard({
	name,
	slug,
	description,
	thumbnailPath,
}: AwardCardProps) {
	return (
		<Link
			href={`/awards-information#${slug}`}
			className="group flex flex-col gap-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(255,234,158,0.15)] focus:outline-2 focus:outline-[var(--color-text-gold)] focus:outline-offset-2"
		>
			<div className="relative w-full aspect-square flex items-center justify-center">
				<Image
					src="/images/homepage/award-bg.png"
					alt=""
					fill
					className="object-cover"
					aria-hidden="true"
				/>
				<Image
					src={thumbnailPath}
					alt={name}
					width={232}
					height={64}
					className="relative z-[1] w-auto h-auto max-w-[70%]"
				/>
			</div>

			<h3 className="text-2xl font-normal text-[var(--color-text-gold)]">
				{name}
			</h3>

			<p className="text-base font-normal leading-6 tracking-[0.5px] text-white line-clamp-2">
				{description}
			</p>

			<span className="inline-flex items-center gap-1 py-4 text-base font-bold leading-6 tracking-[0.5px] text-white">
				Chi tiết
				<ArrowUpRightIcon className="w-4 h-4" />
			</span>
		</Link>
	);
}
