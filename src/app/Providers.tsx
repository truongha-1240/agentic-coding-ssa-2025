"use client";

import { TranslationProvider } from "@/i18n";

export function Providers({ children }: { children: React.ReactNode }) {
	return <TranslationProvider>{children}</TranslationProvider>;
}
