import Image from "next/image";
import Link from "next/link";
import type { NavLink } from "@/types/homepage";

interface FooterProps {
	showLogo?: boolean;
	navLinks?: NavLink[];
}

export function Footer({ showLogo, navLinks }: FooterProps) {
	return (
		<footer className="relative z-[5] flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 p-6 md:py-8 md:px-12 lg:px-[90px] lg:py-10 border-t border-[#2E3940] bg-[var(--color-bg-primary)]">
			{showLogo && (
				<Image
					src="/images/homepage/saa-logo-footer.png"
					alt="SAA 2025"
					width={69}
					height={64}
					className="w-[69px] h-auto"
				/>
			)}
			{navLinks && (
				<nav className="hidden md:flex items-center">
					{navLinks.map((link) => (
						<Link
							key={link.href}
							href={link.href}
							className="text-base font-bold leading-6 text-white px-4 py-2 hover:text-[var(--color-text-gold)] transition-colors duration-150"
						>
							{link.label}
						</Link>
					))}
				</nav>
			)}
			<p className="text-sm md:text-base font-bold leading-6 text-white font-[family-name:var(--font-montserrat-alternates)]">
				Bản quyền thuộc về Sun* © 2025
			</p>
		</footer>
	);
}
