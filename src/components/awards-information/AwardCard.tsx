"use client";

import Image from "next/image";
import { TargetIcon } from "@/components/icons/TargetIcon";
import { DiamondIcon } from "@/components/icons/DiamondIcon";
import { LicenseIcon } from "@/components/icons/LicenseIcon";
import { useTranslation } from "@/i18n";
import type { AwardDetailCategory } from "@/types/awards";

interface AwardCardProps {
	category: AwardDetailCategory;
	variant: "image-left" | "image-right";
	isLast?: boolean;
}

export function AwardCard({ category, variant, isLast = false }: AwardCardProps) {
	const { t } = useTranslation();
	const { name, slug, description, thumbnailPath, quantity, unit, prizes } =
		category;

	return (
		<section id={slug} className="flex flex-col gap-20">
			<div
				className={`flex flex-col lg:flex-row gap-10 items-start ${
					variant === "image-right" ? "lg:flex-row-reverse" : ""
				}`}
			>
				{/* Award Thumbnail */}
				<div className="w-full lg:w-[336px] lg:h-[336px] flex-shrink-0">
					<Image
						src={thumbnailPath}
						alt=""
						width={336}
						height={336}
						sizes="(max-width: 768px) 100vw, 336px"
						className="w-full lg:w-[336px] lg:h-[336px] mix-blend-screen"
					/>
				</div>

				{/* Content Area */}
				<div className="flex flex-col gap-8 rounded-2xl backdrop-blur-[32px] w-full lg:flex-1">
					{/* Title + Description */}
					<div className="flex flex-col gap-6">
						<div className="flex flex-row gap-4 items-center">
							<TargetIcon className="w-6 h-6 text-[var(--color-text-gold)]" />
							<h3 className="text-2xl font-bold leading-8 text-[var(--color-text-gold)]">
								{name}
							</h3>
						</div>
						<p className="text-base font-normal leading-6 tracking-[0.5px] text-white text-justify">
							{description}
						</p>
					</div>

					{/* Separator */}
					<div className="w-full h-px bg-[#2E3940]" />

					{/* Quantity Section */}
					<div className="flex flex-row gap-4 items-center flex-wrap">
						<DiamondIcon className="w-6 h-6 text-[var(--color-text-gold)]" />
						<span className="text-2xl font-bold leading-8 text-[var(--color-text-gold)]">
							{t("awards.quantityLabel")}
						</span>
						<span className="text-[45px] font-bold leading-[52px] text-white">
							{quantity}
						</span>
						<span className="text-sm font-normal leading-5 tracking-[0.1px] text-white">
							{unit}
						</span>
					</div>

					{/* Separator */}
					<div className="w-full h-px bg-[#2E3940]" />

					{/* Prize Section(s) */}
					{prizes.map((prize, index) => (
						<div key={index}>
							{index > 0 && (
								<div className="flex items-center gap-4 mb-8">
									<div className="flex-1 h-px bg-[#2E3940]" />
									<span className="text-sm font-bold leading-5 text-[#2E3940]">
										{t("awards.orSeparator")}
									</span>
									<div className="flex-1 h-px bg-[#2E3940]" />
								</div>
							)}
							<div className="flex flex-col gap-6 w-full rounded-2xl">
								<div className="flex flex-row gap-4 items-center">
									<LicenseIcon className="w-6 h-6 text-[var(--color-text-gold)]" />
									<span className="text-2xl font-bold leading-8 text-[var(--color-text-gold)]">
										{t("awards.prizeLabel")}
									</span>
								</div>
								<div className="flex flex-row items-baseline gap-4">
									<span className="text-[45px] font-bold leading-[52px] text-white">
										{prize.value}
									</span>
									{prize.note && (
										<span className="text-sm font-normal leading-5 tracking-[0.1px] text-white">
											{prize.note}
										</span>
									)}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Bottom separator (full-width, omit on last card) */}
			{!isLast && <div className="w-full h-px bg-[#2E3940]" />}
		</section>
	);
}
