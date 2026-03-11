import { PenIcon } from "@/components/icons/PenIcon";
import { SaaMiniIcon } from "@/components/icons/SaaMiniIcon";

export function WidgetButton() {
	return (
		<button
			type="button"
			className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 flex items-center justify-center gap-2 w-[90px] h-14 md:w-[106px] md:h-16 rounded-full bg-[var(--color-text-gold)] text-[#00101A] shadow-lg transition-shadow duration-150 hover:shadow-xl focus:outline-2 focus:outline-[var(--color-text-gold)] focus:outline-offset-2"
			aria-label="Quick actions"
		>
			<PenIcon className="w-5 h-5" />
			<span className="text-sm font-bold">/</span>
			<SaaMiniIcon className="w-5 h-5" />
		</button>
	);
}
