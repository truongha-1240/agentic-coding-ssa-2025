import { ChevronRightIcon } from "@/components/icons/ChevronRightIcon";
import { SUN_KUDOS_TEXTS } from "@/utils/sun-kudos-data";

interface CarouselControlsProps {
	currentPage: number;
	totalPages: number;
	onPrev: () => void;
	onNext: () => void;
}

export function CarouselControls({
	currentPage,
	totalPages,
	onPrev,
	onNext,
}: CarouselControlsProps) {
	const isPrevDisabled = currentPage === 0;
	const isNextDisabled = currentPage === totalPages - 1;

	return (
		<div className="flex items-center gap-4">
			<button
				type="button"
				aria-label={SUN_KUDOS_TEXTS.aria.carouselPrev}
				onClick={onPrev}
				disabled={isPrevDisabled}
				className={`w-12 h-12 rounded-full border border-[var(--color-border-gold)] flex items-center justify-center text-[var(--color-text-gold)] transition-opacity duration-150 focus:outline-2 focus:outline-[var(--color-text-gold)] focus:outline-offset-2 ${
					isPrevDisabled
						? "opacity-30 cursor-not-allowed"
						: "cursor-pointer hover:bg-white/10"
				}`}
			>
				<ChevronRightIcon className="w-6 h-6 rotate-180" />
			</button>

			<div className="flex items-center gap-1">
				<span className="text-4xl font-bold text-[var(--color-text-gold)]">
					{currentPage + 1}
				</span>
				<span className="text-xl font-bold text-white">/</span>
				<span className="text-xl font-bold text-white">{totalPages}</span>
			</div>

			<button
				type="button"
				aria-label={SUN_KUDOS_TEXTS.aria.carouselNext}
				onClick={onNext}
				disabled={isNextDisabled}
				className={`w-12 h-12 rounded-full border border-[var(--color-border-gold)] flex items-center justify-center text-[var(--color-text-gold)] transition-opacity duration-150 focus:outline-2 focus:outline-[var(--color-text-gold)] focus:outline-offset-2 ${
					isNextDisabled
						? "opacity-30 cursor-not-allowed"
						: "cursor-pointer hover:bg-white/10"
				}`}
			>
				<ChevronRightIcon className="w-6 h-6" />
			</button>
		</div>
	);
}
