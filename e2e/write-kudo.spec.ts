import { test, expect } from "@playwright/test";

test.describe("Viết Kudo - Write Kudo Modal (Authenticated)", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/sun-kudos");
	});

	test("should open write kudo modal when clicking input bar", async ({ page }) => {
		const inputBar = page.getByPlaceholder(/cảm ơn|ghi nhận|kudos/i);
		await expect(inputBar).toBeVisible();
		await inputBar.click();
		await page.waitForTimeout(500);
		const modal = page.locator('[role="dialog"], [class*="modal"]');
		await expect(modal.first()).toBeVisible();
	});

	test("should display recipient search field in modal", async ({ page }) => {
		const inputBar = page.getByPlaceholder(/cảm ơn|ghi nhận|kudos/i);
		await inputBar.click();
		await page.waitForTimeout(500);
		const recipientField = page.getByPlaceholder(/Tìm kiếm|Search/i);
		await expect(recipientField.first()).toBeVisible();
	});

	test("should display rich text editor with toolbar", async ({ page }) => {
		const inputBar = page.getByPlaceholder(/cảm ơn|ghi nhận|kudos/i);
		await inputBar.click();
		await page.waitForTimeout(500);
		// Bold button in toolbar
		const boldBtn = page.getByText("B").first();
		await expect(boldBtn).toBeVisible();
	});

	test("should display hashtag picker area", async ({ page }) => {
		const inputBar = page.getByPlaceholder(/cảm ơn|ghi nhận|kudos/i);
		await inputBar.click();
		await page.waitForTimeout(500);
		const hashtagArea = page.getByText(/hashtag|#/i);
		await expect(hashtagArea.first()).toBeVisible();
	});

	test("should display cancel and submit buttons", async ({ page }) => {
		const inputBar = page.getByPlaceholder(/cảm ơn|ghi nhận|kudos/i);
		await inputBar.click();
		await page.waitForTimeout(500);
		await expect(page.getByText(/Hủy|Cancel/i).first()).toBeVisible();
		await expect(page.getByText(/Gửi|Submit|Send/i).first()).toBeVisible();
	});

	test("should close modal when clicking cancel", async ({ page }) => {
		const inputBar = page.getByPlaceholder(/cảm ơn|ghi nhận|kudos/i);
		await inputBar.click();
		await page.waitForTimeout(500);
		await page.getByText(/Hủy|Cancel/i).first().click();
		await page.waitForTimeout(300);
		const modal = page.locator('[role="dialog"], [class*="modal"]');
		await expect(modal).not.toBeVisible();
	});

	test("should display anonymous checkbox", async ({ page }) => {
		const inputBar = page.getByPlaceholder(/cảm ơn|ghi nhận|kudos/i);
		await inputBar.click();
		await page.waitForTimeout(500);
		await expect(page.getByText(/ẩn danh|anonymous/i).first()).toBeVisible();
	});
});
