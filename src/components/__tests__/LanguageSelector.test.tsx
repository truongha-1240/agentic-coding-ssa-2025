import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

vi.mock("@/components/icons/VnFlagIcon", () => ({
	VnFlagIcon: ({ className }: { className?: string }) => (
		<svg data-testid="vn-flag-icon" className={className} />
	),
}));

vi.mock("@/components/icons/ChevronDownIcon", () => ({
	ChevronDownIcon: ({ className }: { className?: string }) => (
		<svg data-testid="chevron-down-icon" className={className} />
	),
}));

describe("LanguageSelector", () => {
	it("renders VnFlagIcon + VN text + ChevronDownIcon", async () => {
		const { LanguageSelector } = await import("@/components/LanguageSelector");
		render(<LanguageSelector />);

		expect(screen.getByTestId("vn-flag-icon")).toBeInTheDocument();
		expect(screen.getByText("VN")).toBeInTheDocument();
		expect(screen.getByTestId("chevron-down-icon")).toBeInTheDocument();
	});

	it("has aria-label='Select language'", async () => {
		const { LanguageSelector } = await import("@/components/LanguageSelector");
		render(<LanguageSelector />);

		expect(
			screen.getByRole("button", { name: "Select language" })
		).toBeInTheDocument();
	});

	it("has aria-expanded='false' by default", async () => {
		const { LanguageSelector } = await import("@/components/LanguageSelector");
		render(<LanguageSelector />);

		const button = screen.getByRole("button");
		expect(button).toHaveAttribute("aria-expanded", "false");
	});

	it("click toggles aria-expanded to true", async () => {
		const { LanguageSelector } = await import("@/components/LanguageSelector");
		render(<LanguageSelector />);

		const user = userEvent.setup();
		const button = screen.getByRole("button");

		await user.click(button);
		expect(button).toHaveAttribute("aria-expanded", "true");
	});

	it("second click toggles back to false", async () => {
		const { LanguageSelector } = await import("@/components/LanguageSelector");
		render(<LanguageSelector />);

		const user = userEvent.setup();
		const button = screen.getByRole("button");

		await user.click(button);
		await user.click(button);
		expect(button).toHaveAttribute("aria-expanded", "false");
	});

	it("Enter key toggles aria-expanded", async () => {
		const { LanguageSelector } = await import("@/components/LanguageSelector");
		render(<LanguageSelector />);

		const user = userEvent.setup();
		const button = screen.getByRole("button");

		button.focus();
		await user.keyboard("{Enter}");
		expect(button).toHaveAttribute("aria-expanded", "true");
	});

	it("Space key toggles aria-expanded", async () => {
		const { LanguageSelector } = await import("@/components/LanguageSelector");
		render(<LanguageSelector />);

		const user = userEvent.setup();
		const button = screen.getByRole("button");

		button.focus();
		await user.keyboard(" ");
		expect(button).toHaveAttribute("aria-expanded", "true");
	});

	it("Escape key sets aria-expanded to false", async () => {
		const { LanguageSelector } = await import("@/components/LanguageSelector");
		render(<LanguageSelector />);

		const user = userEvent.setup();
		const button = screen.getByRole("button");

		await user.click(button);
		expect(button).toHaveAttribute("aria-expanded", "true");

		await user.keyboard("{Escape}");
		expect(button).toHaveAttribute("aria-expanded", "false");
	});
});
