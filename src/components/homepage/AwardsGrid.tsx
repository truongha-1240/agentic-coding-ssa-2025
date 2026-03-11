import { AwardsSectionHeader } from "@/components/homepage/AwardsSectionHeader";
import { AwardCard } from "@/components/homepage/AwardCard";
import { AWARD_CATEGORIES } from "@/utils/homepage-data";

export function AwardsGrid() {
	return (
		<section className="flex flex-col gap-20 w-full max-w-[1224px] mx-auto px-6 lg:px-0">
			<AwardsSectionHeader />
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{AWARD_CATEGORIES.map((award) => (
					<AwardCard key={award.slug} {...award} />
				))}
			</div>
		</section>
	);
}
