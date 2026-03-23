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
		render(<HeaderNav />);

		// t() returns keys in test mode — check for translation keys
		expect(screen.getByText("header.aboutSaa")).toBeInTheDocument();
		expect(screen.getByText("header.awardsInfo")).toBeInTheDocument();
		expect(screen.getByText("header.sunKudos")).toBeInTheDocument();
	});

	it("highlights active link with gold color", async () => {
		const { usePathname } = await import("next/navigation");
		vi.mocked(usePathname).mockReturnValue("/");

		const { HeaderNav } = await import("@/components/HeaderNav");
		render(<HeaderNav />);

		const activeLink = screen.getByText("header.aboutSaa");
		expect(activeLink.closest("a")).toHaveClass("text-[var(--color-text-gold)]");
	});

	it("non-active links have white text", async () => {
		const { usePathname } = await import("next/navigation");
		vi.mocked(usePathname).mockReturnValue("/");

		const { HeaderNav } = await import("@/components/HeaderNav");
		render(<HeaderNav />);

		const nonActiveLink = screen.getByText("header.awardsInfo");
		expect(nonActiveLink.closest("a")).toHaveClass("text-white");
	});

	it("renders links as anchor elements with correct hrefs", async () => {
		const { usePathname } = await import("next/navigation");
		vi.mocked(usePathname).mockReturnValue("/");

		const { HeaderNav } = await import("@/components/HeaderNav");
		render(<HeaderNav />);

		const link = screen.getByRole("link", { name: "header.aboutSaa" });
		expect(link).toHaveAttribute("href", "/");
	});
});
