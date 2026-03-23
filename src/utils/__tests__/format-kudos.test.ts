import { describe, it, expect } from "vitest";
import { formatHeartCount, formatTimestamp } from "@/utils/format-kudos";

describe("formatHeartCount", () => {
	it("returns '0' for zero", () => {
		expect(formatHeartCount(0)).toBe("0");
	});

	it("returns number as-is when below 1000", () => {
		expect(formatHeartCount(999)).toBe("999");
	});

	it("formats 1000 with comma separator", () => {
		expect(formatHeartCount(1000)).toBe("1,000");
	});

	it("formats large numbers with comma separators", () => {
		expect(formatHeartCount(10000)).toBe("10,000");
		expect(formatHeartCount(1000000)).toBe("1,000,000");
	});
});

describe("formatTimestamp", () => {
	it("formats a Date object to HH:mm - MM/DD/YYYY", () => {
		const date = new Date(2025, 9, 30, 16, 0); // Oct 30, 2025 16:00
		expect(formatTimestamp(date)).toBe("16:00 - 10/30/2025");
	});

	it("formats an ISO string to HH:mm - MM/DD/YYYY", () => {
		const result = formatTimestamp("2025-10-30T16:00:00.000Z");
		// The exact output depends on timezone, but format should match HH:mm - MM/DD/YYYY
		expect(result).toMatch(/^\d{2}:\d{2} - \d{2}\/\d{2}\/\d{4}$/);
	});

	it("pads single-digit hours, minutes, months, and days", () => {
		const date = new Date(2025, 0, 5, 9, 3); // Jan 5, 2025 09:03
		expect(formatTimestamp(date)).toBe("09:03 - 01/05/2025");
	});

	it("handles midnight correctly", () => {
		const date = new Date(2025, 5, 15, 0, 0); // Jun 15, 2025 00:00
		expect(formatTimestamp(date)).toBe("00:00 - 06/15/2025");
	});
});
