import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProfileDropdown } from "@/components/ProfileDropdown";

const mockPush = vi.fn();
const mockSignOut = vi.fn();

vi.mock("next/navigation", () => ({
	useRouter: () => ({
		push: mockPush,
	}),
}));

vi.mock("@/libs/supabase/client", () => ({
	createClient: () => ({
		auth: {
			signOut: mockSignOut,
		},
	}),
}));

describe("ProfileDropdown", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		mockSignOut.mockResolvedValue({ error: null });
	});

	// T004: renders trigger button with aria-haspopup
	it("renders trigger button with aria-haspopup='true'", () => {
		render(<ProfileDropdown />);
		const trigger = screen.getByRole("button", { name: /profile menu/i });
		expect(trigger).toHaveAttribute("aria-haspopup", "true");
	});

	// T005: clicking trigger opens dropdown with Profile and Logout
	it("opens dropdown on click showing Profile and Logout items", async () => {
		const user = userEvent.setup();
		render(<ProfileDropdown />);

		const trigger = screen.getByRole("button", { name: /profile menu/i });
		await user.click(trigger);

		expect(screen.getByRole("menu")).toBeInTheDocument();
		expect(screen.getByRole("menuitem", { name: /profile/i })).toBeInTheDocument();
		expect(screen.getByRole("menuitem", { name: /logout/i })).toBeInTheDocument();
	});

	// T006: clicking Profile navigates to /profile and closes dropdown
	it("navigates to /profile when Profile is clicked", async () => {
		const user = userEvent.setup();
		render(<ProfileDropdown />);

		await user.click(screen.getByRole("button", { name: /profile menu/i }));
		await user.click(screen.getByRole("menuitem", { name: /profile/i }));

		expect(mockPush).toHaveBeenCalledWith("/profile");
		expect(screen.queryByRole("menu")).not.toBeInTheDocument();
	});

	// T007: clicking Logout calls signOut and redirects to /login
	it("calls signOut and redirects to /login when Logout is clicked", async () => {
		const user = userEvent.setup();
		render(<ProfileDropdown />);

		await user.click(screen.getByRole("button", { name: /profile menu/i }));
		await user.click(screen.getByRole("menuitem", { name: /logout/i }));

		await waitFor(() => {
			expect(mockSignOut).toHaveBeenCalled();
			expect(mockPush).toHaveBeenCalledWith("/login");
		});
	});

	// T008: shows loading state during logout
	it("disables Logout button during signOut loading", async () => {
		mockSignOut.mockImplementation(
			() => new Promise((resolve) => setTimeout(() => resolve({ error: null }), 100))
		);
		const user = userEvent.setup();
		render(<ProfileDropdown />);

		await user.click(screen.getByRole("button", { name: /profile menu/i }));
		await user.click(screen.getByRole("menuitem", { name: /logout/i }));

		const logoutItem = screen.getByRole("menuitem", { name: /logout/i });
		expect(logoutItem).toHaveAttribute("aria-disabled", "true");
	});

	// T009: logout failure displays inline error
	it("displays error message when signOut fails", async () => {
		mockSignOut.mockResolvedValue({ error: { message: "Network error" } });
		const user = userEvent.setup();
		render(<ProfileDropdown />);

		await user.click(screen.getByRole("button", { name: /profile menu/i }));

		// Clear any prior mock calls before clicking logout
		mockPush.mockClear();

		await user.click(screen.getByRole("menuitem", { name: /logout/i }));

		await waitFor(() => {
			expect(screen.getByRole("alert")).toHaveTextContent("Network error");
		});
		expect(mockPush).not.toHaveBeenCalledWith("/login");
	});

	// T010: double-clicking trigger toggles correctly
	it("toggles dropdown on double click without getting stuck", async () => {
		const user = userEvent.setup();
		render(<ProfileDropdown />);

		const trigger = screen.getByRole("button", { name: /profile menu/i });

		await user.click(trigger);
		expect(screen.getByRole("menu")).toBeInTheDocument();

		await user.click(trigger);
		expect(screen.queryByRole("menu")).not.toBeInTheDocument();

		await user.click(trigger);
		expect(screen.getByRole("menu")).toBeInTheDocument();
	});

	// T015: clicking outside closes dropdown
	it("closes dropdown when clicking outside", async () => {
		const user = userEvent.setup();
		render(<ProfileDropdown />);

		await user.click(screen.getByRole("button", { name: /profile menu/i }));
		expect(screen.getByRole("menu")).toBeInTheDocument();

		await user.click(document.body);
		expect(screen.queryByRole("menu")).not.toBeInTheDocument();
	});

	// T016: Escape closes dropdown and returns focus to trigger
	it("closes dropdown on Escape and returns focus to trigger", async () => {
		const user = userEvent.setup();
		render(<ProfileDropdown />);

		const trigger = screen.getByRole("button", { name: /profile menu/i });
		await user.click(trigger);
		expect(screen.getByRole("menu")).toBeInTheDocument();

		await user.keyboard("{Escape}");
		expect(screen.queryByRole("menu")).not.toBeInTheDocument();
		expect(trigger).toHaveFocus();
	});

	// T017: Enter/Space on trigger opens dropdown
	it("opens dropdown with Enter key on focused trigger", async () => {
		const user = userEvent.setup();
		render(<ProfileDropdown />);

		const trigger = screen.getByRole("button", { name: /profile menu/i });
		trigger.focus();
		await user.keyboard("{Enter}");

		expect(screen.getByRole("menu")).toBeInTheDocument();
	});

	// T018: ArrowDown/ArrowUp moves focus between items
	it("moves focus between items with ArrowDown/ArrowUp", async () => {
		const user = userEvent.setup();
		render(<ProfileDropdown />);

		await user.click(screen.getByRole("button", { name: /profile menu/i }));

		await user.keyboard("{ArrowDown}");
		expect(screen.getByRole("menuitem", { name: /profile/i })).toHaveFocus();

		await user.keyboard("{ArrowDown}");
		expect(screen.getByRole("menuitem", { name: /logout/i })).toHaveFocus();

		await user.keyboard("{ArrowUp}");
		expect(screen.getByRole("menuitem", { name: /profile/i })).toHaveFocus();
	});
});
