import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";

const mockSearchParams = new URLSearchParams();

vi.mock("next/navigation", () => ({
	useSearchParams: () => mockSearchParams,
}));

describe("useAuth", () => {
	beforeEach(() => {
		vi.resetModules();
		mockSearchParams.delete("error");
		mockSearchParams.delete("error_description");
		mockSearchParams.delete("redirectTo");
	});

	it("parses error and error_description from URL search params", async () => {
		mockSearchParams.set("error", "auth_error");
		mockSearchParams.set("error_description", "Invalid account");

		const { useAuth } = await import("@/hooks/useAuth");
		const { result } = renderHook(() => useAuth());

		expect(result.current.error).toBe("Invalid account");
	});

	it("parses redirectTo from URL (defaults to /)", async () => {
		const { useAuth } = await import("@/hooks/useAuth");
		const { result } = renderHook(() => useAuth());

		expect(result.current.redirectTo).toBe("/");
	});

	it("parses redirectTo from URL when present", async () => {
		mockSearchParams.set("redirectTo", "/dashboard");

		const { useAuth } = await import("@/hooks/useAuth");
		const { result } = renderHook(() => useAuth());

		expect(result.current.redirectTo).toBe("/dashboard");
	});

	it("clearError sets error to null", async () => {
		mockSearchParams.set("error", "auth_error");
		mockSearchParams.set("error_description", "Test error");

		const { useAuth } = await import("@/hooks/useAuth");
		const { result } = renderHook(() => useAuth());

		expect(result.current.error).toBe("Test error");

		act(() => {
			result.current.clearError();
		});

		expect(result.current.error).toBeNull();
	});

	it("setIsLoading toggles loading state", async () => {
		const { useAuth } = await import("@/hooks/useAuth");
		const { result } = renderHook(() => useAuth());

		expect(result.current.isLoading).toBe(false);

		act(() => {
			result.current.setIsLoading(true);
		});

		expect(result.current.isLoading).toBe(true);
	});
});
