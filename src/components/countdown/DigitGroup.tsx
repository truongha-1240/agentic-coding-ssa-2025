import { DigitCard } from "@/components/countdown/DigitCard";

interface DigitGroupProps {
	value: number;
	label: string;
}

export function DigitGroup({ value, label }: DigitGroupProps) {
	const tens = Math.floor(value / 10) % 10;
	const units = value % 10;

	return (
		<div
			className="flex flex-col items-center gap-[21px]"
			aria-label={`${value} ${label.toLowerCase()} remaining`}
		>
			<div className="flex items-center gap-[21px]">
				<DigitCard digit={tens} />
				<DigitCard digit={units} />
			</div>
			<span className="text-white font-bold text-[20px] md:text-[28px] lg:text-[36px] leading-[48px] tracking-normal font-montserrat">
				{label}
			</span>
		</div>
	);
}
