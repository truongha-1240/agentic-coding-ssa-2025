import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { AwardCard } from "@/components/awards-information/AwardCard";
import { AWARD_DETAIL_CATEGORIES } from "@/utils/awards-data";

describe("AwardCard", () => {
	const topTalent = AWARD_DETAIL_CATEGORIES[1];
	const signature = AWARD_DETAIL_CATEGORIES[0];

	it("renders award title", () => {
		render(
			<AwardCard category={topTalent} variant="image-left" />
		);
		expect(screen.getByText("Top Talent")).toBeInTheDocument();
	});

	it("renders award description", () => {
		render(
			<AwardCard category={topTalent} variant="image-left" />
		);
		expect(screen.getByText(topTalent.description)).toBeInTheDocument();
	});

	it("renders quantity and unit", () => {
		render(
			<AwardCard category={topTalent} variant="image-left" />
		);
		expect(screen.getByText("10")).toBeInTheDocument();
		expect(screen.getByText("Đơn vị")).toBeInTheDocument();
	});

	it("renders prize value and note", () => {
		render(
			<AwardCard category={topTalent} variant="image-left" />
		);
		expect(screen.getByText("7.000.000 VNĐ")).toBeInTheDocument();
		expect(
			screen.getByText("cho mỗi giải thưởng")
		).toBeInTheDocument();
	});

	it("renders static labels", () => {
		render(
			<AwardCard category={topTalent} variant="image-left" />
		);
		expect(
			screen.getByText("Số lượng giải thưởng:")
		).toBeInTheDocument();
		expect(
			screen.getByText("Giá trị giải thưởng:")
		).toBeInTheDocument();
	});

	it("renders section id for hash anchor navigation", () => {
		const { container } = render(
			<AwardCard category={topTalent} variant="image-left" />
		);
		const section = container.querySelector("#top-talent");
		expect(section).toBeInTheDocument();
	});

	it("renders thumbnail image with empty alt (decorative)", () => {
		const { container } = render(
			<AwardCard category={topTalent} variant="image-left" />
		);
		const img = container.querySelector("img[src*='top-talent']");
		expect(img).toBeInTheDocument();
		expect(img).toHaveAttribute("alt", "");
	});

	it("renders separator when isLast is false", () => {
		const { container } = render(
			<AwardCard
				category={topTalent}
				variant="image-left"
				isLast={false}
			/>
		);
		const separators = container.querySelectorAll(".bg-\\[\\#2E3940\\]");
		expect(separators.length).toBeGreaterThanOrEqual(1);
	});

	it("omits bottom separator when isLast is true", () => {
		const { container } = render(
			<AwardCard
				category={topTalent}
				variant="image-left"
				isLast={true}
			/>
		);
		const section = container.querySelector("section");
		const lastChild = section?.lastElementChild;
		expect(lastChild?.tagName).not.toBe("HR");
	});

	it("renders dual-prize layout for Signature 2025 with Hoặc divider", () => {
		render(
			<AwardCard category={signature} variant="image-left" />
		);
		expect(screen.getByText("5.000.000 VNĐ")).toBeInTheDocument();
		expect(screen.getByText("8.000.000 VNĐ")).toBeInTheDocument();
		expect(screen.getByText("Hoặc")).toBeInTheDocument();
		expect(screen.getByText("cho giải cá nhân")).toBeInTheDocument();
		expect(screen.getByText("cho giải tập thể")).toBeInTheDocument();
	});
});
