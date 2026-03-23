import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SectionTitle } from "@/components/awards-information/SectionTitle";

describe("SectionTitle", () => {
	it("renders the subtitle text (i18n key)", () => {
		render(<SectionTitle />);
		expect(
			screen.getByText("sections.sectionSubtitle")
		).toBeInTheDocument();
	});

	it("renders the main title (i18n key)", () => {
		render(<SectionTitle />);
		expect(screen.getByText("awards.pageTitle")).toBeInTheDocument();
	});

	it("renders a separator line", () => {
		const { container } = render(<SectionTitle />);
		const separator = container.querySelector(".h-px");
		expect(separator).toBeInTheDocument();
	});
});
