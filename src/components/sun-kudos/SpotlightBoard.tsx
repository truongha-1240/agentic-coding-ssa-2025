"use client";

import { useState, useCallback, useRef } from "react";
import { SectionHeader } from "@/components/sun-kudos/SectionHeader";
import { SpotlightSearch } from "@/components/sun-kudos/SpotlightSearch";
import { PanZoomIcon } from "@/components/icons/PanZoomIcon";
import { SUN_KUDOS_TEXTS } from "@/utils/sun-kudos-data";
import { useSpotlightData } from "@/hooks/useSpotlightData";

export function SpotlightBoard() {
	const { nodes, totalKudos } = useSpotlightData();
	const [searchQuery, setSearchQuery] = useState("");
	const [isPanZoomActive, setIsPanZoomActive] = useState(false);
	const [transform, setTransform] = useState({ scale: 1, x: 0, y: 0 });
	const isDragging = useRef(false);
	const lastPos = useRef({ x: 0, y: 0 });

	const handleMouseDown = useCallback(
		(e: React.MouseEvent) => {
			if (!isPanZoomActive) return;
			isDragging.current = true;
			lastPos.current = { x: e.clientX, y: e.clientY };
		},
		[isPanZoomActive],
	);

	const handleMouseMove = useCallback(
		(e: React.MouseEvent) => {
			if (!isDragging.current || !isPanZoomActive) return;
			const dx = e.clientX - lastPos.current.x;
			const dy = e.clientY - lastPos.current.y;
			lastPos.current = { x: e.clientX, y: e.clientY };
			setTransform((prev) => ({
				...prev,
				x: prev.x + dx,
				y: prev.y + dy,
			}));
		},
		[isPanZoomActive],
	);

	const handleMouseUp = useCallback(() => {
		isDragging.current = false;
	}, []);

	const handleWheel = useCallback(
		(e: React.WheelEvent) => {
			if (!isPanZoomActive) return;
			e.preventDefault();
			const delta = e.deltaY > 0 ? 0.9 : 1.1;
			setTransform((prev) => ({
				...prev,
				scale: Math.max(0.5, Math.min(3, prev.scale * delta)),
			}));
		},
		[isPanZoomActive],
	);

	const lowerQuery = searchQuery.toLowerCase();

	return (
		<div className="flex flex-col items-center gap-8 w-full">
			<SectionHeader title={SUN_KUDOS_TEXTS.sections.spotlightBoard} />

			<div className="w-full rounded-2xl overflow-hidden bg-[rgba(0,16,26,0.9)]">
				{/* Toolbar */}
				<div className="flex justify-between items-center p-4">
					<span className="text-2xl font-bold text-white">
						{totalKudos} KUDOS
					</span>
					<SpotlightSearch value={searchQuery} onChange={setSearchQuery} />
					<button
						type="button"
						onClick={() => setIsPanZoomActive((prev) => !prev)}
						className={`p-1 rounded transition-colors ${
							isPanZoomActive
								? "bg-[rgba(255,234,158,0.2)] text-[var(--color-text-gold)]"
								: "text-white hover:bg-[rgba(255,234,158,0.1)]"
						}`}
						aria-label="Toggle pan and zoom"
						aria-pressed={isPanZoomActive}
					>
						<PanZoomIcon className="w-8 h-8" />
					</button>
				</div>

				{/* Canvas */}
				<div
					className={`relative min-h-[400px] p-4 ${
						isPanZoomActive ? "cursor-grab active:cursor-grabbing" : ""
					}`}
					onMouseDown={handleMouseDown}
					onMouseMove={handleMouseMove}
					onMouseUp={handleMouseUp}
					onMouseLeave={handleMouseUp}
					onWheel={handleWheel}
					role="img"
					aria-label={SUN_KUDOS_TEXTS.aria.spotlightBoard}
				>
					<svg
						width="100%"
						height="400"
						style={{
							transform: `scale(${transform.scale}) translate(${transform.x}px, ${transform.y}px)`,
							transformOrigin: "center center",
						}}
					>
						{nodes.map((node, index) => {
							const fontSize = Math.max(
								12,
								Math.min(36, node.kudosCount / 10),
							);
							const isHighlighted =
								lowerQuery.length > 0 &&
								node.name.toLowerCase().includes(lowerQuery);
							const isGold = index % 2 === 1;
							const baseOpacity =
								lowerQuery.length > 0
									? isHighlighted
										? 1
										: 0.3
									: 0.6 + (node.kudosCount / 100) * 0.4;

							return (
								<text
									key={node.id}
									x={`${node.x}%`}
									y={`${node.y}%`}
									fill={
										isGold
											? "var(--color-text-gold)"
											: "white"
									}
									fontSize={fontSize}
									fontWeight={isHighlighted ? "bold" : "normal"}
									opacity={baseOpacity}
									className="transition-all duration-150 hover:opacity-100 hover:scale-110 cursor-pointer select-none"
									style={{ transformOrigin: `${node.x}% ${node.y}%` }}
								>
									{node.name}
								</text>
							);
						})}
					</svg>
				</div>
			</div>
		</div>
	);
}
