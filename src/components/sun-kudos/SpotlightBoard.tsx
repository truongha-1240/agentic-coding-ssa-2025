"use client";

import { useState, useCallback, useRef, useMemo, useEffect } from "react";
import { SectionHeader } from "@/components/sun-kudos/SectionHeader";
import { SearchIcon } from "@/components/icons/SearchIcon";
import { useTranslation } from "@/i18n";
import { useSpotlightData } from "@/hooks/useSpotlightData";

export function SpotlightBoard() {
	const { t } = useTranslation();
	const { nodes, totalKudos } = useSpotlightData();
	const [searchQuery, setSearchQuery] = useState("");
	const [transform, setTransform] = useState({ scale: 1, x: 0, y: 0 });
	const containerRef = useRef<HTMLDivElement>(null);
	const [isFullscreen, setIsFullscreen] = useState(false);

	useEffect(() => {
		const handleChange = () => {
			setIsFullscreen(!!document.fullscreenElement);
		};
		document.addEventListener("fullscreenchange", handleChange);
		return () => document.removeEventListener("fullscreenchange", handleChange);
	}, []);

	const lowerQuery = searchQuery.toLowerCase();

	// Generate random connections between nodes
	const connections = useMemo(() => {
		if (nodes.length < 2) return [];
		const lines: { x1: number; y1: number; x2: number; y2: number }[] = [];
		for (let i = 0; i < nodes.length; i++) {
			const connectCount = Math.min(3, Math.floor(Math.random() * 4) + 1);
			for (let j = 0; j < connectCount; j++) {
				const target = (i + j + 1) % nodes.length;
				lines.push({
					x1: nodes[i].x,
					y1: nodes[i].y,
					x2: nodes[target].x,
					y2: nodes[target].y,
				});
			}
		}
		return lines;
	}, [nodes]);

	// No drag-to-pan — content stays fixed. Only zoom buttons work.

	const zoomIn = () =>
		setTransform((prev) => ({
			...prev,
			scale: Math.min(5, prev.scale * 1.3),
		}));
	const zoomOut = () =>
		setTransform((prev) => ({
			...prev,
			scale: Math.max(0.3, prev.scale / 1.3),
		}));
	const resetZoom = () => setTransform({ scale: 1, x: 0, y: 0 });

	return (
		<div className="flex flex-col items-center gap-8 w-full">
			<SectionHeader title={t("sections.spotlightBoard")} />

			{/* Main container with rounded corners and dark bg */}
			<div
				ref={containerRef}
				className="relative w-full rounded-2xl overflow-hidden border border-[var(--color-border-gold)]"
				style={{
					background:
						"linear-gradient(180deg, rgba(0,16,26,0.95) 0%, rgba(0,16,26,0.98) 100%)",
					minHeight: "600px",
				}}
			>
				{/* Background KV image overlay */}
				<div
					className="absolute inset-0 opacity-20 pointer-events-none"
					style={{
						backgroundImage: "url(/images/sun-kudos/keyvisual.png)",
						backgroundSize: "cover",
						backgroundPosition: "center",
					}}
				/>

				{/* Top: Search + Kudos Count */}
				<div className="relative z-10 flex items-start justify-between p-6">
					{/* Search input - top left */}
					<div className="flex items-center gap-2 bg-white/5 border border-[var(--color-border-gold)] rounded-lg px-3 py-2 w-[200px]">
						<SearchIcon className="w-4 h-4 text-white/70" />
						<input
							type="text"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							placeholder="Tìm kiếm"
							className="bg-transparent text-white text-sm outline-none w-full placeholder:text-white/60"
						/>
					</div>
				</div>

				{/* Center: KUDOS count - large */}
				<div className="absolute top-6 left-1/2 -translate-x-1/2 z-10 text-center">
					<span className="text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tight">
						+{totalKudos}
					</span>
					<span className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight ml-4">
						KUDOS
					</span>
				</div>

				{/* SVG Canvas with names + connections */}
				<div
					className="relative z-[5]"
					style={{ height: "500px" }}
					role="img"
					aria-label={t("aria.spotlightBoard")}
				>
					<svg
						width="100%"
						height="100%"
						style={{
							transform: `scale(${transform.scale}) translate(${transform.x}px, ${transform.y}px)`,
							transformOrigin: "center center",
						}}
					>
						{/* Network connection lines */}
						{connections.map((line, i) => (
							<line
								key={`line-${i}`}
								x1={`${line.x1}%`}
								y1={`${line.y1}%`}
								x2={`${line.x2}%`}
								y2={`${line.y2}%`}
								stroke="rgba(255,255,255,0.06)"
								strokeWidth="0.5"
							/>
						))}

						{/* Name nodes */}
						{nodes.map((node, index) => {
							const fontSize = Math.max(
								10,
								Math.min(22, 10 + node.kudosCount / 5),
							);
							const isHighlighted =
								lowerQuery.length > 0 &&
								node.name.toLowerCase().includes(lowerQuery);
							const isGold = index % 3 === 0;
							const baseOpacity =
								lowerQuery.length > 0
									? isHighlighted
										? 1
										: 0.2
									: 0.8 + (node.kudosCount / 100) * 0.2;

							return (
								<text
									key={node.id}
									x={`${node.x}%`}
									y={`${node.y}%`}
									fill={isGold ? "#FFEA9E" : "white"}
									fontSize={fontSize}
									fontWeight={
										isHighlighted
											? "bold"
											: node.kudosCount > 50
												? "600"
												: "normal"
									}
									opacity={baseOpacity}
									className="transition-all duration-200 hover:opacity-100 cursor-pointer select-none"
									style={{
										transformOrigin: `${node.x}% ${node.y}%`,
									}}
								>
									{node.name}
								</text>
							);
						})}

						{/* Dots at each node position */}
						{nodes.map((node) => (
							<circle
								key={`dot-${node.id}`}
								cx={`${node.x}%`}
								cy={`${node.y}%`}
								r="2"
								fill="rgba(255,255,255,0.2)"
							/>
						))}
					</svg>
				</div>

				{/* Live feed overlay - bottom left */}
				<div className="absolute bottom-4 left-6 z-10 flex flex-col gap-1 max-w-[400px]">
					{nodes.slice(0, 7).map((node) => (
						<div
							key={`feed-${node.id}`}
							className="text-xs text-white/70 flex gap-2"
						>
							<span className="text-white/40 font-mono">
								{String(Math.floor(Math.random() * 24)).padStart(2, "0")}:
								{String(Math.floor(Math.random() * 60)).padStart(2, "0")}
							</span>
							<span className="font-bold text-white/90">{node.name}</span>
							<span>received a new Kudos</span>
						</div>
					))}
				</div>

				{/* Zoom controls - right side */}
				<div className="absolute right-4 bottom-1/4 z-10 flex flex-col gap-2">
					<button
						type="button"
						onClick={zoomIn}
						className="w-8 h-8 rounded bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-lg transition-colors"
						aria-label="Zoom in"
					>
						+
					</button>
					<button
						type="button"
						onClick={zoomOut}
						className="w-8 h-8 rounded bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-lg transition-colors"
						aria-label="Zoom out"
					>
						−
					</button>
					<button
						type="button"
						onClick={resetZoom}
						className="w-8 h-8 rounded bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-xs font-bold transition-colors"
						aria-label="Reset zoom"
					>
						1x
					</button>
					<button
						type="button"
						onClick={() => {
							if (isFullscreen) {
								document.exitFullscreen?.();
							} else {
								containerRef.current?.requestFullscreen?.();
							}
						}}
						className="w-8 h-8 rounded bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
						aria-label={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
					>
						<svg
							width="16"
							height="16"
							viewBox="0 0 16 16"
							fill="none"
						>
							{isFullscreen ? (
								<path
									d="M6 2v4H2M10 2v4h4M6 14v-4H2M10 14v-4h4"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							) : (
								<path
									d="M2 6V2h4M10 2h4v4M14 10v4h-4M6 14H2v-4"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							)}
						</svg>
					</button>
				</div>
			</div>
		</div>
	);
}
