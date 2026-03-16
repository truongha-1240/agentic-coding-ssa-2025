import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { KudosPromotion } from "@/components/homepage/KudosPromotion";

describe("KudosPromotion", () => {
	it("renders 'Phong trào ghi nhận' label", () => {
		render(<KudosPromotion />);

		expect(
			screen.getByText("Phong trào ghi nhận"),
		).toBeInTheDocument();
	});

	it("renders 'Sun* Kudos' title", () => {
		render(<KudosPromotion />);

		expect(screen.getByText("Sun* Kudos")).toBeInTheDocument();
	});

	it("renders 'ĐIỂM MỚI CỦA SAA 2025' sub-label", () => {
		render(<KudosPromotion />);

		expect(
			screen.getByText("ĐIỂM MỚI CỦA SAA 2025"),
		).toBeInTheDocument();
	});

	it("renders description text", () => {
		render(<KudosPromotion />);

		expect(
			screen.getByText(/Hoạt động ghi nhận và cảm ơn đồng nghiệp/),
		).toBeInTheDocument();
	});

	it("renders 'Chi tiết' button with correct href", () => {
		render(<KudosPromotion />);

		const link = screen.getByRole("link", { name: /Chi tiết/i });
		expect(link).toBeInTheDocument();
		expect(link).toHaveAttribute("href", "/sun-kudos");
	});

	it("renders KUDOS branding image", () => {
		const { container } = render(<KudosPromotion />);

		const imgs = container.querySelectorAll("img");
		const kudosImg = Array.from(imgs).find(
			(img) =>
				img.getAttribute("alt") === "KUDOS" ||
				img.getAttribute("src")?.includes("kudos-logo"),
		);
		expect(kudosImg).toBeTruthy();
	});
});
