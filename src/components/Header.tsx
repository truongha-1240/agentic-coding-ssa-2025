import Image from "next/image";
import { LanguageSelector } from "@/components/LanguageSelector";

interface HeaderProps {
	children?: React.ReactNode;
}

export function Header({ children }: HeaderProps) {
	return (
		<header className="relative z-10 flex justify-between items-center h-auto lg:h-20 px-6 md:px-12 lg:px-36 py-3 bg-[#0B0F12]/80">
			<Image
				src="/images/login/saa-logo.png"
				alt="SAA 2025"
				width={52}
				height={48}
				className="w-10 lg:w-[52px] h-auto"
			/>
			<div className="flex items-center gap-2">
				{children}
				<LanguageSelector />
			</div>
		</header>
	);
}
