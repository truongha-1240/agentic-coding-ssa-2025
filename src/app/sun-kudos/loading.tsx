export default function SunKudosLoading() {
	return (
		<div className="min-h-screen bg-[var(--color-bg-primary)] flex flex-col items-center pt-[120px] lg:pt-[176px] px-6 md:px-12 lg:px-36 gap-16 lg:gap-[120px]">
			{/* KV Banner skeleton */}
			<div className="w-full max-w-[1152px] flex flex-col items-center gap-6 animate-pulse">
				<div className="h-6 w-48 bg-white/10 rounded" />
				<div className="h-20 w-80 bg-white/10 rounded" />
				<div className="flex flex-col md:flex-row gap-4 w-full max-w-[700px]">
					<div className="h-[72px] flex-1 bg-white/10 rounded-[68px]" />
					<div className="h-[72px] flex-1 bg-white/10 rounded-[68px]" />
				</div>
			</div>

			{/* Section skeletons */}
			{[1, 2, 3].map((i) => (
				<div key={i} className="w-full max-w-[1152px] animate-pulse">
					<div className="h-5 w-40 bg-white/10 rounded mb-3" />
					<div className="h-px w-full bg-white/10 mb-3" />
					<div className="h-10 w-64 bg-white/10 rounded mb-8" />
					<div className="h-64 w-full bg-white/10 rounded-2xl" />
				</div>
			))}
		</div>
	);
}
