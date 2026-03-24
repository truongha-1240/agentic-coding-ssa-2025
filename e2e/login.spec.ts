import { test, expect } from "@playwright/test";

test.describe("Login Page", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/login");
	});

	test("should display login page", async ({ page }) => {
		await expect(page.locator('[role="banner"]').or(page.locator("header"))).toBeVisible();
	});

	test("should display SAA 2025 logo", async ({ page }) => {
		const logo = page.locator('img[alt*="SAA"]').or(page.locator('img[alt*="Sun"]'));
		await expect(logo.first()).toBeVisible();
	});

	test("should display ROOT FURTHER hero image", async ({ page }) => {
		await expect(page.locator('img[alt*="ROOT FURTHER"]').or(page.getByText(/ROOT FURTHER/i))).toBeVisible();
	});

	test("should display description text", async ({ page }) => {
		await expect(page.getByText("Bắt đầu hành trình của bạn cùng SAA 2025.")).toBeVisible();
	});

	test("should display LOGIN With Google button", async ({ page }) => {
		await expect(page.getByText(/LOGIN With Google/i)).toBeVisible();
	});

	test("should display language selector showing VN", async ({ page }) => {
		await expect(page.getByText("VN")).toBeVisible();
	});

	test("should display footer with copyright", async ({ page }) => {
		const footer = page.locator('[role="contentinfo"]').or(page.locator("footer"));
		await expect(footer).toBeVisible();
		await expect(page.getByText(/Sun\*.*2025/)).toBeVisible();
	});

	test("should open language dropdown and show EN option", async ({ page }) => {
		await page.getByRole("button", { name: "Chọn ngôn ngữ" }).click();
		await expect(page.getByText("EN")).toBeVisible();
	});

	test("should have enabled login button", async ({ page }) => {
		const loginBtn = page.getByText(/LOGIN With Google/i);
		await expect(loginBtn).toBeEnabled();
	});
});
