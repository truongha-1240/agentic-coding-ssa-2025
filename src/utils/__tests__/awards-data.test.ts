import { describe, it, expect } from "vitest";
import { AWARD_DETAIL_CATEGORIES } from "@/utils/awards-data";
import type { AwardDetailCategory } from "@/types/awards";

describe("AWARD_DETAIL_CATEGORIES", () => {
	it("contains exactly 6 award categories", () => {
		expect(AWARD_DETAIL_CATEGORIES).toHaveLength(6);
	});

	it("has correct slugs matching homepage award categories", () => {
		const slugs = AWARD_DETAIL_CATEGORIES.map((c) => c.slug);
		expect(slugs).toEqual([
			"signature-2025-creator",
			"top-talent",
			"top-project-leader",
			"best-manager",
			"top-project",
			"mvp",
		]);
	});

	it("has all required fields for each category", () => {
		AWARD_DETAIL_CATEGORIES.forEach((category: AwardDetailCategory) => {
			expect(category.name).toBeTruthy();
			expect(category.slug).toBeTruthy();
			expect(category.description).toBeTruthy();
			expect(category.thumbnailPath).toBeTruthy();
			expect(category.quantity).toBeTruthy();
			expect(category.unit).toBeTruthy();
			expect(category.prizes.length).toBeGreaterThanOrEqual(1);
		});
	});

	it("has correct quantity and unit for each award", () => {
		const data = AWARD_DETAIL_CATEGORIES;
		expect(data[0]).toMatchObject({
			quantity: "01",
			unit: "Cá nhân hoặc tập thể",
		});
		expect(data[1]).toMatchObject({ quantity: "10", unit: "Đơn vị" });
		expect(data[2]).toMatchObject({ quantity: "03", unit: "Cá nhân" });
		expect(data[3]).toMatchObject({ quantity: "01", unit: "Cá nhân" });
		expect(data[4]).toMatchObject({ quantity: "02", unit: "Tập thể" });
		expect(data[5]).toMatchObject({ quantity: "01", unit: "Cá nhân" });
	});

	it("has correct prize values for each award", () => {
		const data = AWARD_DETAIL_CATEGORIES;
		expect(data[0].prizes[0].value).toBe("5.000.000 VNĐ");
		expect(data[1].prizes[0].value).toBe("7.000.000 VNĐ");
		expect(data[2].prizes[0].value).toBe("7.000.000 VNĐ");
		expect(data[3].prizes[0].value).toBe("10.000.000 VNĐ");
		expect(data[4].prizes[0].value).toBe("15.000.000 VNĐ");
		expect(data[5].prizes[0].value).toBe("15.000.000 VNĐ");
	});

	it("has dual-prize layout for Signature 2025 - Creator", () => {
		const signature = AWARD_DETAIL_CATEGORIES[0];
		expect(signature.prizes).toHaveLength(2);
		expect(signature.prizes[0]).toEqual({
			value: "5.000.000 VNĐ",
			note: "cho giải cá nhân",
		});
		expect(signature.prizes[1]).toEqual({
			value: "8.000.000 VNĐ",
			note: "cho giải tập thể",
		});
	});

	it("has thumbnailPath pointing to awards-information directory", () => {
		AWARD_DETAIL_CATEGORIES.forEach((category) => {
			expect(category.thumbnailPath).toMatch(
				/^\/images\/awards-information\//
			);
		});
	});

	it("has non-empty descriptions different from homepage short text", () => {
		AWARD_DETAIL_CATEGORIES.forEach((category) => {
			expect(category.description.length).toBeGreaterThan(50);
		});
	});
});
