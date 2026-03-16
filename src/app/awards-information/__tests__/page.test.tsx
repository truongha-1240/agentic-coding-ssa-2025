import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import AwardsInformationPage from "@/app/awards-information/page";
import { AWARD_DETAIL_CATEGORIES } from "@/utils/awards-data";

vi.mock("next/image", () => ({
	default: ({ alt, ...props }: { alt: string; [key: string]: unknown }) => (
		// eslint-disable-next-line @next/next/no-img-element
		<img alt={alt} {...props} />
	),
}));

vi.mock("next/navigation", () => ({
	usePathname: () => "/awards-information",
}));

vi.mock("@/components/ProfileDropdown", () => ({
	ProfileDropdown: () => <div data-testid="profile-dropdown" />,
}));

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

describe("AwardsInformationPage", () => {
	it("renders the section title", () => {
		render(<AwardsInformationPage />);
		expect(
			screen.getByText("Hệ thống giải thưởng SAA 2025")
		).toBeInTheDocument();
	});

	it("renders all 6 award categories", () => {
		render(<AwardsInformationPage />);
		AWARD_DETAIL_CATEGORIES.forEach((cat) => {
			const matches = screen.getAllByText(cat.name);
			expect(matches.length).toBeGreaterThanOrEqual(1);
		});
	});

	it("renders the Kudos promotion section", () => {
		render(<AwardsInformationPage />);
		expect(screen.getByText("Phong trào ghi nhận")).toBeInTheDocument();
		const ctaLinks = screen.getAllByRole("link", { name: /Chi tiết/i });
		const kudosCta = ctaLinks.find(
			(link) => link.getAttribute("href") === "/sun-kudos"
		);
		expect(kudosCta).toBeDefined();
	});

	it("renders the sidebar navigation", () => {
		render(<AwardsInformationPage />);
		const nav = screen.getByRole("navigation", {
			name: "Award categories",
		});
		expect(nav).toBeInTheDocument();
	});

	it("renders footer navigation links", () => {
		render(<AwardsInformationPage />);
		const footerLinks = screen.getAllByText("Giới thiệu SAA 2025");
		expect(footerLinks.length).toBeGreaterThanOrEqual(1);
	});
});
