interface ArrowRightIconProps {
	className?: string;
}

export function ArrowRightIcon({ className = "w-6 h-6" }: ArrowRightIconProps) {
	return (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
		>
			<path
				d="M4 12H20M20 12L14 6M20 12L14 18"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}
