import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SectionTitle } from "@/components/awards-information/SectionTitle";

describe("SectionTitle", () => {
	it("renders the subtitle text", () => {
		render(<SectionTitle />);
		expect(
			screen.getByText("Sun* Annual Awards 2025")
		).toBeInTheDocument();
	});

	it("renders the main title in gold", () => {
		render(<SectionTitle />);
		const title = screen.getByText("Hệ thống giải thưởng SAA 2025");
		expect(title).toBeInTheDocument();
	});

	it("renders a separator line", () => {
		const { container } = render(<SectionTitle />);
		const separator = container.querySelector(".h-px");
		expect(separator).toBeInTheDocument();
	});
});
