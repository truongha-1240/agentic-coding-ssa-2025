import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon } from "@/components/icons/ArrowUpRightIcon";
import { KUDOS_CONTENT } from "@/utils/homepage-data";

export function AwardsKudosPromotion() {
	const { label, title, subLabel, description, ctaHref } = KUDOS_CONTENT;

	return (
		<section className="w-full max-w-[1152px]">
			<div className="relative flex flex-col lg:flex-row items-center lg:items-center justify-center h-auto lg:h-[500px] rounded-2xl overflow-hidden">
				{/* Background Image */}
				<Image
					src="/images/awards-information/kudos-bg.png"
					alt=""
					fill
					className="object-cover"
					aria-hidden="true"
				/>

				{/* Content - Left */}
				<div className="relative z-[1] flex flex-col gap-8 w-full lg:w-[470px] p-8 lg:p-16">
					<div className="flex flex-col gap-4">
						<p className="text-2xl font-bold leading-8 text-white">
							{label}
						</p>
						<h2 className="text-[40px] lg:text-[57px] font-bold leading-[48px] lg:leading-[64px] tracking-[-0.25px] text-[var(--color-text-gold)]">
							{title}
						</h2>
						<p className="text-base font-bold leading-6 tracking-[0.5px] text-white uppercase">
							{subLabel}
						</p>
						<p className="text-base font-bold leading-6 tracking-[0.5px] text-white text-justify lg:w-[457px]">
							{description}
						</p>
					</div>

					<div className="flex flex-col gap-6">
						<Link
							href={ctaHref}
							className="inline-flex items-center gap-2 rounded bg-[var(--color-text-gold)] px-4 py-4 text-base font-bold text-[#00101A] w-fit transition-all duration-150 ease-in-out hover:bg-[#00101A] hover:text-[var(--color-text-gold)] hover:border hover:border-[var(--color-text-gold)] hover:shadow-[0_4px_12px_rgba(255,234,158,0.3)] focus:outline-2 focus:outline-[var(--color-text-gold)] focus:outline-offset-2"
						>
							Chi tiết
							<ArrowUpRightIcon className="w-4 h-4" />
						</Link>
					</div>
				</div>

				{/* KUDOS Branding - Right */}
				<div className="relative z-[1] flex-1 hidden lg:flex items-center justify-center">
					<span className="text-[96px] font-normal leading-6 text-[#DBD1C1]" style={{ letterSpacing: "-13%" }}>
						KUDOS
					</span>
				</div>
			</div>
		</section>
	);
}
