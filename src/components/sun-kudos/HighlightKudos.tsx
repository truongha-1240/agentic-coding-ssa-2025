"use client";

import { useState, useCallback, useEffect } from "react";
import { SectionHeader } from "@/components/sun-kudos/SectionHeader";
import { FilterDropdown } from "@/components/sun-kudos/FilterDropdown";
import { HighlightKudoCard } from "@/components/sun-kudos/HighlightKudoCard";
import { CarouselControls } from "@/components/sun-kudos/CarouselControls";
import { ChevronRightIcon } from "@/components/icons/ChevronRightIcon";
import { useTranslation } from "@/i18n";
import { useHighlightKudos } from "@/hooks/useHighlightKudos";
import { useFilterOptions } from "@/hooks/useFilterOptions";

export function HighlightKudos() {
	const { t } = useTranslation();
	const { hashtags, departments } = useFilterOptions();
	const [selectedHashtag, setSelectedHashtag] = useState<string | null>(null);
	const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
		null,
	);
	const { highlights } = useHighlightKudos({
		hashtag: selectedHashtag ? hashtags.find(h => h.id === selectedHashtag)?.name || null : null,
		departmentId: selectedDepartment,
	});
	const [currentSlide, setCurrentSlide] = useState(0);

	const totalPages = highlights.length;

	useEffect(() => {
		setCurrentSlide(0);
	}, [selectedHashtag, selectedDepartment]);

	useEffect(() => {
		if (currentSlide >= totalPages && totalPages > 0) {
			setCurrentSlide(totalPages - 1);
		}
	}, [currentSlide, totalPages]);

	// Circular navigation: 1/5 prev → 5/5, 5/5 next → 1/5
	const goToPrev = useCallback(() => {
		setCurrentSlide((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
	}, [totalPages]);

	const goToNext = useCallback(() => {
		setCurrentSlide((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
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

	// Get indices for 3-card display: prev, current, next (circular)
	function getVisibleIndices() {
		if (totalPages <= 1) return { prev: -1, current: 0, next: -1 };
		const prev = currentSlide === 0 ? totalPages - 1 : currentSlide - 1;
		const next = currentSlide === totalPages - 1 ? 0 : currentSlide + 1;
		return { prev, current: currentSlide, next };
	}

	const { prev: prevIdx, current: currentIdx, next: nextIdx } = getVisibleIndices();

	return (
		<section
			className="w-full max-w-[1152px] flex flex-col items-center gap-8"
			role="region"
			aria-label={t("aria.highlightCarousel")}
			onKeyDown={handleKeyDown}
			tabIndex={0}
		>
			<SectionHeader title={t("sections.highlightKudos")} />

			{/* Filter row */}
			<div className="flex items-center gap-4 self-end">
				<FilterDropdown
					label={t("highlight.filterHashtag")}
					items={hashtags}
					selectedId={selectedHashtag}
					onSelect={setSelectedHashtag}
				/>
				<FilterDropdown
					label={t("highlight.filterDepartment")}
					items={departments}
					selectedId={selectedDepartment}
					onSelect={setSelectedDepartment}
				/>
			</div>

			{/* Carousel */}
			{totalPages > 0 ? (
				<div className="relative w-full">
					{/* Desktop prev button - outside carousel */}
					<button
						type="button"
						aria-label={t("aria.carouselPrev")}
						onClick={goToPrev}
						className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 w-12 h-12 rounded-lg border-2 border-[var(--color-border-gold)] items-center justify-center text-[var(--color-text-gold)] z-20 cursor-pointer hover:bg-[rgba(255,234,158,0.1)] transition-all duration-150 focus:outline-2 focus:outline-[var(--color-text-gold)] focus:outline-offset-2"
					>
						<ChevronRightIcon className="w-6 h-6 rotate-180" />
					</button>

					{/* Mobile: single card carousel */}
					<div className="lg:hidden overflow-hidden">
						<div
							className="flex transition-transform duration-500 ease-in-out"
							style={{ transform: `translateX(-${currentSlide * 100}%)` }}
						>
							{highlights.map((kudo, index) => (
								<div
									key={kudo.id}
									role="group"
									aria-roledescription={t("aria.slide")}
									aria-label={`${t("aria.slide")} ${index + 1} / ${totalPages}`}
									className="w-full flex-shrink-0 px-2"
								>
									<HighlightKudoCard
										kudo={kudo}
										onLike={handleLike}
									/>
								</div>
							))}
						</div>
					</div>

					{/* Desktop: circular carousel — all cards SAME SIZE, side cards clipped by overflow */}
					<div className="hidden lg:block overflow-hidden">
						<div
							className="flex items-stretch"
							style={{
								gap: '24px',
								/*
								 * 3 cards × 600px + 2 gaps × 24px = 1848px total.
								 * Container = 1152px max → 696px overflow → 348px per side.
								 * marginLeft = 50% - (600 + 24 + 300) = 50% - 924px
								 * This centers the middle card exactly.
								 */
								marginLeft: 'calc(50% - 924px)',
							}}
						>
							{/* Prev card — scaled down, faded, blurred with gradient */}
							<div
								style={{
									width: '600px',
									flexShrink: 0,
									opacity: 0.7,
									transform: 'scale(0.9)',
									filter: 'blur(3px)',
									transition: 'all 500ms ease-in-out',
									maskImage: 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
									WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
								}}
								aria-hidden="true"
							>
								<HighlightKudoCard
									kudo={highlights[prevIdx >= 0 ? prevIdx : 0]}
									onLike={handleLike}
								/>
							</div>

							{/* Center card — fully visible */}
							<div
								role="group"
								aria-roledescription={t("aria.slide")}
								aria-label={`${t("aria.slide")} ${currentIdx + 1} / ${totalPages}`}
								className="z-10"
								style={{
									width: '600px',
									flexShrink: 0,
									transition: 'all 500ms ease-in-out',
								}}
							>
								<HighlightKudoCard
									kudo={highlights[currentIdx]}
									onLike={handleLike}
									isFeatured
								/>
							</div>

							{/* Next card — scaled down, faded, blurred with gradient */}
							<div
								style={{
									width: '600px',
									flexShrink: 0,
									opacity: 0.7,
									transform: 'scale(0.9)',
									filter: 'blur(3px)',
									transition: 'all 500ms ease-in-out',
									maskImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
									WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
								}}
								aria-hidden="true"
							>
								<HighlightKudoCard
									kudo={highlights[nextIdx >= 0 ? nextIdx : 0]}
									onLike={handleLike}
								/>
							</div>
						</div>
					</div>

					{/* Desktop next button - outside carousel */}
					<button
						type="button"
						aria-label={t("aria.carouselNext")}
						onClick={goToNext}
						className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 w-12 h-12 rounded-lg border-2 border-[var(--color-border-gold)] items-center justify-center text-[var(--color-text-gold)] z-20 cursor-pointer hover:bg-[rgba(255,234,158,0.1)] transition-all duration-150 focus:outline-2 focus:outline-[var(--color-text-gold)] focus:outline-offset-2"
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
