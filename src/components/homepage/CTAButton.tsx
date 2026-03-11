import Link from "next/link";
import { ArrowUpRightIcon } from "@/components/icons/ArrowUpRightIcon";

interface CTAButtonProps {
	href: string;
	label: string;
}

export function CTAButton({ href, label }: CTAButtonProps) {
	return (
		<Link
			href={href}
			className="inline-flex items-center justify-center gap-2 rounded-lg px-6 py-4 text-lg md:text-[22px] font-bold leading-7 border border-[#998C5F] bg-[rgba(255,234,158,0.1)] text-white hover:bg-[#FFEA9E] hover:text-[#00101A] hover:border-transparent transition-all duration-150 ease-in-out focus:outline-2 focus:outline-[#FFEA9E] focus:outline-offset-2 w-full md:w-[276px] h-[60px]"
		>
			{label}
			<ArrowUpRightIcon className="w-4 h-4" />
		</Link>
	);
}
