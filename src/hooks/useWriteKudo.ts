"use client";

import { useState, useCallback, useMemo } from "react";
import { createClient } from "@/libs/supabase/client";

interface WriteKudoState {
	recipientId: string | null;
	recipientName: string;
	title: string;
	content: string;
	selectedHashtags: string[];
	images: File[];
	isAnonymous: boolean;
	isSubmitting: boolean;
	errors: Record<string, string>;
}

const initialState: WriteKudoState = {
	recipientId: null,
	recipientName: "",
	title: "",
	content: "",
	selectedHashtags: [],
	images: [],
	isAnonymous: false,
	isSubmitting: false,
	errors: {},
};

export function useWriteKudo() {
	const [state, setState] = useState<WriteKudoState>(initialState);

	const setField = useCallback(
		<K extends keyof WriteKudoState>(field: K, value: WriteKudoState[K]) => {
			setState((prev) => ({ ...prev, [field]: value, errors: { ...prev.errors, [field]: "" } }));
		},
		[],
	);

	const addHashtag = useCallback((id: string) => {
		setState((prev) => {
			if (prev.selectedHashtags.length >= 5 || prev.selectedHashtags.includes(id)) return prev;
			return { ...prev, selectedHashtags: [...prev.selectedHashtags, id] };
		});
	}, []);

	const removeHashtag = useCallback((id: string) => {
		setState((prev) => ({
			...prev,
			selectedHashtags: prev.selectedHashtags.filter((h) => h !== id),
		}));
	}, []);

	const addImages = useCallback((files: File[]) => {
		setState((prev) => {
			const remaining = 5 - prev.images.length;
			const toAdd = files.slice(0, remaining);
			return { ...prev, images: [...prev.images, ...toAdd] };
		});
	}, []);

	const removeImage = useCallback((index: number) => {
		setState((prev) => ({
			...prev,
			images: prev.images.filter((_, i) => i !== index),
		}));
	}, []);

	const isValid = useMemo(
		() =>
			state.recipientId !== null &&
			state.title.trim().length > 0 &&
			state.content.replace(/<[^>]*>/g, "").trim().length >= 10 &&
			state.selectedHashtags.length >= 1,
		[state.recipientId, state.title, state.content, state.selectedHashtags],
	);

	const reset = useCallback(() => setState(initialState), []);

	const submit = useCallback(async (): Promise<string | null> => {
		setState((prev) => ({ ...prev, isSubmitting: true, errors: {} }));
		const supabase = createClient();

		try {
			const {
				data: { user },
			} = await supabase.auth.getUser();
			if (!user) throw new Error("Not authenticated");

			// 1. Insert kudo
			const { data: kudo, error: kudoError } = await supabase
				.from("kudos")
				.insert({
					sender_id: user.id,
					recipient_id: state.recipientId,
					content: state.content,
					title: state.title.trim(),
					is_anonymous: state.isAnonymous,
				})
				.select("id")
				.single();

			if (kudoError || !kudo) throw kudoError || new Error("Failed to create kudo");

			// 2. Insert kudo_hashtags
			if (state.selectedHashtags.length > 0) {
				const hashtagRows = state.selectedHashtags.map((hashtag_id) => ({
					kudo_id: kudo.id,
					hashtag_id,
				}));
				await supabase.from("kudo_hashtags").insert(hashtagRows);
			}

			// 3. Upload images + insert kudo_media
			for (let i = 0; i < state.images.length; i++) {
				const file = state.images[i];
				const ext = file.name.split(".").pop() || "jpg";
				const path = `${kudo.id}/${i}.${ext}`;

				const { error: uploadError } = await supabase.storage
					.from("kudo-images")
					.upload(path, file, { contentType: file.type });

				if (uploadError) {
					console.error("Image upload failed:", uploadError.message);
					continue;
				}

				const {
					data: { publicUrl },
				} = supabase.storage.from("kudo-images").getPublicUrl(path);

				await supabase.from("kudo_media").insert({
					kudo_id: kudo.id,
					url: publicUrl,
					type: "image",
					sort_order: i,
				});
			}

			setState(initialState);
			return kudo.id;
		} catch (err) {
			const message = err instanceof Error ? err.message : "Unknown error";
			setState((prev) => ({
				...prev,
				isSubmitting: false,
				errors: { submit: message },
			}));
			return null;
		}
	}, [state]);

	return {
		...state,
		setField,
		addHashtag,
		removeHashtag,
		addImages,
		removeImage,
		isValid,
		reset,
		submit,
	};
}
