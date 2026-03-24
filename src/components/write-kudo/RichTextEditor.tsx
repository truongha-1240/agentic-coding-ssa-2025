"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";
import { useTranslation } from "@/i18n";
import { EditorToolbar } from "@/components/write-kudo/EditorToolbar";

interface RichTextEditorProps {
	content: string;
	onChange: (html: string) => void;
}

export function RichTextEditor({ content, onChange }: RichTextEditorProps) {
	const { t } = useTranslation();

	const editor = useEditor({
		immediatelyRender: false,
		extensions: [
			StarterKit.configure({
				bold: {},
				italic: {},
				strike: {},
				orderedList: {},
				blockquote: {},
			}),
			Link.configure({ openOnClick: false }),
			Placeholder.configure({
				placeholder: t("writeKudo.contentPlaceholder"),
			}),
			CharacterCount,
		],
		content,
		onUpdate: ({ editor: ed }) => {
			onChange(ed.getHTML());
		},
		editorProps: {
			attributes: {
				class: "prose prose-sm max-w-none p-4 min-h-[200px] outline-none text-[#00101A] font-montserrat",
			},
		},
	});

	const charCount = editor?.storage.characterCount?.characters() ?? 0;

	return (
		<div className="flex flex-col gap-1">
			<div className="border border-[#998C5F] bg-white rounded">
				<div className="px-4 pt-2">
					<EditorToolbar editor={editor} />
				</div>
				<EditorContent
					editor={editor}
					className="min-h-[200px] [&_.ProseMirror]:min-h-[200px] [&_.ProseMirror_.is-empty::before]:text-[#999] [&_.ProseMirror_.is-empty::before]:content-[attr(data-placeholder)] [&_.ProseMirror_.is-empty::before]:float-left [&_.ProseMirror_.is-empty::before]:pointer-events-none [&_.ProseMirror_.is-empty::before]:h-0"
				/>
			</div>
			<div className="flex justify-between items-center">
				<p className="text-[16px] font-bold text-[#00101A] font-montserrat">
					{t("writeKudo.mentionHint")}
				</p>
				<span className="text-[14px] text-[#999] font-montserrat">
					{charCount}
				</span>
			</div>
		</div>
	);
}
