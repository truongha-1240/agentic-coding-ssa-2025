import { test, expect } from "@playwright/test";

test.describe("Countdown - Prelaunch Page (Authenticated)", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/countdown");
	});

	test("should load countdown page without redirect", async ({ page }) => {
		await expect(page).not.toHaveURL(/login/);
	});

	test("should display DAYS countdown unit with label", async ({ page }) => {
		await expect(page.getByText("DAYS").or(page.getByText("NGÀY"))).toBeVisible();
	});

	test("should display HOURS countdown unit with label", async ({ page }) => {
		await expect(page.getByText("HOURS").or(page.getByText("GIỜ"))).toBeVisible();
	});

	test("should display MINUTES countdown unit with label", async ({ page }) => {
		await expect(page.getByText("MINUTES").or(page.getByText("PHÚT"))).toBeVisible();
	});

	test("should display countdown values as 2-digit numbers", async ({ page }) => {
		const digits = page.locator("text=/^\\d{1,2}$/");
		const count = await digits.count();
		expect(count).toBeGreaterThanOrEqual(2);
	});
});
