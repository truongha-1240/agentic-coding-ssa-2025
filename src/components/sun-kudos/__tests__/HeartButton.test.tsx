import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("HeartButton", () => {
	it("renders with gray heart when not liked", async () => {
		const { HeartButton } = await import("@/components/sun-kudos/HeartButton");
		render(
			<HeartButton
				kudoId="1"
				isLiked={false}
				heartCount={5}
				onToggle={vi.fn()}
			/>,
		);

		const button = screen.getByRole("button", { name: /aria\.heartButton/i });
		expect(button).toBeInTheDocument();
		expect(button).toHaveAttribute("aria-pressed", "false");
		expect(screen.getByText("5")).toBeInTheDocument();
	});

	it("renders with red heart when liked", async () => {
		const { HeartButton } = await import("@/components/sun-kudos/HeartButton");
		render(
			<HeartButton
				kudoId="1"
				isLiked={true}
				heartCount={10}
				onToggle={vi.fn()}
			/>,
		);

		const button = screen.getByRole("button", { name: /aria\.heartButtonActive/i });
		expect(button).toHaveAttribute("aria-pressed", "true");
		expect(screen.getByText("10")).toBeInTheDocument();
	});

	it("calls onToggle with kudoId when clicked", async () => {
		const user = userEvent.setup();
		const onToggle = vi.fn();
		const { HeartButton } = await import("@/components/sun-kudos/HeartButton");
		render(
			<HeartButton
				kudoId="abc"
				isLiked={false}
				heartCount={3}
				onToggle={onToggle}
			/>,
		);

		await user.click(screen.getByRole("button"));
		expect(onToggle).toHaveBeenCalledWith("abc");
	});

	it("displays count increment optimistically on click", async () => {
		const user = userEvent.setup();
		const { HeartButton } = await import("@/components/sun-kudos/HeartButton");
		render(
			<HeartButton
				kudoId="1"
				isLiked={false}
				heartCount={5}
				onToggle={vi.fn()}
			/>,
		);

		await user.click(screen.getByRole("button"));
		expect(screen.getByText("6")).toBeInTheDocument();
	});

	it("displays count decrement optimistically when unliking", async () => {
		const user = userEvent.setup();
		const { HeartButton } = await import("@/components/sun-kudos/HeartButton");
		render(
			<HeartButton
				kudoId="1"
				isLiked={true}
				heartCount={10}
				onToggle={vi.fn()}
			/>,
		);

		await user.click(screen.getByRole("button"));
		expect(screen.getByText("9")).toBeInTheDocument();
	});

	it("formats large heart counts with comma separators", async () => {
		const { HeartButton } = await import("@/components/sun-kudos/HeartButton");
		render(
			<HeartButton
				kudoId="1"
				isLiked={false}
				heartCount={1000}
				onToggle={vi.fn()}
			/>,
		);

		expect(screen.getByText("1,000")).toBeInTheDocument();
	});
});
