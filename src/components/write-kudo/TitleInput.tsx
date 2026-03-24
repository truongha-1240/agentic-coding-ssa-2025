"use client";

import { useTranslation } from "@/i18n";
import { FieldLabel } from "@/components/write-kudo/FieldLabel";

interface TitleInputProps {
	value: string;
	onChange: (v: string) => void;
}

export function TitleInput({ value, onChange }: TitleInputProps) {
	const { t } = useTranslation();

	return (
		<div className="flex flex-col gap-2">
			<div className="flex items-center gap-4">
				<FieldLabel label={t("writeKudo.titleField")} required />
				<input
					type="text"
					value={value}
					onChange={(e) => onChange(e.target.value)}
					placeholder={t("writeKudo.titlePlaceholder")}
					maxLength={100}
					className="flex-1 bg-white border border-[#998C5F] px-6 py-4 text-[16px] font-bold font-montserrat text-[#00101A] placeholder:text-[#999] outline-none focus:border-[#FFEA9E] focus:border-2"
				/>
			</div>
			<p className="text-[16px] font-bold text-[#999] font-montserrat ml-[146px] whitespace-pre-line">
				{t("writeKudo.titleHelper")}
			</p>
		</div>
	);
}
