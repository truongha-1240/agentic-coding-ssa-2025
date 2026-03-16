import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { RootFurtherSection } from "@/components/homepage/RootFurtherSection";

describe("RootFurtherSection", () => {
	it("renders multi-paragraph text content", () => {
		render(<RootFurtherSection />);

		expect(
			screen.getByText(/Đứng trước bối cảnh thay đổi/),
		).toBeInTheDocument();
		expect(
			screen.getByText(/Lấy cảm hứng từ sự đa dạng/),
		).toBeInTheDocument();
		expect(
			screen.getByText(/Vượt ra khỏi nét nghĩa bề mặt/),
		).toBeInTheDocument();
	});

	it("renders English quote", () => {
		render(<RootFurtherSection />);

		expect(
			screen.getByText(
				/A tree with deep roots fears no storm/,
			),
		).toBeInTheDocument();
	});

	it("renders quote translation", () => {
		render(<RootFurtherSection />);

		expect(
			screen.getByText(/Cây sâu bén rễ, bão giông chẳng nề/),
		).toBeInTheDocument();
	});

	it("renders closing paragraphs", () => {
		render(<RootFurtherSection />);

		expect(
			screen.getByText(/Trước giông bão, chỉ những tán cây/),
		).toBeInTheDocument();
		expect(
			screen.getByText(/Không ai biết trước ẩn sâu/),
		).toBeInTheDocument();
	});
});
