import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { AwardsSidebar } from "@/components/awards-information/AwardsSidebar";
import { AWARD_DETAIL_CATEGORIES } from "@/utils/awards-data";

beforeEach(() => {
	vi.stubGlobal(
		"IntersectionObserver",
		class {
			constructor() {}
			observe = vi.fn();
			unobserve = vi.fn();
			disconnect = vi.fn();
			root = null;
			rootMargin = "";
			thresholds = [];
			takeRecords = vi.fn();
		}
	);

	AWARD_DETAIL_CATEGORIES.forEach((cat) => {
		const el = document.createElement("section");
		el.id = cat.slug;
		el.scrollIntoView = vi.fn();
		document.body.appendChild(el);
	});

	Object.defineProperty(window, "location", {
		value: { hash: "" },
		writable: true,
		configurable: true,
	});
});

afterEach(() => {
	vi.unstubAllGlobals();
	document.body.innerHTML = "";
});

describe("AwardsSidebar", () => {
	it("renders 6 navigation links", () => {
		render(<AwardsSidebar categories={AWARD_DETAIL_CATEGORIES} />);
		AWARD_DETAIL_CATEGORIES.forEach((cat) => {
			expect(screen.getByText(cat.name)).toBeInTheDocument();
		});
	});

	it("renders a nav element with aria-label", () => {
		render(<AwardsSidebar categories={AWARD_DETAIL_CATEGORIES} />);
		const nav = screen.getByRole("navigation", {
			name: "Award categories",
		});
		expect(nav).toBeInTheDocument();
	});

	it("first item has active state by default", () => {
		render(<AwardsSidebar categories={AWARD_DETAIL_CATEGORIES} />);
		const firstLink = screen.getByText("Signature 2025 - Creator").closest("a");
		expect(firstLink).toHaveAttribute("aria-current", "true");
	});

	it("renders links with correct href hash anchors", () => {
		render(<AwardsSidebar categories={AWARD_DETAIL_CATEGORIES} />);
		const link = screen.getByText("Top Project").closest("a");
		expect(link).toHaveAttribute("href", "#top-project");
	});

	it("calls scrollIntoView on click", () => {
		render(<AwardsSidebar categories={AWARD_DETAIL_CATEGORIES} />);
		const link = screen.getByText("Top Project").closest("a")!;
		const section = document.getElementById("top-project")!;
		section.scrollIntoView = vi.fn();

		fireEvent.click(link);
		expect(section.scrollIntoView).toHaveBeenCalledWith({
			behavior: "smooth",
		});
	});
});
