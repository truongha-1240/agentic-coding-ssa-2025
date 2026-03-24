import { defineConfig, devices } from "@playwright/test";

const authFile = "e2e/.auth/user.json";

export default defineConfig({
	testDir: "./e2e",
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: "html",
	use: {
		baseURL: process.env.BASE_URL || "http://localhost:3000",
		trace: "on-first-retry",
		screenshot: "only-on-failure",
	},
	projects: [
		// 1. Auth setup — opens browser for manual Google login, saves session
		{
			name: "setup",
			testMatch: /auth\.setup\.ts/,
		},
		// 2. Login page tests — no auth needed
		{
			name: "no-auth",
			testMatch: /login\.spec\.ts/,
			use: { ...devices["Desktop Chrome"] },
		},
		// 3. All other tests — use saved auth session
		{
			name: "chromium",
			testIgnore: /login\.spec\.ts/,
			use: {
				...devices["Desktop Chrome"],
				storageState: authFile,
			},
			dependencies: ["setup"],
		},
	],
	webServer: {
		command: "npm run dev",
		url: "http://localhost:3000",
		reuseExistingServer: !process.env.CI,
	},
});
