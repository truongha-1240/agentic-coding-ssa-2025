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

	it("renders SAA logo when showLogo is true", async () => {
		const { Footer } = await import("@/components/Footer");
		const { container } = render(<Footer showLogo />);

		const img = container.querySelector("img");
		expect(img).toBeInTheDocument();
	});

	it("renders nav links when navLinks prop provided", async () => {
		const { Footer } = await import("@/components/Footer");
		render(
			<Footer
				navLinks={[
					{ label: "About SAA 2025", href: "/" },
					{ label: "Awards Information", href: "/awards-information" },
				]}
			/>,
		);

		expect(screen.getByText("About SAA 2025")).toBeInTheDocument();
		expect(screen.getByText("Awards Information")).toBeInTheDocument();
	});

	it("backward compatible: no props renders copyright only", async () => {
		const { Footer } = await import("@/components/Footer");
		render(<Footer />);

		expect(
			screen.getByText("Bản quyền thuộc về Sun* © 2025"),
		).toBeInTheDocument();
		expect(screen.queryByText("About SAA 2025")).not.toBeInTheDocument();
	});
});
