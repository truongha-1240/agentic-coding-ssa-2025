"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "@/i18n";

interface NavLinkItem {
	labelKey: string;
	href: string;
}

const NAV_LINKS: NavLinkItem[] = [
	{ labelKey: "header.aboutSaa", href: "/" },
	{ labelKey: "header.awardsInfo", href: "/awards-information" },
	{ labelKey: "header.sunKudos", href: "/sun-kudos" },
];

export function HeaderNav() {
	const pathname = usePathname();
	const { t } = useTranslation();

	return (
		<nav className="hidden lg:flex items-center gap-1">
			{NAV_LINKS.map((link) => {
				const isActive = pathname === link.href;
				return (
					<Link
						key={link.href}
						href={link.href}
						className={`px-4 py-2 rounded text-base font-medium leading-6 transition-colors duration-150 ${
							isActive
								? "text-[var(--color-text-gold)] underline underline-offset-4"
								: "text-white hover:bg-white/10"
						}`}
					>
						{t(link.labelKey as Parameters<typeof t>[0])}
					</Link>
				);
			})}
		</nav>
	);
}
