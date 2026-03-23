import { AwardCard } from "@/components/awards-information/AwardCard";
import type { AwardDetailCategory } from "@/types/awards";

interface AwardsListProps {
	categories: AwardDetailCategory[];
}

export function AwardsList({ categories }: AwardsListProps) {
	return (
		<div className="flex flex-col gap-20 w-full lg:w-[853px]">
			{categories.map((category, index) => (
				<AwardCard
					key={category.slug}
					category={category}
					variant={index % 2 === 0 ? "image-left" : "image-right"}
					isLast={index === categories.length - 1}
				/>
			))}
		</div>
	);
}
