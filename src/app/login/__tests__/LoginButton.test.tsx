import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

vi.mock("@/components/icons/GoogleIcon", () => ({
	GoogleIcon: ({ className }: { className?: string }) => (
		<svg data-testid="google-icon" className={className} />
	),
}));

describe("LoginButton", () => {
	const defaultProps = {
		error: null as string | null,
		redirectTo: "/",
		isLoading: false,
		onLogin: vi.fn(),
		onClearError: vi.fn(),
	};

	it("renders LOGIN With Google text and GoogleIcon", async () => {
		const { LoginButton } = await import("@/app/login/LoginButton");
		render(<LoginButton {...defaultProps} />);

		expect(screen.getByText("LOGIN With Google")).toBeInTheDocument();
		expect(screen.getByTestId("google-icon")).toBeInTheDocument();
	});

	it("has aria-label='Login with Google'", async () => {
		const { LoginButton } = await import("@/app/login/LoginButton");
		render(<LoginButton {...defaultProps} />);

		expect(
			screen.getByRole("button", { name: "Login with Google" })
		).toBeInTheDocument();
	});

	it("calls onLogin on click", async () => {
		const onLogin = vi.fn();
		const { LoginButton } = await import("@/app/login/LoginButton");
		render(<LoginButton {...defaultProps} onLogin={onLogin} />);

		const user = userEvent.setup();
		await user.click(screen.getByRole("button"));

		expect(onLogin).toHaveBeenCalledTimes(1);
	});

	it("shows loading state with 'Logging in...' and disabled", async () => {
		const { LoginButton } = await import("@/app/login/LoginButton");
		render(<LoginButton {...defaultProps} isLoading={true} />);

		const button = screen.getByRole("button");
		expect(screen.getByText("Logging in...")).toBeInTheDocument();
		expect(button).toBeDisabled();
	});

	it("displays error message with role='alert' when error is set", async () => {
		const { LoginButton } = await import("@/app/login/LoginButton");
		render(<LoginButton {...defaultProps} error="Unauthorized" />);

		const alert = screen.getByRole("alert");
		expect(alert).toHaveTextContent("Unauthorized");
	});

	it("calls onClearError when button is clicked with existing error", async () => {
		const onClearError = vi.fn();
		const { LoginButton } = await import("@/app/login/LoginButton");
		render(
			<LoginButton
				{...defaultProps}
				error="Some error"
				onClearError={onClearError}
			/>
		);

		const user = userEvent.setup();
		await user.click(screen.getByRole("button"));

		expect(onClearError).toHaveBeenCalledTimes(1);
	});

	it("button has pointer-events-none when loading", async () => {
		const { LoginButton } = await import("@/app/login/LoginButton");
		render(<LoginButton {...defaultProps} isLoading={true} />);

		const button = screen.getByRole("button");
		expect(button.className).toContain("pointer-events-none");
	});
});
