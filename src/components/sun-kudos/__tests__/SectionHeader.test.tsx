import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

describe("SectionHeader", () => {
	it("renders subtitle text", async () => {
		const { SectionHeader } = await import(
			"@/components/sun-kudos/SectionHeader"
		);
		render(<SectionHeader title="ALL KUDOS" />);

		expect(screen.getByText("Sun* Annual Awards 2025")).toBeInTheDocument();
	});

	it("renders divider element", async () => {
		const { SectionHeader } = await import(
			"@/components/sun-kudos/SectionHeader"
		);
		const { container } = render(<SectionHeader title="ALL KUDOS" />);

		const divider = container.querySelector("hr, [role='separator']");
		expect(divider).toBeInTheDocument();
	});

	it("renders title with gold glow styling", async () => {
		const { SectionHeader } = await import(
			"@/components/sun-kudos/SectionHeader"
		);
		render(<SectionHeader title="HIGHLIGHT KUDOS" />);

		const title = screen.getByText("HIGHLIGHT KUDOS");
		expect(title).toBeInTheDocument();
	});
});
