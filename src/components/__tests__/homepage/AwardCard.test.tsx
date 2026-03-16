import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { AwardCard } from "@/components/homepage/AwardCard";

const mockAward = {
	name: "Top Talent",
	slug: "top-talent",
	description:
		"Giải thưởng vinh danh những cá nhân xuất sắc nhất, có đóng góp nổi bật trong năm.",
	thumbnailPath: "/images/homepage/awards/top-talent.png",
};

describe("AwardCard", () => {
	it("renders thumbnail image", () => {
		render(<AwardCard {...mockAward} />);

		const img = screen.getByAltText("Top Talent");
		expect(img).toBeInTheDocument();
	});

	it("renders title in gold color", () => {
		render(<AwardCard {...mockAward} />);

		const title = screen.getByText("Top Talent");
		expect(title).toBeInTheDocument();
	});

	it("renders description with 2-line clamp", () => {
		render(<AwardCard {...mockAward} />);

		const desc = screen.getByText(mockAward.description);
		expect(desc).toBeInTheDocument();
		expect(desc).toHaveClass("line-clamp-2");
	});

	it("renders 'Chi tiết' link with ArrowUpRightIcon", () => {
		const { container } = render(<AwardCard {...mockAward} />);

		const chiTiet = screen.getByText("Chi tiết");
		expect(chiTiet).toBeInTheDocument();

		const svg = container.querySelectorAll("svg");
		expect(svg.length).toBeGreaterThan(0);
	});

	it("links to correct awards-information page with hash anchor", () => {
		render(<AwardCard {...mockAward} />);

		const link = screen.getByRole("link");
		expect(link).toHaveAttribute("href", "/awards-information#top-talent");
	});

	it("has hover transition classes", () => {
		render(<AwardCard {...mockAward} />);

		const link = screen.getByRole("link");
		expect(link).toHaveClass("transition-all");
	});
});
