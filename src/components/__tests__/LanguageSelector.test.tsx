import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// Override the global mock for LanguageSelector tests — we need the real useTranslation behavior
vi.unmock("@/i18n");

// Mock the i18n module with controlled state for testing
const mockSetLanguage = vi.fn();
vi.mock("@/i18n", () => {
	let currentLang = "VN";
	return {
		useTranslation: () => ({
			t: (key: string) => key,
			language: currentLang as "VN" | "EN",
			setLanguage: (lang: string) => {
				currentLang = lang;
				mockSetLanguage(lang);
			},
		}),
		TranslationProvider: ({ children }: { children: React.ReactNode }) => children,
	};
});

beforeEach(() => {
	mockSetLanguage.mockClear();
});

describe("LanguageSelector", () => {
	it("renders trigger with VN text by default", async () => {
		const { LanguageSelector } = await import("@/components/LanguageSelector");
		render(<LanguageSelector />);

		const trigger = screen.getByRole("button", { name: /aria\.selectLanguage/i });
		expect(trigger).toBeInTheDocument();
		expect(trigger).toHaveAttribute("aria-expanded", "false");
		expect(screen.getByText("VN")).toBeInTheDocument();
	});

	it("opens dropdown with 2 options on click", async () => {
		const user = userEvent.setup();
		const { LanguageSelector } = await import("@/components/LanguageSelector");
		render(<LanguageSelector />);

		await user.click(screen.getByRole("button", { name: /aria\.selectLanguage/i }));

		const listbox = screen.getByRole("listbox");
		expect(listbox).toBeInTheDocument();

		const options = screen.getAllByRole("option");
		expect(options).toHaveLength(2);
		expect(options[0]).toHaveTextContent("VN");
		expect(options[1]).toHaveTextContent("EN");
	});

	it("shows selected option with aria-selected", async () => {
		const user = userEvent.setup();
		const { LanguageSelector } = await import("@/components/LanguageSelector");
		render(<LanguageSelector />);

		await user.click(screen.getByRole("button", { name: /aria\.selectLanguage/i }));

		const options = screen.getAllByRole("option");
		expect(options[0]).toHaveAttribute("aria-selected", "true");
		expect(options[1]).toHaveAttribute("aria-selected", "false");
	});

	it("calls setLanguage when option selected", async () => {
		const user = userEvent.setup();
		const { LanguageSelector } = await import("@/components/LanguageSelector");
		render(<LanguageSelector />);

		await user.click(screen.getByRole("button", { name: /aria\.selectLanguage/i }));
		await user.click(screen.getByRole("option", { name: /EN/i }));

		expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
		expect(mockSetLanguage).toHaveBeenCalledWith("EN");
	});

	it("closes dropdown on click outside", async () => {
		const user = userEvent.setup();
		const { LanguageSelector } = await import("@/components/LanguageSelector");
		render(
			<div>
				<LanguageSelector />
				<div data-testid="outside">Outside</div>
			</div>,
		);

		await user.click(screen.getByRole("button", { name: /aria\.selectLanguage/i }));
		expect(screen.getByRole("listbox")).toBeInTheDocument();

		await user.click(screen.getByTestId("outside"));
		expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
	});

	it("closes dropdown on Escape key", async () => {
		const user = userEvent.setup();
		const { LanguageSelector } = await import("@/components/LanguageSelector");
		render(<LanguageSelector />);

		await user.click(screen.getByRole("button", { name: /aria\.selectLanguage/i }));
		expect(screen.getByRole("listbox")).toBeInTheDocument();

		await user.keyboard("{Escape}");
		expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
	});
});
