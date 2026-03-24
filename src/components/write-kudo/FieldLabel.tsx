interface FieldLabelProps {
	label: string;
	required?: boolean;
}

export function FieldLabel({ label, required }: FieldLabelProps) {
	return (
		<label className="flex items-center gap-[2px] shrink-0">
			<span className="text-[22px] font-bold text-[#00101A] leading-7 font-montserrat">
				{label}
			</span>
			{required && (
				<span className="text-[16px] font-bold text-[#CF1322] leading-5">
					*
				</span>
			)}
		</label>
	);
}
