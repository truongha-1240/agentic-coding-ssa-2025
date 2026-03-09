import { describe, it, expect, vi, beforeEach } from "vitest";

const mockExchangeCodeForSession = vi.fn();

vi.mock("@/libs/supabase/server", () => ({
	createClient: vi.fn(async () => ({
		auth: {
			exchangeCodeForSession: mockExchangeCodeForSession,
		},
	})),
}));

function createRequest(url: string) {
	return new Request(new URL(url, "http://localhost:3000"));
}

describe("GET /api/auth/callback", () => {
	beforeEach(() => {
		vi.resetModules();
		mockExchangeCodeForSession.mockReset();
	});

	it("exchanges valid code for session and redirects to next param (default /)", async () => {
		mockExchangeCodeForSession.mockResolvedValue({ error: null });
		const { GET } = await import("@/app/api/auth/callback/route");

		const response = await GET(createRequest("/api/auth/callback?code=valid_code"));
		expect(mockExchangeCodeForSession).toHaveBeenCalledWith("valid_code");
		expect(response.status).toBe(307);
		expect(response.headers.get("location")).toBe("http://localhost:3000/");
	});

	it("redirects to custom next param on success", async () => {
		mockExchangeCodeForSession.mockResolvedValue({ error: null });
		const { GET } = await import("@/app/api/auth/callback/route");

		const response = await GET(
			createRequest("/api/auth/callback?code=valid_code&next=/dashboard")
		);
		expect(response.status).toBe(307);
		expect(response.headers.get("location")).toBe(
			"http://localhost:3000/dashboard"
		);
	});

	it("redirects to /login without error when code is missing (cancelled OAuth)", async () => {
		const { GET } = await import("@/app/api/auth/callback/route");

		const response = await GET(createRequest("/api/auth/callback"));
		expect(response.status).toBe(307);
		expect(response.headers.get("location")).toBe(
			"http://localhost:3000/login"
		);
	});

	it("redirects to /login with error on invalid code", async () => {
		mockExchangeCodeForSession.mockResolvedValue({
			error: { message: "Invalid code" },
		});
		const { GET } = await import("@/app/api/auth/callback/route");

		const response = await GET(
			createRequest("/api/auth/callback?code=invalid")
		);
		expect(response.status).toBe(307);
		const location = response.headers.get("location");
		expect(location).toContain("/login?error=auth_error");
		expect(location).toContain("error_description=Invalid");
		expect(location).toContain("code");
	});

	it("prevents open redirect when next param contains //", async () => {
		mockExchangeCodeForSession.mockResolvedValue({ error: null });
		const { GET } = await import("@/app/api/auth/callback/route");

		const response = await GET(
			createRequest("/api/auth/callback?code=valid_code&next=//evil.com")
		);
		expect(response.status).toBe(307);
		expect(response.headers.get("location")).toBe("http://localhost:3000/");
	});

	it("accepts next param starting with /", async () => {
		mockExchangeCodeForSession.mockResolvedValue({ error: null });
		const { GET } = await import("@/app/api/auth/callback/route");

		const response = await GET(
			createRequest("/api/auth/callback?code=valid_code&next=/profile")
		);
		expect(response.status).toBe(307);
		expect(response.headers.get("location")).toBe(
			"http://localhost:3000/profile"
		);
	});
});
