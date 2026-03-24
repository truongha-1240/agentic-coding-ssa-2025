"use client";

import { useTranslation } from "@/i18n";
import { FieldLabel } from "@/components/write-kudo/FieldLabel";

interface Hashtag {
	id: string;
	name: string;
}

interface HashtagPickerProps {
	selected: string[];
	onToggle: (id: string) => void;
	availableHashtags: Hashtag[];
}

export function HashtagPicker({ selected, onToggle, availableHashtags }: HashtagPickerProps) {
	const { t } = useTranslation();
	const isMaxed = selected.length >= 5;

	return (
		<div className="flex items-start gap-4">
			<FieldLabel label={t("writeKudo.hashtag")} required />
			<div className="flex flex-col gap-2 flex-1">
				<div className="flex flex-wrap gap-2">
					{availableHashtags.map((tag) => {
						const isSelected = selected.includes(tag.id);
						const disabled = !isSelected && isMaxed;
						return (
							<button
								key={tag.id}
								type="button"
								onClick={() => !disabled && onToggle(tag.id)}
								disabled={disabled}
								className={`px-4 py-2 rounded-full border text-sm font-bold font-montserrat transition-colors ${
									isSelected
										? "bg-[#00101A] text-white border-[#00101A]"
										: "bg-white text-[#00101A] border-[#998C5F] hover:bg-[rgba(0,0,0,0.05)]"
								} ${disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
							>
								{tag.name}
							</button>
						);
					})}
				</div>
				<span className="text-[12px] text-[#999] font-montserrat">
					{t("writeKudo.hashtagMax")}
				</span>
			</div>
		</div>
	);
}
