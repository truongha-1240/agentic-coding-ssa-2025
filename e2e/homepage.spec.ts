import { test, expect } from "@playwright/test";

test.describe("Homepage SAA (Authenticated)", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/");
	});

	test("should load homepage without redirect to login", async ({ page }) => {
		await expect(page).not.toHaveURL(/login/);
	});

	test("should display header with logo and nav links", async ({ page }) => {
		const header = page.locator('[role="banner"]').or(page.locator("header"));
		await expect(header).toBeVisible();
		await expect(header.locator("img").first()).toBeVisible();
		await expect(page.getByText(/Thông tin giải thưởng|Awards Information/i)).toBeVisible();
		await expect(page.getByText(/Sun\* Kudos/i)).toBeVisible();
	});

	test("should display countdown timer with DAYS, HOURS, MINUTES", async ({ page }) => {
		await expect(page.getByText("DAYS").or(page.getByText("NGÀY"))).toBeVisible();
		await expect(page.getByText("HOURS").or(page.getByText("GIỜ"))).toBeVisible();
		await expect(page.getByText("MINUTES").or(page.getByText("PHÚT"))).toBeVisible();
	});

	test("should display award cards", async ({ page }) => {
		const awardLinks = page.locator('[href*="awards-information"]');
		await expect(awardLinks.first()).toBeVisible();
	});

	test("should display footer with copyright", async ({ page }) => {
		const footer = page.locator('[role="contentinfo"]').or(page.locator("footer"));
		await expect(footer).toBeVisible();
		await expect(footer.getByText(/Sun\*.*2025/)).toBeVisible();
	});

	test("should display language button", async ({ page }) => {
		await expect(page.getByText("VN").or(page.getByText("EN"))).toBeVisible();
	});

	test("should navigate to Awards Information on click", async ({ page }) => {
		await page.getByText(/Thông tin giải thưởng|Awards Information/i).click();
		await expect(page).toHaveURL(/awards-information/);
	});

	test("should navigate to Sun* Kudos on click", async ({ page }) => {
		await page.getByText(/Sun\* Kudos/i).first().click();
		await expect(page).toHaveURL(/sun-kudos/);
	});

	test("should navigate to awards page when clicking award card", async ({ page }) => {
		const awardLink = page.locator('[href*="awards-information"]').first();
		await awardLink.click();
		await expect(page).toHaveURL(/awards-information/);
	});
});
