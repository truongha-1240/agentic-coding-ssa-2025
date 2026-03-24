"use client";

import { useScrollSpy } from "@/hooks/useScrollSpy";
import { TargetIcon } from "@/components/icons/TargetIcon";
import type { AwardDetailCategory } from "@/types/awards";

interface AwardsSidebarProps {
	categories: AwardDetailCategory[];
}

export function AwardsSidebar({ categories }: AwardsSidebarProps) {
	const sectionIds = categories.map((c) => c.slug);
	const activeId = useScrollSpy(sectionIds);

	const handleClick = (
		e: React.MouseEvent<HTMLAnchorElement>,
		slug: string
	) => {
		e.preventDefault();
		const target = document.getElementById(slug);
		if (target) {
			const top = target.getBoundingClientRect().top + window.scrollY - 100;
			window.scrollTo({ top, behavior: "smooth" });
		}
	};

	return (
		<nav
			aria-label="Award categories"
			className="flex flex-row lg:flex-col gap-2 lg:gap-4 w-full lg:w-[178px] lg:sticky lg:top-24 lg:self-start overflow-x-auto lg:overflow-x-visible"
		>
			{categories.map((category) => {
				const isActive = activeId === category.slug;
				return (
					<a
						key={category.slug}
						href={`#${category.slug}`}
						onClick={(e) => handleClick(e, category.slug)}
						aria-current={isActive ? "true" : undefined}
						className={`flex items-center gap-1 p-4 text-sm font-bold leading-5 tracking-[0.25px] whitespace-nowrap transition-all duration-150 ease-in-out ${
							isActive
								? "text-[#FFEA9E] border-b border-[#FFEA9E]"
								: "text-white rounded hover:bg-[rgba(255,234,158,0.1)]"
						}`}
						style={
							isActive
								? {
										textShadow:
											"0 4px 4px rgba(0, 0, 0, 0.25), 0 0 6px #FAE287",
									}
								: undefined
						}
					>
						<TargetIcon className={`w-6 h-6 flex-shrink-0 ${isActive ? "text-[#FFEA9E]" : "text-white"}`} />
						{category.name}
					</a>
				);
			})}
		</nav>
	);
}
