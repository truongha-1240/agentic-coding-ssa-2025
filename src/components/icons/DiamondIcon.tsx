interface DiamondIconProps {
	className?: string;
}

export function DiamondIcon({ className }: DiamondIconProps) {
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
				d="M19 3H5L2 9L12 21L22 9L19 3ZM9.62 8L11 5H13L14.38 8H9.62ZM11 10L12 18.5L5.24 10H11ZM13 10H18.76L12 18.5L13 10ZM19.26 8H15.62L14.24 5H17.76L19.26 8ZM6.24 5H9.76L8.38 8H4.74L6.24 5Z"
				fill="currentColor"
			/>
		</svg>
	);
}
