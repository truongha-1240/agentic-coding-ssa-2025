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

	it("renders nav links when navLinks prop provided", async () => {
		const { Header } = await import("@/components/Header");
		render(
			<Header
				navLinks={[
					{ label: "About SAA 2025", href: "/" },
					{ label: "Awards Information", href: "/awards-information" },
				]}
			/>,
		);

		expect(screen.getByText("About SAA 2025")).toBeInTheDocument();
		expect(screen.getByText("Awards Information")).toBeInTheDocument();
	});

	it("renders notification bell when showNotification is true", async () => {
		const { Header } = await import("@/components/Header");
		const { container } = render(<Header showNotification />);

		const bell = container.querySelector('[aria-label="Notifications"]');
		expect(bell).toBeInTheDocument();
	});

	it("backward compatible: renders without navLinks or showNotification", async () => {
		const { Header } = await import("@/components/Header");
		render(<Header />);

		expect(screen.getByAltText("SAA 2025")).toBeInTheDocument();
		expect(screen.queryByText("About SAA 2025")).not.toBeInTheDocument();
	});
});
