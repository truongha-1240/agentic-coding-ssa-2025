export default function AwardsInformationLoading() {
	return (
		<div className="relative bg-[var(--color-bg-primary)] min-h-screen">
			{/* Keyvisual skeleton */}
			<div className="absolute top-0 left-0 w-full h-[547px] bg-[#0a1a24] animate-pulse z-[1]" />

			{/* Content skeleton */}
			<div className="relative z-[3] flex flex-col items-start gap-[120px] pt-[176px] pb-24 px-6 lg:px-36">
				{/* Logo skeleton */}
				<div className="w-[338px] h-[150px] bg-[#1a2a34] rounded animate-pulse" />

				{/* Section title skeleton */}
				<div className="flex flex-col gap-4 w-full max-w-[1152px]">
					<div className="w-[300px] h-8 bg-[#1a2a34] rounded animate-pulse mx-auto" />
					<div className="w-full h-px bg-[#2E3940]" />
					<div className="w-[600px] h-16 bg-[#1a2a34] rounded animate-pulse mx-auto" />
				</div>

				{/* Awards layout skeleton */}
				<div className="flex flex-row gap-20 w-full max-w-[1152px]">
					<div className="w-[178px] flex flex-col gap-4">
						{Array.from({ length: 6 }).map((_, i) => (
							<div
								key={i}
								className="h-14 bg-[#1a2a34] rounded animate-pulse"
							/>
						))}
					</div>
					<div className="flex-1 flex flex-col gap-20">
						{Array.from({ length: 3 }).map((_, i) => (
							<div
								key={i}
								className="h-[500px] bg-[#1a2a34] rounded-2xl animate-pulse"
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
