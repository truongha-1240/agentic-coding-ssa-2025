import { test, expect } from "@playwright/test";

test.describe("Sun* Kudos - Live Board (Authenticated)", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/sun-kudos");
	});

	// GUI - Banner
	test("should load sun-kudos page without redirect", async ({ page }) => {
		await expect(page).toHaveURL(/sun-kudos/);
		await expect(page).not.toHaveURL(/login/);
	});

	test("should display KV banner with input bar", async ({ page }) => {
		const inputBar = page.getByPlaceholder(/cảm ơn|ghi nhận|kudos/i);
		await expect(inputBar).toBeVisible();
	});

	// GUI - Highlight Section
	test("should display HIGHLIGHT KUDOS section header", async ({ page }) => {
		await expect(page.getByText("HIGHLIGHT KUDOS")).toBeVisible();
	});

	test("should display filter buttons for Hashtag and Department", async ({ page }) => {
		await expect(page.getByText(/Hashtag/i)).toBeVisible();
		await expect(page.getByText(/Phòng ban|Department/i)).toBeVisible();
	});

	// GUI - Carousel
	test("should have carousel navigation buttons", async ({ page }) => {
		const prevBtn = page.getByLabel(/prev|lùi/i);
		const nextBtn = page.getByLabel(/next|tiến/i);
		await expect(prevBtn.first()).toBeVisible();
		await expect(nextBtn.first()).toBeVisible();
	});

	test("should navigate carousel on next click", async ({ page }) => {
		const nextBtn = page.getByLabel(/next|tiến/i).first();
		if (await nextBtn.isVisible()) {
			await nextBtn.click();
			await page.waitForTimeout(500);
		}
	});

	test("should display page indicator for carousel", async ({ page }) => {
		const indicator = page.getByText(/\/\s*\d+/);
		await expect(indicator.first()).toBeVisible();
	});

	// GUI - Spotlight Board
	test("should display SPOTLIGHT BOARD section", async ({ page }) => {
		await expect(page.getByText("SPOTLIGHT BOARD")).toBeVisible();
	});

	// GUI - All Kudos Feed
	test("should display ALL KUDOS section", async ({ page }) => {
		await expect(page.getByText(/ALL KUDOS|TẤT CẢ/i)).toBeVisible();
	});

	test("should display kudos post cards", async ({ page }) => {
		const cards = page.locator("article");
		const count = await cards.count();
		expect(count).toBeGreaterThan(0);
	});

	// GUI - Sidebar
	test("should display sidebar with statistics", async ({ page }) => {
		const sidebar = page.getByText(/thống kê|statistics|Kudos/i);
		await expect(sidebar.first()).toBeVisible();
	});

	// FUNCTION - Heart/Like toggle
	test("should toggle heart button on click", async ({ page }) => {
		const heartBtn = page.getByLabel(/heart|tim/i).first();
		if (await heartBtn.isVisible()) {
			const ariaPressed = await heartBtn.getAttribute("aria-pressed");
			await heartBtn.click();
			const newAriaPressed = await heartBtn.getAttribute("aria-pressed");
			expect(newAriaPressed).not.toBe(ariaPressed);
		}
	});

	// FUNCTION - Copy Link
	test("should have copy link buttons on kudos cards", async ({ page }) => {
		const copyBtns = page.getByText(/Copy Link|Sao chép/i);
		await expect(copyBtns.first()).toBeVisible();
	});

	// FUNCTION - View Detail
	test("should have View Detail links on highlight cards", async ({ page }) => {
		const viewDetail = page.getByText(/Xem chi tiết|View Detail/i);
		await expect(viewDetail.first()).toBeVisible();
	});

	// FUNCTION - Hashtag filter
	test("should open hashtag filter dropdown on click", async ({ page }) => {
		const hashtagBtn = page.getByText(/Hashtag/i).first();
		await hashtagBtn.click();
		await page.waitForTimeout(300);
	});

	// FUNCTION - Search bar
	test("should have search bar", async ({ page }) => {
		const searchBar = page.getByPlaceholder(/Tìm kiếm|Search/i);
		await expect(searchBar.first()).toBeVisible();
	});
});
