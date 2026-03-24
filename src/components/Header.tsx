import Image from "next/image";
import { LanguageSelector } from "@/components/LanguageSelector";
import { HeaderNav } from "@/components/HeaderNav";
import { NotificationBellIcon } from "@/components/icons/NotificationBellIcon";

interface HeaderProps {
	children?: React.ReactNode;
	showNotification?: boolean;
}

export function Header({ children, showNotification }: HeaderProps) {
	return (
		<header className="fixed top-0 left-0 right-0 z-10 flex justify-between items-center h-auto lg:h-20 px-6 md:px-12 lg:px-36 py-3 bg-[#0B0F12]/80">
			<div className="flex items-center gap-6">
				<Image
					src="/images/login/saa-logo.png"
					alt="SAA 2025"
					width={52}
					height={48}
					className="w-10 lg:w-[52px] h-auto"
				/>
				<HeaderNav />
			</div>
			<div className="flex items-center gap-2">
				{showNotification && (
					<button
						type="button"
						aria-label="Notifications"
						className="relative w-10 h-10 flex items-center justify-center text-white"
					>
						<NotificationBellIcon className="w-6 h-6" />
						<span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-[var(--color-notification-dot)]" />
					</button>
				)}
				{children}
				<LanguageSelector />
			</div>
		</header>
	);
}
