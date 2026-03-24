"use client";

import { useState, useEffect, useCallback } from "react";

const HEADER_OFFSET = 100; // header height + padding

export function useScrollSpy(sectionIds: string[]): string {
	const [activeId, setActiveId] = useState<string>(() => {
		if (typeof window !== "undefined" && window.location.hash) {
			const hash = window.location.hash.slice(1);
			if (sectionIds.includes(hash)) return hash;
		}
		return sectionIds[0] ?? "";
	});

	// Scroll handler — pick the section closest to the top of viewport
	const handleScroll = useCallback(() => {
		let closestId = sectionIds[0] ?? "";
		let closestDistance = Infinity;

		for (const id of sectionIds) {
			const el = document.getElementById(id);
			if (!el) continue;
			const rect = el.getBoundingClientRect();
			const distance = Math.abs(rect.top - HEADER_OFFSET);
			// Section must be at or above the offset line (scrolled into view)
			if (rect.top <= HEADER_OFFSET + 50 && distance < closestDistance) {
				closestDistance = distance;
				closestId = id;
			}
		}

		// If no section is near top yet (all below), pick the first
		if (closestDistance === Infinity) {
			closestId = sectionIds[0] ?? "";
		}

		setActiveId(closestId);
	}, [sectionIds]);

	useEffect(() => {
		// Handle initial hash scroll
		if (typeof window !== "undefined" && window.location.hash) {
			const hash = window.location.hash.slice(1);
			const target = document.getElementById(hash);
			if (target) {
				setTimeout(() => {
					const top = target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
					window.scrollTo({ top, behavior: "smooth" });
				}, 100);
			}
		}

		// Throttled scroll listener
		let ticking = false;
		function onScroll() {
			if (!ticking) {
				requestAnimationFrame(() => {
					handleScroll();
					ticking = false;
				});
				ticking = true;
			}
		}

		window.addEventListener("scroll", onScroll, { passive: true });
		handleScroll(); // initial check

		return () => window.removeEventListener("scroll", onScroll);
	}, [sectionIds, handleScroll]);

	return activeId;
}
