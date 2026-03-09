import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

const mockGetUser = vi.fn();
const mockSupabaseResponse = {
	headers: new Headers(),
	cookies: { set: vi.fn() },
};

vi.mock("@/libs/supabase/middleware", () => ({
	createClient: vi.fn(() => ({
		supabase: {
			auth: {
				getUser: mockGetUser,
			},
		},
		supabaseResponse: mockSupabaseResponse,
	})),
}));

function createRequest(path: string) {
	return new NextRequest(new URL(path, "http://localhost:3000"));
}

describe("middleware", () => {
	beforeEach(() => {
		vi.resetModules();
		mockGetUser.mockReset();
	});

	it("redirects unauthenticated user on / to /login?redirectTo=/", async () => {
		mockGetUser.mockResolvedValue({ data: { user: null } });
		const { middleware } = await import("@/middleware");

		const response = await middleware(createRequest("/"));
		expect(response.status).toBe(307);
		expect(response.headers.get("location")).toBe(
			"http://localhost:3000/login?redirectTo=%2F"
		);
	});

	it("redirects unauthenticated user on /dashboard to /login?redirectTo=/dashboard", async () => {
		mockGetUser.mockResolvedValue({ data: { user: null } });
		const { middleware } = await import("@/middleware");

		const response = await middleware(createRequest("/dashboard"));
		expect(response.status).toBe(307);
		expect(response.headers.get("location")).toBe(
			"http://localhost:3000/login?redirectTo=%2Fdashboard"
		);
	});

	it("redirects authenticated user on /login to /", async () => {
		mockGetUser.mockResolvedValue({ data: { user: { id: "123" } } });
		const { middleware } = await import("@/middleware");

		const response = await middleware(createRequest("/login"));
		expect(response.status).toBe(307);
		expect(response.headers.get("location")).toBe("http://localhost:3000/");
	});

	it("does NOT protect /api/auth/callback", async () => {
		mockGetUser.mockResolvedValue({ data: { user: null } });
		const { config } = await import("@/middleware");

		const callbackPath = "/api/auth/callback";
		const matchers = config.matcher as string[];
		const isMatched = matchers.some((pattern) => {
			if (pattern.startsWith("/((?!")) {
				const excludeMatch = pattern.match(/\(\?!(.*?)\)/);
				if (excludeMatch) {
					const excluded = excludeMatch[1].split("|");
					return !excluded.some((ex) => callbackPath.startsWith(`/${ex}`));
				}
			}
			return false;
		});
		expect(isMatched).toBe(false);
	});

	it("allows unauthenticated user on /login", async () => {
		mockGetUser.mockResolvedValue({ data: { user: null } });
		const { middleware } = await import("@/middleware");

		const response = await middleware(createRequest("/login"));
		expect(response.status).not.toBe(307);
	});
});
