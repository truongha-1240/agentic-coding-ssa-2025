"use client";

export default function LoginError({
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-[#00101A] gap-4">
			<p className="text-white text-lg font-bold font-[family-name:var(--font-montserrat)]">
				Something went wrong
			</p>
			<button
				type="button"
				onClick={reset}
				className="px-6 py-3 bg-[#FFEA9E] text-[#00101A] font-bold rounded-lg cursor-pointer hover:bg-[#FFE070] transition-colors"
			>
				Try again
			</button>
		</div>
	);
}
