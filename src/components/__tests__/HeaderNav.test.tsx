import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("next/navigation", () => ({
	usePathname: vi.fn(),
}));

describe("HeaderNav", () => {
	it("renders 3 navigation links", async () => {
		const { usePathname } = await import("next/navigation");
		vi.mocked(usePathname).mockReturnValue("/");

		const { HeaderNav } = await import("@/components/HeaderNav");
		render(
			<HeaderNav
				links={[
					{ label: "About SAA 2025", href: "/" },
					{ label: "Awards Information", href: "/awards-information" },
					{ label: "Sun* Kudos", href: "/sun-kudos" },
				]}
			/>,
		);

		expect(screen.getByText("About SAA 2025")).toBeInTheDocument();
		expect(screen.getByText("Awards Information")).toBeInTheDocument();
		expect(screen.getByText("Sun* Kudos")).toBeInTheDocument();
	});

	it("highlights active link with gold color", async () => {
		const { usePathname } = await import("next/navigation");
		vi.mocked(usePathname).mockReturnValue("/");

		const { HeaderNav } = await import("@/components/HeaderNav");
		render(
			<HeaderNav
				links={[
					{ label: "About SAA 2025", href: "/" },
					{ label: "Awards Information", href: "/awards-information" },
				]}
			/>,
		);

		const activeLink = screen.getByText("About SAA 2025");
		expect(activeLink.closest("a")).toHaveClass("text-[var(--color-text-gold)]");
	});

	it("non-active links have white text", async () => {
		const { usePathname } = await import("next/navigation");
		vi.mocked(usePathname).mockReturnValue("/");

		const { HeaderNav } = await import("@/components/HeaderNav");
		render(
			<HeaderNav
				links={[
					{ label: "About SAA 2025", href: "/" },
					{ label: "Awards Information", href: "/awards-information" },
				]}
			/>,
		);

		const nonActiveLink = screen.getByText("Awards Information");
		expect(nonActiveLink.closest("a")).toHaveClass("text-white");
	});

	it("renders links as anchor elements", async () => {
		const { usePathname } = await import("next/navigation");
		vi.mocked(usePathname).mockReturnValue("/");

		const { HeaderNav } = await import("@/components/HeaderNav");
		render(
			<HeaderNav
				links={[{ label: "About SAA 2025", href: "/" }]}
			/>,
		);

		const link = screen.getByRole("link", { name: "About SAA 2025" });
		expect(link).toHaveAttribute("href", "/");
	});
});
