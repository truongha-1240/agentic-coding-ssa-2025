interface DigitCardProps {
	digit: number;
}

export function DigitCard({ digit }: DigitCardProps) {
	return (
		<div
			className="flex items-center justify-center
				w-[50px] h-[80px] md:w-[60px] md:h-[96px] lg:w-[77px] lg:h-[123px]
				rounded-xl opacity-50
				backdrop-blur-[25px]"
			style={{
				background:
					"linear-gradient(180deg, #FFF 0%, rgba(255,255,255,0.10) 100%)",
				border: "0.75px solid rgba(255, 234, 158, 0.5)",
			}}
		>
			<span
				className="text-white text-[44px] md:text-[56px] lg:text-[74px] leading-none"
				style={{ fontFamily: "'Digital Numbers', monospace" }}
			>
				{digit}
			</span>
		</div>
	);
}
