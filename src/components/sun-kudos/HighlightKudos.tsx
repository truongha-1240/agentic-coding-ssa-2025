"use client";

import { useState, useCallback, useEffect } from "react";
import { SectionHeader } from "@/components/sun-kudos/SectionHeader";
import { FilterDropdown } from "@/components/sun-kudos/FilterDropdown";
import { HighlightKudoCard } from "@/components/sun-kudos/HighlightKudoCard";
import { CarouselControls } from "@/components/sun-kudos/CarouselControls";
import { ChevronRightIcon } from "@/components/icons/ChevronRightIcon";
import { SUN_KUDOS_TEXTS } from "@/utils/sun-kudos-data";
import { useHighlightKudos } from "@/hooks/useHighlightKudos";
import type { Hashtag, Department } from "@/types/kudos";

const MOCK_HASHTAGS: Hashtag[] = [
	{ id: "h1", name: "#Dedicated" },
	{ id: "h2", name: "#Inspiring" },
	{ id: "h3", name: "#Leadership" },
	{ id: "h4", name: "#TechExcellence" },
	{ id: "h5", name: "#Caring" },
];

const MOCK_DEPARTMENTS: Department[] = [
	{ id: "d1", name: "Engineering" },
	{ id: "d2", name: "Design" },
	{ id: "d3", name: "Product" },
	{ id: "d4", name: "QA" },
	{ id: "d5", name: "HR" },
];

export function HighlightKudos() {
	const { highlights } = useHighlightKudos();
	const [currentSlide, setCurrentSlide] = useState(0);
	const [selectedHashtag, setSelectedHashtag] = useState<string | null>(null);
	const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);

	const totalPages = highlights.length;

	useEffect(() => {
		setCurrentSlide(0);
	}, [selectedHashtag, selectedDepartment]);

	useEffect(() => {
		if (currentSlide >= totalPages && totalPages > 0) {
			setCurrentSlide(totalPages - 1);
		}
	}, [currentSlide, totalPages]);

	const goToPrev = useCallback(() => {
		setCurrentSlide((prev) => Math.max(0, prev - 1));
	}, []);

	const goToNext = useCallback(() => {
		setCurrentSlide((prev) => Math.min(totalPages - 1, prev + 1));
	}, [totalPages]);

	const handleLike = useCallback((id: string) => {
		void id;
	}, []);

	function handleKeyDown(e: React.KeyboardEvent) {
		if (e.key === "ArrowLeft") {
			e.preventDefault();
			goToPrev();
		} else if (e.key === "ArrowRight") {
			e.preventDefault();
			goToNext();
		}
	}

	return (
		<section
			className="w-full max-w-[1152px] flex flex-col items-center gap-8"
			role="region"
			aria-label={SUN_KUDOS_TEXTS.aria.highlightCarousel}
			onKeyDown={handleKeyDown}
			tabIndex={0}
		>
			<SectionHeader title={SUN_KUDOS_TEXTS.sections.highlightKudos} />

			{/* Filter row */}
			<div className="flex items-center gap-4 self-end">
				<FilterDropdown
					label={SUN_KUDOS_TEXTS.highlight.filterHashtag}
					items={MOCK_HASHTAGS}
					selectedId={selectedHashtag}
					onSelect={setSelectedHashtag}
				/>
				<FilterDropdown
					label={SUN_KUDOS_TEXTS.highlight.filterDepartment}
					items={MOCK_DEPARTMENTS}
					selectedId={selectedDepartment}
					onSelect={setSelectedDepartment}
				/>
			</div>

			{/* Carousel */}
			{totalPages > 0 ? (
				<div className="relative w-full">
					{/* Desktop prev button */}
					<button
						type="button"
						aria-label={SUN_KUDOS_TEXTS.aria.carouselPrev}
						onClick={goToPrev}
						disabled={currentSlide === 0}
						className={`hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 w-12 h-12 rounded-full border border-[var(--color-border-gold)] items-center justify-center text-[var(--color-text-gold)] z-20 transition-opacity duration-150 focus:outline-2 focus:outline-[var(--color-text-gold)] focus:outline-offset-2 ${
							currentSlide === 0
								? "opacity-30 cursor-not-allowed"
								: "cursor-pointer hover:bg-white/10"
						}`}
					>
						<ChevronRightIcon className="w-6 h-6 rotate-180" />
					</button>

					{/* Mobile: single card carousel */}
					<div className="lg:hidden overflow-hidden">
						<div
							className="flex transition-transform duration-300 ease-in-out"
							style={{ transform: `translateX(-${currentSlide * 100}%)` }}
						>
							{highlights.map((kudo, index) => (
								<div
									key={kudo.id}
									role="group"
									aria-roledescription={SUN_KUDOS_TEXTS.aria.slide}
									aria-label={`${SUN_KUDOS_TEXTS.aria.slide} ${index + 1} / ${totalPages}`}
									className="w-full flex-shrink-0 px-2"
								>
									<HighlightKudoCard kudo={kudo} onLike={handleLike} />
								</div>
							))}
						</div>
					</div>

					{/* Desktop: 1 featured center card with side cards peeking */}
					<div className="hidden lg:block overflow-hidden">
						<div
							className="flex transition-transform duration-300 ease-in-out"
							style={{
								/* Each card is 50% wide. To center current card, offset by (50% * index) then shift right by 25% */
								transform: `translateX(calc(-${currentSlide * 50}% + 25%))`,
							}}
						>
							{highlights.map((kudo, index) => {
								const isCurrent = index === currentSlide;
								const isAdjacent =
									index === currentSlide - 1 || index === currentSlide + 1;
								return (
									<div
										key={kudo.id}
										role="group"
										aria-roledescription={SUN_KUDOS_TEXTS.aria.slide}
										aria-label={`${SUN_KUDOS_TEXTS.aria.slide} ${index + 1} / ${totalPages}`}
										className="w-1/2 flex-shrink-0 px-4 transition-all duration-300 ease-in-out"
										style={{
											transform: isCurrent
												? "scale(1)"
												: isAdjacent
													? "scale(0.85)"
													: "scale(0.8)",
											opacity: isCurrent ? 1 : isAdjacent ? 0.5 : 0.3,
											zIndex: isCurrent ? 10 : isAdjacent ? 5 : 1,
										}}
									>
										<HighlightKudoCard kudo={kudo} onLike={handleLike} isFeatured={isCurrent} />
									</div>
								);
							})}
						</div>
					</div>

					{/* Desktop next button */}
					<button
						type="button"
						aria-label={SUN_KUDOS_TEXTS.aria.carouselNext}
						onClick={goToNext}
						disabled={currentSlide === totalPages - 1}
						className={`hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-14 w-12 h-12 rounded-full border border-[var(--color-border-gold)] items-center justify-center text-[var(--color-text-gold)] z-20 transition-opacity duration-150 focus:outline-2 focus:outline-[var(--color-text-gold)] focus:outline-offset-2 ${
							currentSlide === totalPages - 1
								? "opacity-30 cursor-not-allowed"
								: "cursor-pointer hover:bg-white/10"
						}`}
					>
						<ChevronRightIcon className="w-6 h-6" />
					</button>
				</div>
			) : (
				<p className="text-white/50 text-center py-10">
					No highlight kudos found.
				</p>
			)}

			{/* Page indicator */}
			{totalPages > 0 && (
				<CarouselControls
					currentPage={currentSlide}
					totalPages={totalPages}
					onPrev={goToPrev}
					onNext={goToNext}
				/>
			)}
		</section>
	);
}
