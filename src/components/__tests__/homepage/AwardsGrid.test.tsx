import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { AwardsGrid } from "@/components/homepage/AwardsGrid";

describe("AwardsGrid", () => {
	it("renders section caption 'Sun* annual awards 2025'", () => {
		render(<AwardsGrid />);

		expect(
			screen.getByText("Sun* annual awards 2025"),
		).toBeInTheDocument();
	});

	it("renders section title 'Hệ thống giải thưởng'", () => {
		render(<AwardsGrid />);

		expect(
			screen.getByText("Hệ thống giải thưởng"),
		).toBeInTheDocument();
	});

	it("renders 6 award cards", () => {
		render(<AwardsGrid />);

		const links = screen.getAllByRole("link");
		expect(links).toHaveLength(6);
	});

	it("renders all award category names", () => {
		render(<AwardsGrid />);

		expect(screen.getByText("Top Talent")).toBeInTheDocument();
		expect(screen.getByText("Top Project")).toBeInTheDocument();
		expect(screen.getByText("Top Project Leader")).toBeInTheDocument();
		expect(screen.getByText("Best Manager")).toBeInTheDocument();
		expect(screen.getByText("Signature 2025 - Creator")).toBeInTheDocument();
		expect(screen.getByText("MVP")).toBeInTheDocument();
	});

	it("has grid layout with 3 columns on desktop", () => {
		const { container } = render(<AwardsGrid />);

		const grid = container.querySelector(".grid");
		expect(grid).toBeInTheDocument();
		expect(grid).toHaveClass("lg:grid-cols-3");
	});
});
