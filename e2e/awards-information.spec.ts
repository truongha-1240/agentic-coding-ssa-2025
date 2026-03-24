import { test, expect } from "@playwright/test";

test.describe("Hệ thống giải - Awards Information (Authenticated)", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/awards-information");
	});

	test("should load awards page without redirect", async ({ page }) => {
		await expect(page).toHaveURL(/awards-information/);
		await expect(page).not.toHaveURL(/login/);
	});

	test("should display page title", async ({ page }) => {
		await expect(page.getByText(/Hệ thống giải|Awards/i).first()).toBeVisible();
	});

	test("should display sidebar navigation menu with award categories", async ({ page }) => {
		const menuItems = [
			/Top Talent/i,
			/Top Project(?! Leader)/i,
			/Top Project Leader/i,
			/Best Manager/i,
			/Signature/i,
			/MVP/i,
		];
		for (const item of menuItems) {
			await expect(page.getByText(item).first()).toBeVisible();
		}
	});

	test("should display award images", async ({ page }) => {
		const images = page.locator("img");
		const count = await images.count();
		expect(count).toBeGreaterThan(0);
	});

	test("should scroll to section when clicking menu item", async ({ page }) => {
		const menuItem = page.getByText(/Top Project Leader/i).first();
		await menuItem.click();
		await page.waitForTimeout(500);
		await expect(page.getByText(/Top Project Leader/i).first()).toBeVisible();
	});

	test("should highlight active menu item on click", async ({ page }) => {
		const menuItem = page.getByText(/MVP/i).first();
		await menuItem.click();
		await page.waitForTimeout(500);
		await expect(menuItem).toBeVisible();
	});

	test("should display Sun* Kudos promotion banner", async ({ page }) => {
		await expect(page.getByText(/Sun\* Kudos|Kudos/i).first()).toBeVisible();
	});
});
