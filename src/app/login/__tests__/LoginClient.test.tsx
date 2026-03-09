import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("next/image", () => ({
	default: ({
		alt,
		...props
	}: {
		alt: string;
		[key: string]: unknown;
	}) => (
		// eslint-disable-next-line @next/next/no-img-element
		<img alt={alt} {...props} />
	),
}));

vi.mock("next/navigation", () => ({
	useSearchParams: () => new URLSearchParams(),
}));

vi.mock("@/hooks/useAuth", () => ({
	useAuth: () => ({
		isLoading: false,
		error: null,
		redirectTo: "/",
		setIsLoading: vi.fn(),
		clearError: vi.fn(),
	}),
}));

vi.mock("@/libs/supabase/client", () => ({
	createClient: () => ({
		auth: {
			signInWithOAuth: vi.fn().mockResolvedValue({ error: null }),
		},
	}),
}));

vi.mock("@/components/Header", () => ({
	Header: () => <header data-testid="header">Header</header>,
}));

vi.mock("@/components/Footer", () => ({
	Footer: () => <footer data-testid="footer">Footer</footer>,
}));

vi.mock("@/app/login/LoginButton", () => ({
	LoginButton: (props: { error: string | null }) => (
		<button data-testid="login-button">
			{props.error ? props.error : "LOGIN With Google"}
		</button>
	),
}));

describe("LoginClient", () => {
	it("renders background image with next/image", async () => {
		const { LoginClient } = await import("@/app/login/LoginClient");
		render(<LoginClient />);

		const bgImage = screen.getByAltText("");
		expect(bgImage).toBeInTheDocument();
	});

	it("renders Header", async () => {
		const { LoginClient } = await import("@/app/login/LoginClient");
		render(<LoginClient />);

		expect(screen.getByTestId("header")).toBeInTheDocument();
	});

	it("renders hero section with key visual", async () => {
		const { LoginClient } = await import("@/app/login/LoginClient");
		render(<LoginClient />);

		expect(screen.getByAltText("ROOT FURTHER")).toBeInTheDocument();
	});

	it("renders hero text", async () => {
		const { LoginClient } = await import("@/app/login/LoginClient");
		render(<LoginClient />);

		expect(
			screen.getByText(/Bắt đầu hành trình/)
		).toBeInTheDocument();
	});

	it("renders LoginButton", async () => {
		const { LoginClient } = await import("@/app/login/LoginClient");
		render(<LoginClient />);

		expect(screen.getByTestId("login-button")).toBeInTheDocument();
	});

	it("renders Footer", async () => {
		const { LoginClient } = await import("@/app/login/LoginClient");
		render(<LoginClient />);

		expect(screen.getByTestId("footer")).toBeInTheDocument();
	});
});
