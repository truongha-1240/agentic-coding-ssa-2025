interface CountdownTileProps {
	value: number;
	label: string;
}

export function CountdownTile({ value, label }: CountdownTileProps) {
	const displayValue = String(value).padStart(2, "0");
	const digits = displayValue.split("");

	return (
		<div className="flex flex-col gap-3.5 items-start">
			<div
				className="flex flex-row gap-1"
				aria-label={`${value} ${label.toLowerCase()} remaining`}
				role="group"
			>
				{digits.map((digit, index) => (
					<span
						key={index}
						className="flex items-center justify-center w-[36px] h-[52px] md:w-[52px] md:h-[82px] rounded-lg border-[0.5px] border-[#FFEA9E]/50 bg-gradient-to-b from-white/50 to-white/5 backdrop-blur-[17px] text-[32px] md:text-[49px] font-normal text-white font-mono"
					>
						{digit}
					</span>
				))}
			</div>
			<span className="text-base md:text-2xl font-bold leading-8 text-white uppercase">
				{label}
			</span>
		</div>
	);
}
