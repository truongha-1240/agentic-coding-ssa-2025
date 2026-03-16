import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("@/hooks/useCountdown", () => ({
	useCountdown: vi.fn(),
}));

describe("CountdownTimer", () => {
	it("renders 'Comming soon' label and 3 countdown tiles when not expired", async () => {
		const { useCountdown } = await import("@/hooks/useCountdown");
		vi.mocked(useCountdown).mockReturnValue({
			days: 20,
			hours: 5,
			minutes: 30,
			isExpired: false,
		});

		const { CountdownTimer } = await import(
			"@/components/homepage/CountdownTimer"
		);
		render(<CountdownTimer />);

		expect(screen.getByText("Comming soon")).toBeInTheDocument();
		expect(
			screen.getByRole("group", { name: "20 days remaining" }),
		).toBeInTheDocument();
		expect(
			screen.getByRole("group", { name: "5 hours remaining" }),
		).toBeInTheDocument();
		expect(
			screen.getByRole("group", { name: "30 minutes remaining" }),
		).toBeInTheDocument();
		expect(screen.getByText("Days")).toBeInTheDocument();
		expect(screen.getByText("Hours")).toBeInTheDocument();
		expect(screen.getByText("Minutes")).toBeInTheDocument();
	});

	it("hides 'Comming soon' label when expired", async () => {
		const { useCountdown } = await import("@/hooks/useCountdown");
		vi.mocked(useCountdown).mockReturnValue({
			days: 0,
			hours: 0,
			minutes: 0,
			isExpired: true,
		});

		const { CountdownTimer } = await import(
			"@/components/homepage/CountdownTimer"
		);
		render(<CountdownTimer />);

		expect(screen.queryByText("Comming soon")).not.toBeInTheDocument();
		expect(
			screen.getByRole("group", { name: "0 days remaining" }),
		).toBeInTheDocument();
		expect(
			screen.getByRole("group", { name: "0 hours remaining" }),
		).toBeInTheDocument();
		expect(
			screen.getByRole("group", { name: "0 minutes remaining" }),
		).toBeInTheDocument();
	});

	it("zero-pads single digit values", async () => {
		const { useCountdown } = await import("@/hooks/useCountdown");
		vi.mocked(useCountdown).mockReturnValue({
			days: 3,
			hours: 7,
			minutes: 1,
			isExpired: false,
		});

		const { CountdownTimer } = await import(
			"@/components/homepage/CountdownTimer"
		);
		render(<CountdownTimer />);

		expect(
			screen.getByRole("group", { name: "3 days remaining" }),
		).toBeInTheDocument();
		expect(
			screen.getByRole("group", { name: "7 hours remaining" }),
		).toBeInTheDocument();
		expect(
			screen.getByRole("group", { name: "1 minutes remaining" }),
		).toBeInTheDocument();
	});

	it("has aria-live polite for accessibility", async () => {
		const { useCountdown } = await import("@/hooks/useCountdown");
		vi.mocked(useCountdown).mockReturnValue({
			days: 10,
			hours: 5,
			minutes: 30,
			isExpired: false,
		});

		const { CountdownTimer } = await import(
			"@/components/homepage/CountdownTimer"
		);
		const { container } = render(<CountdownTimer />);

		const liveRegion = container.querySelector('[aria-live="polite"]');
		expect(liveRegion).toBeInTheDocument();
	});
});
