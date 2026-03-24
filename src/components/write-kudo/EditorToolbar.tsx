"use client";

import type { Editor } from "@tiptap/react";
import { useTranslation } from "@/i18n";

interface EditorToolbarProps {
	editor: Editor | null;
}

export function EditorToolbar({ editor }: EditorToolbarProps) {
	const { t } = useTranslation();

	const buttons = [
		{
			label: "B",
			style: "font-bold",
			action: () => editor?.chain().focus().toggleBold().run(),
			isActive: editor?.isActive("bold") ?? false,
		},
		{
			label: "I",
			style: "italic",
			action: () => editor?.chain().focus().toggleItalic().run(),
			isActive: editor?.isActive("italic") ?? false,
		},
		{
			label: "S",
			style: "line-through",
			action: () => editor?.chain().focus().toggleStrike().run(),
			isActive: editor?.isActive("strike") ?? false,
		},
		{
			label: "1.",
			style: "",
			action: () => editor?.chain().focus().toggleOrderedList().run(),
			isActive: editor?.isActive("orderedList") ?? false,
		},
		{
			label: "",
			style: "",
			icon: (
				<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
					<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
					<path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
				</svg>
			),
			action: () => {
				if (!editor) return;
				const url = window.prompt("URL");
				if (url) editor.chain().focus().setLink({ href: url }).run();
				else editor.chain().focus().unsetLink().run();
			},
			isActive: editor?.isActive("link") ?? false,
		},
		{
			label: "",
			style: "",
			icon: (
				<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
					<path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
					<path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
				</svg>
			),
			action: () => editor?.chain().focus().toggleBlockquote().run(),
			isActive: editor?.isActive("blockquote") ?? false,
		},
	];

	return (
		<div className="flex items-center gap-1 border-b border-[#998C5F] pb-2">
			{buttons.map((btn, i) => (
				<button
					key={i}
					type="button"
					onClick={btn.action}
					disabled={!editor}
					className={`w-10 h-10 flex items-center justify-center rounded border border-[#998C5F]/50 text-[16px] text-[#1a1a1a] transition-colors disabled:opacity-30 cursor-pointer ${
						btn.style ? `${btn.style}` : ""
					} ${
						btn.isActive
							? "bg-[#00101A]/10 border-[#998C5F]"
							: "hover:bg-[#00101A]/5"
					}`}
				>
					{btn.icon || btn.label}
				</button>
			))}
			<a
				href="#"
				className="ml-auto text-[16px] font-bold text-[#FFEA9E] hover:underline"
				onClick={(e) => e.preventDefault()}
			>
				{t("writeKudo.communityStandards")}
			</a>
		</div>
	);
}
