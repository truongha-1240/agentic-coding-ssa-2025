import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

let writeTextMock: ReturnType<typeof vi.fn>;

beforeEach(() => {
	writeTextMock = vi.fn().mockResolvedValue(undefined);
	vi.stubGlobal("navigator", {
		...navigator,
		clipboard: { writeText: writeTextMock },
	});
});

describe("CopyLinkButton", () => {
	it("renders copy link button with ARIA label and text", async () => {
		const { CopyLinkButton } = await import(
			"@/components/sun-kudos/CopyLinkButton"
		);
		render(<CopyLinkButton url="https://example.com/kudo/1" />);

		const button = screen.getByRole("button", { name: /aria\.copyLink/i });
		expect(button).toBeInTheDocument();
		expect(screen.getByText("actions.copyLink")).toBeInTheDocument();
	});

	it("copies URL to clipboard on click", async () => {
		const user = userEvent.setup();
		const { CopyLinkButton } = await import(
			"@/components/sun-kudos/CopyLinkButton"
		);
		render(<CopyLinkButton url="https://example.com/kudo/1" />);

		await user.click(screen.getByRole("button"));
		expect(screen.getByRole("status")).toHaveTextContent(/toast\.linkCopied/i);
	});

	it("shows toast with fixed positioning after copying", async () => {
		const user = userEvent.setup();
		const { CopyLinkButton } = await import(
			"@/components/sun-kudos/CopyLinkButton"
		);
		render(<CopyLinkButton url="https://example.com/kudo/1" />);

		await user.click(screen.getByRole("button"));
		const toast = screen.getByRole("status");
		expect(toast).toBeInTheDocument();
		expect(toast).toHaveClass("fixed", "bottom-6", "right-6", "z-50");
	});

	it("auto-dismisses toast after 3 seconds", async () => {
		vi.useFakeTimers({ shouldAdvanceTime: true });
		const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
		const { CopyLinkButton } = await import(
			"@/components/sun-kudos/CopyLinkButton"
		);
		render(<CopyLinkButton url="https://example.com/kudo/1" />);

		await user.click(screen.getByRole("button"));
		expect(screen.getByRole("status")).toBeInTheDocument();

		act(() => {
			vi.advanceTimersByTime(3000);
		});
		expect(screen.queryByRole("status")).not.toBeInTheDocument();

		vi.useRealTimers();
	});
});
