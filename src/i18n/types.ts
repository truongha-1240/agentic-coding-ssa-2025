import type { vi } from "@/i18n/vi";

type Translations = typeof vi;

type DotPath<T, Prefix extends string = ""> = T extends string
	? Prefix
	: {
			[K in keyof T & string]: DotPath<
				T[K],
				Prefix extends "" ? K : `${Prefix}.${K}`
			>;
		}[keyof T & string];

export type TranslationKey = DotPath<Translations>;
export type Language = "VN" | "EN";
