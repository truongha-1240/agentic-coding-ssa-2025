import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { KVBanner } from "@/components/sun-kudos/KVBanner";

vi.mock("@/components/sun-kudos/KVBannerActions", () => ({
	KVBannerActions: () => (
		<div data-testid="kv-banner-actions">
			<button type="button" data-testid="input-bar">Input Bar</button>
			<input data-testid="search-bar" placeholder="kvBanner.searchPlaceholder" />
		</div>
	),
}));

describe("KVBanner", () => {
	it("renders the KUDOS logo image", () => {
		render(<KVBanner />);
		expect(screen.getByAltText("KUDOS")).toBeInTheDocument();
	});

	it("renders the subtitle text", () => {
		render(<KVBanner />);
		expect(screen.getByText("kvBanner.subtitle")).toBeInTheDocument();
	});

	it("renders the input bar", () => {
		render(<KVBanner />);
		expect(screen.getByTestId("input-bar")).toBeInTheDocument();
	});

	it("renders the search bar", () => {
		render(<KVBanner />);
		expect(screen.getByTestId("search-bar")).toBeInTheDocument();
	});
});
