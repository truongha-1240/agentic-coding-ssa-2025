import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { AwardsList } from "@/components/awards-information/AwardsList";
import { AWARD_DETAIL_CATEGORIES } from "@/utils/awards-data";

describe("AwardsList", () => {
	it("renders all 6 award cards", () => {
		render(<AwardsList categories={AWARD_DETAIL_CATEGORIES} />);
		AWARD_DETAIL_CATEGORIES.forEach((category) => {
			expect(screen.getByText(category.name)).toBeInTheDocument();
		});
	});

	it("renders sections with correct ids for hash navigation", () => {
		const { container } = render(
			<AwardsList categories={AWARD_DETAIL_CATEGORIES} />
		);
		AWARD_DETAIL_CATEGORIES.forEach((category) => {
			const section = container.querySelector(`#${category.slug}`);
			expect(section).toBeInTheDocument();
		});
	});
});
