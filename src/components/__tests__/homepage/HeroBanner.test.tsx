import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("next/image", () => ({
	default: ({ alt, ...props }: { alt: string; [key: string]: unknown }) => (
		// eslint-disable-next-line @next/next/no-img-element
		<img alt={alt} {...props} />
	),
}));

vi.mock("@/components/homepage/CountdownTimer", () => ({
	CountdownTimer: () => (
		<div data-testid="countdown-timer">CountdownTimer</div>
	),
}));

describe("HeroBanner", () => {
	it("renders the hero banner with background image", async () => {
		const { HeroBanner } = await import("@/components/homepage/HeroBanner");
		const { container } = render(<HeroBanner />);

		const banner = container.firstChild as HTMLElement;
		expect(banner).toBeInTheDocument();
	});

	it("renders the CountdownTimer component", async () => {
		const { HeroBanner } = await import("@/components/homepage/HeroBanner");
		render(<HeroBanner />);

		expect(screen.getByTestId("countdown-timer")).toBeInTheDocument();
	});

	it("renders EventInfo with date, location, and livestream note", async () => {
		const { HeroBanner } = await import("@/components/homepage/HeroBanner");
		render(<HeroBanner />);

		expect(screen.getByText(/26\/12\/2025/)).toBeInTheDocument();
		expect(screen.getByText(/Âu Cơ Art Center/)).toBeInTheDocument();
		expect(
			screen.getByText(/Tường thuật trực tiếp qua sóng Livestream/)
		).toBeInTheDocument();
	});

	it("renders ROOT FURTHER title image", async () => {
		const { HeroBanner } = await import("@/components/homepage/HeroBanner");
		render(<HeroBanner />);

		const titleImg = screen.getByAltText("ROOT FURTHER");
		expect(titleImg).toBeInTheDocument();
	});
});
