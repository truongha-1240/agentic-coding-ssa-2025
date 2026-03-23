import "@testing-library/jest-dom";
import { vi } from "vitest";

// Mock useTranslation globally — returns the key itself as the translation
// This allows all component tests to work without wrapping in TranslationProvider
vi.mock("@/i18n", () => ({
	useTranslation: () => ({
		t: (key: string) => key,
		language: "VN" as const,
		setLanguage: vi.fn(),
	}),
	TranslationProvider: ({ children }: { children: React.ReactNode }) => children,
}));
