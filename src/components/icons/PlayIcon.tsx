interface PlayIconProps {
	className?: string;
}

export function PlayIcon({ className = "w-8 h-8" }: PlayIconProps) {
	return (
		<svg
			width="32"
			height="32"
			viewBox="0 0 32 32"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
		>
			<path
				d="M12 8L24 16L12 24V8Z"
				stroke="currentColor"
				strokeWidth="2.5"
				strokeLinejoin="round"
				fill="none"
			/>
		</svg>
	);
}
