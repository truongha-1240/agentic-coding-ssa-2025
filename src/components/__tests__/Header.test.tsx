import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("next/image", () => ({
	default: ({ alt, ...props }: { alt: string; [key: string]: unknown }) => (
		// eslint-disable-next-line @next/next/no-img-element
		<img alt={alt} {...props} />
	),
}));

vi.mock("@/components/LanguageSelector", () => ({
	LanguageSelector: () => <div data-testid="language-selector">VN</div>,
}));

describe("Header", () => {
	it("renders SAA logo image (52x48px)", async () => {
		const { Header } = await import("@/components/Header");
		render(<Header />);

		const logo = screen.getByAltText("SAA 2025");
		expect(logo).toBeInTheDocument();
		expect(logo).toHaveAttribute("width", "52");
		expect(logo).toHaveAttribute("height", "48");
	});

	it("renders LanguageSelector child", async () => {
		const { Header } = await import("@/components/Header");
		render(<Header />);

		expect(screen.getByTestId("language-selector")).toBeInTheDocument();
		expect(screen.getByText("VN")).toBeInTheDocument();
	});

	it("renders children in the right-side slot", async () => {
		const { Header } = await import("@/components/Header");
		render(
			<Header>
				<div data-testid="profile-dropdown">Profile</div>
			</Header>
		);

		expect(screen.getByTestId("profile-dropdown")).toBeInTheDocument();
		expect(screen.getByTestId("language-selector")).toBeInTheDocument();
	});
});
