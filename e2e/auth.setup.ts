import { test as setup, expect } from "@playwright/test";

const authFile = "e2e/.auth/user.json";

setup("authenticate via Google OAuth", async ({ page }) => {
	setup.setTimeout(120_000);
	// Go to login page
	await page.goto("/login");
	await expect(page.getByText(/LOGIN With Google/i)).toBeVisible();

	// Click login — this opens Google OAuth
	await page.getByText(/LOGIN With Google/i).click();

	// Wait for Google OAuth flow to complete and redirect back
	// The user will manually log in with their Google account
	// Timeout is 120s to give enough time for manual login
	await page.waitForURL("**/", { timeout: 120_000 });

	// Verify we're authenticated (not on login page anymore)
	await expect(page).not.toHaveURL(/login/);

	// Save authentication state (cookies + localStorage)
	await page.context().storageState({ path: authFile });
});
