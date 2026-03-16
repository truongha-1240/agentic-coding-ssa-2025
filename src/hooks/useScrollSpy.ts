"use client";

import { useState, useEffect } from "react";

export function useScrollSpy(sectionIds: string[]): string {
	const [activeId, setActiveId] = useState<string>(() => {
		if (typeof window !== "undefined" && window.location.hash) {
			const hash = window.location.hash.slice(1);
			if (sectionIds.includes(hash)) {
				return hash;
			}
		}
		return sectionIds[0] ?? "";
	});

	useEffect(() => {
		if (typeof window !== "undefined" && window.location.hash) {
			const hash = window.location.hash.slice(1);
			const target = document.getElementById(hash);
			if (target) {
				target.scrollIntoView({ behavior: "smooth" });
			}
		}

		const elements = sectionIds
			.map((id) => document.getElementById(id))
			.filter(Boolean) as HTMLElement[];

		if (elements.length === 0) return;

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						setActiveId(entry.target.id);
					}
				}
			},
			{
				threshold: [0, 0.25, 0.5],
				rootMargin: "-96px 0px 0px 0px",
			}
		);

		elements.forEach((el) => observer.observe(el));

		return () => {
			observer.disconnect();
		};
	}, [sectionIds]);

	return activeId;
}
