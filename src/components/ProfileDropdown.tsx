"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/libs/supabase/client";
import { UserIcon } from "@/components/icons/UserIcon";
import { ChevronRightIcon } from "@/components/icons/ChevronRightIcon";

export function ProfileDropdown() {
	const [isOpen, setIsOpen] = useState(false);
	const [isLoggingOut, setIsLoggingOut] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const router = useRouter();
	const containerRef = useRef<HTMLDivElement>(null);
	const triggerRef = useRef<HTMLButtonElement>(null);
	const menuItemsRef = useRef<HTMLButtonElement[]>([]);

	const closeDropdown = useCallback(() => {
		setIsOpen(false);
		setError(null);
	}, []);

	// Click-outside detection
	useEffect(() => {
		if (!isOpen) return;

		function handleMouseDown(e: MouseEvent) {
			if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
				closeDropdown();
			}
		}

		document.addEventListener("mousedown", handleMouseDown);
		return () => document.removeEventListener("mousedown", handleMouseDown);
	}, [isOpen, closeDropdown]);

	// Keyboard navigation
	function handleKeyDown(e: React.KeyboardEvent) {
		if (e.key === "Escape") {
			closeDropdown();
			triggerRef.current?.focus();
			return;
		}

		if (!isOpen) return;

		const items = menuItemsRef.current.filter(Boolean);
		const currentIndex = items.indexOf(document.activeElement as HTMLButtonElement);

		if (e.key === "ArrowDown") {
			e.preventDefault();
			const nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
			items[nextIndex]?.focus();
		} else if (e.key === "ArrowUp") {
			e.preventDefault();
			const prevIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
			items[prevIndex]?.focus();
		}
	}

	function handleToggle() {
		setIsOpen((prev) => !prev);
		setError(null);
	}

	function handleProfileClick() {
		router.push("/profile");
		closeDropdown();
	}

	async function handleLogoutClick() {
		if (isLoggingOut) return;
		setIsLoggingOut(true);
		setError(null);

		const supabase = createClient();
		const { error: signOutError } = await supabase.auth.signOut();

		if (signOutError) {
			setError(signOutError.message);
			setIsLoggingOut(false);
			return;
		}

		router.push("/login");
	}

	const setMenuItemRef = (index: number) => (el: HTMLButtonElement | null) => {
		if (el) menuItemsRef.current[index] = el;
	};

	return (
		<div ref={containerRef} className="relative" onKeyDown={handleKeyDown}>
			<button
				ref={triggerRef}
				type="button"
				aria-label="Profile menu"
				aria-haspopup="true"
				aria-expanded={isOpen}
				onClick={handleToggle}
				className="flex items-center justify-center w-10 h-10 rounded-full cursor-pointer transition-colors duration-150 ease-in-out hover:bg-white/10 focus:outline-2 focus:outline-white/50 focus:outline-offset-2 text-white"
			>
				<UserIcon className="w-6 h-6" />
			</button>

			{isOpen && (
				<div
					role="menu"
					className="absolute right-0 top-full mt-2 flex flex-col p-1.5 bg-[var(--color-dropdown-bg)] border border-[var(--color-dropdown-border)] rounded-lg z-50 transition-all duration-150 ease-out"
				>
					<button
						ref={setMenuItemRef(0)}
						role="menuitem"
						tabIndex={0}
						onClick={handleProfileClick}
						className="flex items-center gap-1 p-4 rounded-[4px] cursor-pointer transition-all duration-150 ease-in-out text-base font-bold leading-6 tracking-[0.15px] text-white hover:bg-[var(--color-dropdown-item-hover)] hover:[text-shadow:var(--shadow-text-glow)] focus:outline-2 focus:outline-[var(--color-dropdown-border)] focus:outline-offset-2"
					>
						<span>Profile</span>
						<UserIcon className="w-6 h-6" />
					</button>

					<button
						ref={setMenuItemRef(1)}
						role="menuitem"
						tabIndex={0}
						onClick={handleLogoutClick}
						aria-disabled={isLoggingOut}
						className="flex items-center gap-1 p-4 rounded-[4px] cursor-pointer transition-all duration-150 ease-in-out text-base font-bold leading-6 tracking-[0.15px] text-white hover:bg-[var(--color-dropdown-item-hover)] hover:[text-shadow:var(--shadow-text-glow)] focus:outline-2 focus:outline-[var(--color-dropdown-border)] focus:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed aria-disabled:opacity-50 aria-disabled:cursor-not-allowed"
					>
						<span>Logout</span>
						<ChevronRightIcon className="w-6 h-6" />
					</button>

					{error && (
						<p
							role="alert"
							className="px-4 py-2 text-sm text-[var(--color-error)]"
						>
							{error}
						</p>
					)}
				</div>
			)}
		</div>
	);
}
