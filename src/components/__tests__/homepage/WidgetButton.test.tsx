import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { WidgetButton } from "@/components/homepage/WidgetButton";

describe("WidgetButton", () => {
	it("renders a button element", () => {
		render(<WidgetButton />);

		const button = screen.getByRole("button");
		expect(button).toBeInTheDocument();
	});

	it("has fixed position classes", () => {
		render(<WidgetButton />);

		const button = screen.getByRole("button");
		expect(button).toHaveClass("fixed");
		expect(button).toHaveClass("bottom-4");
		expect(button).toHaveClass("right-4");
	});

	it("has pill shape with rounded-full", () => {
		render(<WidgetButton />);

		const button = screen.getByRole("button");
		expect(button).toHaveClass("rounded-full");
	});

	it("renders PenIcon and SaaMiniIcon with separator", () => {
		const { container } = render(<WidgetButton />);

		const svgs = container.querySelectorAll("svg");
		expect(svgs.length).toBe(2);
		expect(screen.getByText("/")).toBeInTheDocument();
	});

	it("has correct dimensions", () => {
		render(<WidgetButton />);

		const button = screen.getByRole("button");
		expect(button).toHaveClass("w-[90px]");
		expect(button).toHaveClass("h-14");
	});
});
