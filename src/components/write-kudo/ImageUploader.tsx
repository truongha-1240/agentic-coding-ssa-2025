"use client";

import { useRef } from "react";
import Image from "next/image";
import { useTranslation } from "@/i18n";

interface ImageUploaderProps {
	images: File[];
	onAdd: (files: File[]) => void;
	onRemove: (index: number) => void;
}

export function ImageUploader({ images, onAdd, onRemove }: ImageUploaderProps) {
	const { t } = useTranslation();
	const inputRef = useRef<HTMLInputElement>(null);

	function handleFiles(e: React.ChangeEvent<HTMLInputElement>) {
		const files = Array.from(e.target.files || []).filter(
			(f) => f.size <= 5 * 1024 * 1024 && /\.(jpg|jpeg|png|gif)$/i.test(f.name),
		);
		if (files.length > 0) onAdd(files);
		if (inputRef.current) inputRef.current.value = "";
	}

	return (
		<div className="flex items-start gap-4">
			<span className="text-[22px] font-bold text-[#00101A] leading-7 font-montserrat shrink-0">
				{t("writeKudo.image")}
			</span>
			<div className="flex flex-wrap items-center gap-4">
				{images.map((file, i) => (
					<div key={`img-${i}`} className="relative w-20 h-20">
						<Image
							src={URL.createObjectURL(file)}
							alt=""
							width={80}
							height={80}
							className="w-20 h-20 object-cover border border-[#FFEA9E]"
						/>
						<button
							type="button"
							onClick={() => onRemove(i)}
							className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#D4271D] text-white text-xs flex items-center justify-center hover:bg-red-700"
						>
							×
						</button>
					</div>
				))}

				{images.length < 5 && (
					<button
						type="button"
						onClick={() => inputRef.current?.click()}
						className="flex flex-col items-center gap-0.5 px-2 py-1 border border-[#998C5F] text-sm font-bold text-[#00101A] hover:bg-[rgba(0,0,0,0.05)]"
					>
						<span className="flex items-center gap-1">
							<span className="text-lg">+</span>
							{t("writeKudo.addImage")}
						</span>
						<span className="text-[#999] text-xs">{t("writeKudo.imageMax")}</span>
					</button>
				)}

				<input
					ref={inputRef}
					type="file"
					accept="image/jpeg,image/png,image/gif"
					multiple
					onChange={handleFiles}
					className="hidden"
				/>
			</div>
		</div>
	);
}
