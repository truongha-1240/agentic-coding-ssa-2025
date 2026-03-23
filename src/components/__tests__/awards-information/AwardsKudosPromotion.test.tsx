import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { AwardsKudosPromotion } from "@/components/awards-information/AwardsKudosPromotion";

describe("AwardsKudosPromotion", () => {
	it("renders the subtitle", () => {
		render(<AwardsKudosPromotion />);
		expect(screen.getByText("Phong trào ghi nhận")).toBeInTheDocument();
	});

	it("renders the Sun* Kudos title in gold", () => {
		render(<AwardsKudosPromotion />);
		expect(screen.getByText("Sun* Kudos")).toBeInTheDocument();
	});

	it("renders the ĐIỂM MỚI CỦA SAA 2025 label", () => {
		render(<AwardsKudosPromotion />);
		expect(
			screen.getByText("ĐIỂM MỚI CỦA SAA 2025")
		).toBeInTheDocument();
	});

	it("renders the description text", () => {
		render(<AwardsKudosPromotion />);
		expect(
			screen.getByText(/Hoạt động ghi nhận và cảm ơn đồng nghiệp/)
		).toBeInTheDocument();
	});

	it("renders Chi tiết CTA linking to /sun-kudos", () => {
		render(<AwardsKudosPromotion />);
		const cta = screen.getByRole("link", { name: /Chi tiết/i });
		expect(cta).toHaveAttribute("href", "/sun-kudos");
	});
});
