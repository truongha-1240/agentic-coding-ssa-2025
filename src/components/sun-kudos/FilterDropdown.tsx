"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronDownIcon } from "@/components/icons/ChevronDownIcon";

interface FilterItem {
	id: string;
	name: string;
}

interface FilterDropdownProps {
	label: string;
	items: FilterItem[];
	selectedId: string | null;
	onSelect: (id: string | null) => void;
}

export function FilterDropdown({
	label,
	items,
	selectedId,
	onSelect,
}: FilterDropdownProps) {
	const [isOpen, setIsOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);
	const triggerRef = useRef<HTMLButtonElement>(null);
	const optionsRef = useRef<HTMLLIElement[]>([]);

	const closeDropdown = useCallback(() => {
		setIsOpen(false);
	}, []);

	// Click-outside detection
	useEffect(() => {
		if (!isOpen) return;

		function handleMouseDown(e: MouseEvent) {
			if (
				containerRef.current &&
				!containerRef.current.contains(e.target as Node)
			) {
				closeDropdown();
			}
		}

		document.addEventListener("mousedown", handleMouseDown);
		return () => document.removeEventListener("mousedown", handleMouseDown);
	}, [isOpen, closeDropdown]);

	function handleKeyDown(e: React.KeyboardEvent) {
		if (e.key === "Escape") {
			closeDropdown();
			triggerRef.current?.focus();
			return;
		}

		if (!isOpen) return;

		const visibleItems = optionsRef.current.filter(Boolean);
		const currentIndex = visibleItems.indexOf(
			document.activeElement as HTMLLIElement,
		);

		if (e.key === "ArrowDown") {
			e.preventDefault();
			const nextIndex =
				currentIndex < visibleItems.length - 1 ? currentIndex + 1 : 0;
			visibleItems[nextIndex]?.focus();
		} else if (e.key === "ArrowUp") {
			e.preventDefault();
			const prevIndex =
				currentIndex > 0 ? currentIndex - 1 : visibleItems.length - 1;
			visibleItems[prevIndex]?.focus();
		} else if (e.key === "Enter") {
			e.preventDefault();
			if (currentIndex >= 0) {
				const itemId = visibleItems[currentIndex]?.dataset.itemId;
				if (itemId !== undefined) {
					handleSelect(itemId === "" ? null : itemId);
				}
			}
		}
	}

	function handleToggle() {
		setIsOpen((prev) => !prev);
	}

	function handleSelect(id: string | null) {
		onSelect(id);
		closeDropdown();
		triggerRef.current?.focus();
	}

	const setOptionRef = (index: number) => (el: HTMLLIElement | null) => {
		if (el) optionsRef.current[index] = el;
	};

	const selectedItem = items.find((item) => item.id === selectedId);
	const displayLabel = selectedItem ? selectedItem.name : label;

	return (
		<div ref={containerRef} className="relative" onKeyDown={handleKeyDown}>
			<button
				ref={triggerRef}
				type="button"
				aria-haspopup="listbox"
				aria-expanded={isOpen}
				onClick={handleToggle}
				className="flex items-center gap-1 px-4 py-2 rounded text-white font-bold cursor-pointer hover:bg-white/10 focus:outline-2 focus:outline-[var(--color-text-gold)] focus:outline-offset-2 transition-colors duration-150"
			>
				<span>{displayLabel}</span>
				<ChevronDownIcon className="w-4 h-4" />
			</button>

			{isOpen && (
				<ul
					role="listbox"
					aria-label={label}
					className="absolute right-0 top-full mt-2 min-w-[180px] bg-[var(--color-dropdown-bg)] border border-[var(--color-dropdown-border)] rounded-lg z-20 max-h-60 overflow-y-auto py-1"
				>
					<li
						ref={setOptionRef(0)}
						role="option"
						aria-selected={selectedId === null}
						data-item-id=""
						tabIndex={0}
						onClick={() => handleSelect(null)}
						className={`px-4 py-2 cursor-pointer text-sm text-white transition-colors duration-150 hover:bg-[var(--color-dropdown-item-hover)] focus:outline-2 focus:outline-[var(--color-dropdown-border)] focus:outline-offset-[-2px] ${
							selectedId === null ? "font-bold" : ""
						}`}
					>
						All
					</li>
					{items.map((item, index) => (
						<li
							key={item.id}
							ref={setOptionRef(index + 1)}
							role="option"
							aria-selected={selectedId === item.id}
							data-item-id={item.id}
							tabIndex={0}
							onClick={() => handleSelect(item.id)}
							className={`px-4 py-2 cursor-pointer text-sm text-white transition-colors duration-150 hover:bg-[var(--color-dropdown-item-hover)] focus:outline-2 focus:outline-[var(--color-dropdown-border)] focus:outline-offset-[-2px] ${
								selectedId === item.id ? "font-bold" : ""
							}`}
						>
							{item.name}
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
