"use client";

import {
	createContext,
	useContext,
	useState,
	useEffect,
	useCallback,
	type ReactNode,
} from "react";
import { vi } from "@/i18n/vi";
import { en } from "@/i18n/en";
import type { TranslationKey, Language } from "@/i18n/types";

const translations = { VN: vi, EN: en } as const;

function getNestedValue(obj: Record<string, unknown>, path: string): string {
	const keys = path.split(".");
	let current: unknown = obj;
	for (const key of keys) {
		if (current === null || current === undefined) return path;
		current = (current as Record<string, unknown>)[key];
	}
	return typeof current === "string" ? current : path;
}

interface TranslationContextValue {
	language: Language;
	setLanguage: (lang: Language) => void;
	t: (key: TranslationKey) => string;
}

const TranslationContext = createContext<TranslationContextValue | null>(null);

function getStoredLanguage(): Language {
	if (typeof window === "undefined") return "VN";
	const stored = localStorage.getItem("lang");
	return stored === "EN" ? "EN" : "VN";
}

export function TranslationProvider({ children }: { children: ReactNode }) {
	const [language, setLanguageState] = useState<Language>("VN");

	useEffect(() => {
		setLanguageState(getStoredLanguage());
	}, []);

	const setLanguage = useCallback((lang: Language) => {
		setLanguageState(lang);
		if (typeof window !== "undefined") {
			localStorage.setItem("lang", lang);
		}
	}, []);

	const t = useCallback(
		(key: TranslationKey): string => {
			return getNestedValue(
				translations[language] as unknown as Record<string, unknown>,
				key,
			);
		},
		[language],
	);

	return (
		<TranslationContext.Provider value={{ language, setLanguage, t }}>
			{children}
		</TranslationContext.Provider>
	);
}

export function useTranslation(): TranslationContextValue {
	const context = useContext(TranslationContext);
	if (!context) {
		throw new Error("useTranslation must be used within a TranslationProvider");
	}
	return context;
}
