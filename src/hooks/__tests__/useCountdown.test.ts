import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useCountdown } from "@/hooks/useCountdown";

describe("useCountdown", () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
		vi.unstubAllEnvs();
	});

	it("returns correct days, hours, minutes for a future date", () => {
		vi.stubEnv("NEXT_PUBLIC_EVENT_DATETIME", "2026-12-26T18:00:00+07:00");
		// Set "now" to a known time
		vi.setSystemTime(new Date("2026-12-06T18:00:00+07:00"));

		const { result } = renderHook(() => useCountdown());

		expect(result.current.days).toBe(20);
		expect(result.current.hours).toBe(0);
		expect(result.current.minutes).toBe(0);
		expect(result.current.isExpired).toBe(false);
	});

	it("returns zero-padded values as numbers", () => {
		vi.stubEnv("NEXT_PUBLIC_EVENT_DATETIME", "2026-12-26T20:30:00+07:00");
		vi.setSystemTime(new Date("2026-12-26T15:25:00+07:00"));

		const { result } = renderHook(() => useCountdown());

		expect(result.current.days).toBe(0);
		expect(result.current.hours).toBe(5);
		expect(result.current.minutes).toBe(5);
		expect(result.current.isExpired).toBe(false);
	});

	it("returns isExpired=true when event date has passed", () => {
		vi.stubEnv("NEXT_PUBLIC_EVENT_DATETIME", "2025-01-01T00:00:00+07:00");
		vi.setSystemTime(new Date("2026-03-10T10:00:00+07:00"));

		const { result } = renderHook(() => useCountdown());

		expect(result.current.days).toBe(0);
		expect(result.current.hours).toBe(0);
		expect(result.current.minutes).toBe(0);
		expect(result.current.isExpired).toBe(true);
	});

	it("returns isExpired=true when env var is missing", () => {
		vi.stubEnv("NEXT_PUBLIC_EVENT_DATETIME", "");
		vi.setSystemTime(new Date("2026-03-10T10:00:00+07:00"));

		const { result } = renderHook(() => useCountdown());

		expect(result.current.days).toBe(0);
		expect(result.current.hours).toBe(0);
		expect(result.current.minutes).toBe(0);
		expect(result.current.isExpired).toBe(true);
	});

	it("returns isExpired=true when env var is invalid date", () => {
		vi.stubEnv("NEXT_PUBLIC_EVENT_DATETIME", "not-a-date");
		vi.setSystemTime(new Date("2026-03-10T10:00:00+07:00"));

		const { result } = renderHook(() => useCountdown());

		expect(result.current.isExpired).toBe(true);
	});

	it("updates countdown every 60 seconds", () => {
		vi.stubEnv("NEXT_PUBLIC_EVENT_DATETIME", "2026-12-26T18:00:00+07:00");
		vi.setSystemTime(new Date("2026-12-26T17:02:00+07:00"));

		const { result } = renderHook(() => useCountdown());

		expect(result.current.minutes).toBe(58);

		act(() => {
			vi.advanceTimersByTime(60000);
		});

		expect(result.current.minutes).toBe(57);
	});

	it("cleans up interval on unmount", () => {
		vi.stubEnv("NEXT_PUBLIC_EVENT_DATETIME", "2026-12-26T18:00:00+07:00");
		vi.setSystemTime(new Date("2026-12-26T17:00:00+07:00"));

		const clearIntervalSpy = vi.spyOn(globalThis, "clearInterval");

		const { unmount } = renderHook(() => useCountdown());
		unmount();

		expect(clearIntervalSpy).toHaveBeenCalled();
		clearIntervalSpy.mockRestore();
	});
});
