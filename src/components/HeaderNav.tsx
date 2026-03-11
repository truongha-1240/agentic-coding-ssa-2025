"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavLink } from "@/types/homepage";

interface HeaderNavProps {
	links: NavLink[];
}

export function HeaderNav({ links }: HeaderNavProps) {
	const pathname = usePathname();

	return (
		<nav className="hidden lg:flex items-center gap-1">
			{links.map((link) => {
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
						{link.label}
					</Link>
				);
			})}
		</nav>
	);
}
