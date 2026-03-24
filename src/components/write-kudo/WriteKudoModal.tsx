"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useTranslation } from "@/i18n";
import { createClient } from "@/libs/supabase/client";
import { useWriteKudo } from "@/hooks/useWriteKudo";
import { useRecipientSearch } from "@/hooks/useRecipientSearch";
import { RecipientSearch } from "@/components/write-kudo/RecipientSearch";
import { TitleInput } from "@/components/write-kudo/TitleInput";
import { RichTextEditor } from "@/components/write-kudo/RichTextEditor";
import { HashtagPicker } from "@/components/write-kudo/HashtagPicker";
import { ImageUploader } from "@/components/write-kudo/ImageUploader";

interface WriteKudoModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSuccess?: () => void;
}

interface Hashtag {
	id: string;
	name: string;
}

export function WriteKudoModal({ isOpen, onClose, onSuccess }: WriteKudoModalProps) {
	const { t } = useTranslation();
	const modalRef = useRef<HTMLDivElement>(null);
	const [searchQuery, setSearchQuery] = useState("");
	const [hashtags, setHashtags] = useState<Hashtag[]>([]);
	const { results: searchResults, isSearching } = useRecipientSearch(searchQuery);

	const form = useWriteKudo();

	// Fetch hashtags on mount
	useEffect(() => {
		if (!isOpen) return;
		const supabase = createClient();
		supabase.from("hashtags").select("id, name").then(({ data }) => {
			if (data) setHashtags(data);
		});
	}, [isOpen]);

	// Escape to close
	useEffect(() => {
		if (!isOpen) return;
		function handleEscape(e: KeyboardEvent) {
			if (e.key === "Escape") onClose();
		}
		document.addEventListener("keydown", handleEscape);
		return () => document.removeEventListener("keydown", handleEscape);
	}, [isOpen, onClose]);

	// Focus trap
	useEffect(() => {
		if (!isOpen || !modalRef.current) return;
		const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
			'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
		);
		const first = focusableElements[0];
		const last = focusableElements[focusableElements.length - 1];

		function trapFocus(e: KeyboardEvent) {
			if (e.key !== "Tab") return;
			if (e.shiftKey) {
				if (document.activeElement === first) {
					e.preventDefault();
					last?.focus();
				}
			} else {
				if (document.activeElement === last) {
					e.preventDefault();
					first?.focus();
				}
			}
		}
		document.addEventListener("keydown", trapFocus);
		first?.focus();
		return () => document.removeEventListener("keydown", trapFocus);
	}, [isOpen]);

	const handleSubmit = useCallback(async () => {
		const kudoId = await form.submit();
		if (kudoId) {
			onSuccess?.();
			onClose();
		}
	}, [form, onSuccess, onClose]);

	if (!isOpen) return null;

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center"
			role="dialog"
			aria-modal="true"
			aria-labelledby="write-kudo-title"
		>
			{/* Backdrop */}
			<div
				className="absolute inset-0 bg-[rgba(0,16,26,0.8)]"
				onClick={onClose}
				aria-hidden="true"
			/>

			{/* Modal */}
			<div
				ref={modalRef}
				className="relative bg-[#FFF8E1] rounded-3xl p-10 w-full max-w-[752px] max-h-[90vh] overflow-y-auto mx-4 flex flex-col gap-8 md:p-10 sm:p-6"
			>
				{/* Title */}
				<h2
					id="write-kudo-title"
					className="text-[32px] font-bold text-[#00101A] text-center leading-10 font-montserrat md:text-[28px] sm:text-[24px]"
				>
					{t("writeKudo.title")}
				</h2>

				{/* Recipient */}
				<RecipientSearch
					value={form.recipientId}
					selectedName={form.recipientName}
					onChange={(id, name) => {
						form.setField("recipientId", id || null);
						form.setField("recipientName", name);
					}}
					searchResults={searchResults}
					onSearch={setSearchQuery}
					isSearching={isSearching}
				/>

				{/* Title field */}
				<TitleInput
					value={form.title}
					onChange={(v) => form.setField("title", v)}
				/>

				{/* Rich Text Editor */}
				<RichTextEditor
					content={form.content}
					onChange={(html) => form.setField("content", html)}
				/>

				{/* Hashtags */}
				<HashtagPicker
					selected={form.selectedHashtags}
					onToggle={(id) => {
						if (form.selectedHashtags.includes(id)) {
							form.removeHashtag(id);
						} else {
							form.addHashtag(id);
						}
					}}
					availableHashtags={hashtags}
				/>

				{/* Images */}
				<ImageUploader
					images={form.images}
					onAdd={form.addImages}
					onRemove={form.removeImage}
				/>

				{/* Anonymous */}
				<label className="flex items-center gap-4 cursor-pointer">
					<input
						type="checkbox"
						checked={form.isAnonymous}
						onChange={(e) => form.setField("isAnonymous", e.target.checked)}
						className="w-6 h-6 border border-[#998C5F] bg-white rounded accent-[#FFEA9E]"
					/>
					<span className="text-[22px] font-bold text-[#999] leading-7 font-montserrat">
						{t("writeKudo.anonymous")}
					</span>
				</label>

				{/* Error */}
				{form.errors.submit && (
					<p className="text-[#CF1322] text-sm font-bold">{form.errors.submit}</p>
				)}

				{/* Actions */}
				<div className="flex gap-6">
					<button
						type="button"
						onClick={() => {
							form.reset();
							onClose();
						}}
						className="flex items-center gap-2 border border-[#998C5F] px-10 py-4 font-bold text-[16px] text-[#00101A] font-montserrat hover:bg-[rgba(0,0,0,0.05)]"
					>
						{t("writeKudo.cancel")}
						<svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
					</button>
					<button
						type="button"
						onClick={handleSubmit}
						disabled={!form.isValid || form.isSubmitting}
						className="flex-1 flex items-center justify-center gap-2 bg-[#FFEA9E] rounded-lg py-4 font-bold text-[22px] text-[#00101A] font-montserrat disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#FFE070] transition-colors"
					>
						{form.isSubmitting ? t("writeKudo.submitting") : t("writeKudo.submit")}
						{!form.isSubmitting && (
							<svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" /></svg>
						)}
					</button>
				</div>
			</div>
		</div>
	);
}
