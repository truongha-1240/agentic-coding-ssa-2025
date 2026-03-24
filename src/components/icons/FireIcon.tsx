interface FireIconProps {
	className?: string;
}

export function FireIcon({ className = "w-6 h-6" }: FireIconProps) {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
		>
			<path
				d="M12 2C10.97 6.28 7 8.5 7 13c0 2.76 2.24 5 5 5s5-2.24 5-5c0-4.5-3.97-6.72-5-11z"
				fill="#FF6B00"
			/>
			<path
				d="M12 18c-1.1 0-2-.9-2-2 0-1.5 2-3.5 2-3.5s2 2 2 3.5c0 1.1-.9 2-2 2z"
				fill="#FFEA9E"
			/>
		</svg>
	);
}
