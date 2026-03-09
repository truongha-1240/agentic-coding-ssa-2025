import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

describe("Footer", () => {
	it("renders copyright text", async () => {
		const { Footer } = await import("@/components/Footer");
		render(<Footer />);

		expect(
			screen.getByText("Bản quyền thuộc về Sun* © 2025")
		).toBeInTheDocument();
	});

	it("has top border", async () => {
		const { Footer } = await import("@/components/Footer");
		const { container } = render(<Footer />);

		const footer = container.firstElementChild as HTMLElement;
		expect(footer.className).toContain("border-t");
	});
});
