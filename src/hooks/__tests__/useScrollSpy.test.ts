import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useScrollSpy } from "@/hooks/useScrollSpy";

let mockObserve: ReturnType<typeof vi.fn>;
let mockDisconnect: ReturnType<typeof vi.fn>;
let observerCallback: IntersectionObserverCallback;

describe("useScrollSpy", () => {
	const sectionIds = ["top-talent", "top-project", "best-manager"];

	beforeEach(() => {
		mockObserve = vi.fn();
		mockDisconnect = vi.fn();

		vi.stubGlobal(
			"IntersectionObserver",
			class {
				constructor(callback: IntersectionObserverCallback) {
					observerCallback = callback;
				}
				observe = mockObserve;
				unobserve = vi.fn();
				disconnect = mockDisconnect;
				root = null;
				rootMargin = "";
				thresholds = [];
				takeRecords = vi.fn();
			}
		);

		sectionIds.forEach((id) => {
			const el = document.createElement("section");
			el.id = id;
			document.body.appendChild(el);
		});

		Object.defineProperty(window, "location", {
			value: { hash: "" },
			writable: true,
			configurable: true,
		});
	});

	afterEach(() => {
		vi.unstubAllGlobals();
		document.body.innerHTML = "";
	});

	it("returns the first section id as default active", () => {
		const { result } = renderHook(() => useScrollSpy(sectionIds));
		expect(result.current).toBe("top-talent");
	});

	it("creates an IntersectionObserver and observes all sections", () => {
		renderHook(() => useScrollSpy(sectionIds));
		expect(mockObserve).toHaveBeenCalledTimes(3);
	});

	it("updates active section when an entry intersects", () => {
		const { result } = renderHook(() => useScrollSpy(sectionIds));

		act(() => {
			observerCallback(
				[
					{
						target: document.getElementById("top-project")!,
						isIntersecting: true,
						intersectionRatio: 0.5,
					} as unknown as IntersectionObserverEntry,
				],
				{} as IntersectionObserver
			);
		});

		expect(result.current).toBe("top-project");
	});

	it("ignores entries that are not intersecting", () => {
		const { result } = renderHook(() => useScrollSpy(sectionIds));

		act(() => {
			observerCallback(
				[
					{
						target: document.getElementById("best-manager")!,
						isIntersecting: false,
						intersectionRatio: 0,
					} as unknown as IntersectionObserverEntry,
				],
				{} as IntersectionObserver
			);
		});

		expect(result.current).toBe("top-talent");
	});

	it("disconnects observer on unmount", () => {
		const { unmount } = renderHook(() => useScrollSpy(sectionIds));
		unmount();
		expect(mockDisconnect).toHaveBeenCalledTimes(1);
	});

	it("handles initial hash from URL and scrolls to target", () => {
		Object.defineProperty(window, "location", {
			value: { hash: "#top-project" },
			writable: true,
			configurable: true,
		});
		const mockScrollIntoView = vi.fn();
		const target = document.getElementById("top-project");
		if (target) target.scrollIntoView = mockScrollIntoView;

		const { result } = renderHook(() => useScrollSpy(sectionIds));
		expect(result.current).toBe("top-project");
		expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: "smooth" });
	});

	it("defaults to first section for invalid hash", () => {
		Object.defineProperty(window, "location", {
			value: { hash: "#nonexistent" },
			writable: true,
			configurable: true,
		});
		const { result } = renderHook(() => useScrollSpy(sectionIds));
		expect(result.current).toBe("top-talent");
	});
});
