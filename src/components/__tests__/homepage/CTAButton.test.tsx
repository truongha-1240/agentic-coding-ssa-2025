import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CTAButton } from "@/components/homepage/CTAButton";

describe("CTAButton", () => {
	it("renders button text and correct href", () => {
		render(<CTAButton href="/awards-information" label="ABOUT AWARDS" />);

		const link = screen.getByRole("link", { name: /ABOUT AWARDS/i });
		expect(link).toBeInTheDocument();
		expect(link).toHaveAttribute("href", "/awards-information");
	});

	it("renders ArrowUpRightIcon", () => {
		const { container } = render(
			<CTAButton href="/sun-kudos" label="ABOUT KUDOS" />,
		);

		const svg = container.querySelector("svg");
		expect(svg).toBeInTheDocument();
	});

	it("has correct base styling classes", () => {
		render(<CTAButton href="/awards-information" label="ABOUT AWARDS" />);

		const link = screen.getByRole("link", { name: /ABOUT AWARDS/i });
		expect(link).toHaveClass("rounded-lg");
		expect(link).toHaveClass("font-bold");
	});

	it("renders with outlined style (border + translucent bg, white text)", () => {
		render(<CTAButton href="/sun-kudos" label="ABOUT KUDOS" />);

		const link = screen.getByRole("link", { name: /ABOUT KUDOS/i });
		expect(link.className).toContain("text-white");
		expect(link.className).toContain("border-[#998C5F]");
	});

	it("is accessible as a link", () => {
		render(<CTAButton href="/awards-information" label="ABOUT AWARDS" />);

		const link = screen.getByRole("link", { name: /ABOUT AWARDS/i });
		expect(link.tagName === "A" || link.closest("a")).toBeTruthy();
	});
});
