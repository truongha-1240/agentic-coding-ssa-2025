import { AwardsSidebar } from "@/components/awards-information/AwardsSidebar";
import { AwardsList } from "@/components/awards-information/AwardsList";
import type { AwardDetailCategory } from "@/types/awards";

interface AwardsLayoutProps {
	categories: AwardDetailCategory[];
}

export function AwardsLayout({ categories }: AwardsLayoutProps) {
	return (
		<div className="flex flex-col lg:flex-row gap-8 lg:gap-20 w-full max-w-[1152px]">
			<AwardsSidebar categories={categories} />
			<AwardsList categories={categories} />
		</div>
	);
}
