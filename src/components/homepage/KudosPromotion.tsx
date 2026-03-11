import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon } from "@/components/icons/ArrowUpRightIcon";
import { KUDOS_CONTENT } from "@/utils/homepage-data";

export function KudosPromotion() {
	const { label, title, subLabel, description, ctaHref } = KUDOS_CONTENT;

	return (
		<section className="w-full max-w-[1224px] mx-auto px-6 lg:px-0">
			<div className="relative flex flex-col lg:flex-row items-start gap-8 rounded-lg overflow-hidden p-8 lg:py-[120px] lg:px-[104px]">
				{/* Background Image */}
				<Image
					src="/images/homepage/kudos-bg.png"
					alt=""
					fill
					className="object-cover"
					aria-hidden="true"
				/>

				{/* Content - Left */}
				<div className="relative z-[1] flex flex-col gap-8 flex-1">
					<p className="text-2xl font-bold leading-8 text-white">
						{label}
					</p>
					<h2 className="text-[40px] lg:text-[57px] font-bold leading-[48px] lg:leading-[64px] tracking-[-0.25px] text-[var(--color-text-gold)]">
						{title}
					</h2>
					<p className="text-base font-bold leading-6 tracking-[0.5px] text-white uppercase">
						{subLabel}
					</p>
					<p className="text-base font-bold leading-6 tracking-[0.5px] text-white">
						{description}
					</p>
					<Link
						href={ctaHref}
						className="inline-flex items-center gap-2 rounded-sm bg-[var(--color-text-gold)] px-4 py-4 text-base font-bold text-[#00101A] w-fit transition-shadow duration-150 hover:shadow-[0_4px_12px_rgba(255,234,158,0.3)] focus:outline-2 focus:outline-[var(--color-text-gold)] focus:outline-offset-2"
					>
						Chi tiết
						<ArrowUpRightIcon className="w-4 h-4" />
					</Link>
				</div>

				{/* KUDOS Branding - Right */}
				<div className="relative z-[1] flex-1 hidden lg:flex items-center justify-center">
					<Image
						src="/images/homepage/kudos-logo.svg"
						alt="KUDOS"
						width={400}
						height={200}
						className="w-full h-auto"
					/>
				</div>
			</div>
		</section>
	);
}
