"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/libs/supabase/client";
import type { HighlightKudo, KudoUser, KudoMedia } from "@/types/kudos";

interface RpcHighlightRow {
	id: string;
	sender_id: string;
	recipient_id: string;
	content: string;
	title: string;
	is_anonymous: boolean;
	heart_count: number;
	hashtag_names: string[] | null;
	created_at: string;
}

function mapProfileToKudoUser(profile: Record<string, unknown>): KudoUser {
	const dept = profile.department as Record<string, string> | null;
	const heroTitle = profile.hero_title as Record<string, string> | null;
	return {
		id: profile.id as string,
		name: (profile.full_name as string) || (profile.name as string) || "",
		avatar: (profile.avatar_url as string) || "",
		department: dept?.name || "",
		starCount: (profile.star_count as number) || 0,
		title: heroTitle?.name || "",
	};
}

interface UseHighlightKudosReturn {
	highlights: HighlightKudo[];
	isLoading: boolean;
	error: string | null;
	refetch: () => void;
}

export function useHighlightKudos(): UseHighlightKudosReturn {
	const [highlights, setHighlights] = useState<HighlightKudo[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchHighlights = useCallback(async () => {
		setIsLoading(true);
		setError(null);
		try {
			const supabase = createClient();
			const {
				data: { user },
			} = await supabase.auth.getUser();

			let rpcRows: RpcHighlightRow[] = [];
			const { data: rows, error: rpcError } = await supabase.rpc(
				"get_highlight_kudos",
				{
					p_hashtag: null,
					p_department_id: null,
				},
			);

			if (rpcError) {
				console.warn("RPC get_highlight_kudos failed, using direct query:", rpcError.message);
				// Fallback: direct query — get kudos ordered by like count
				const { data: directRows } = await supabase
					.from("kudos")
					.select("id, sender_id, recipient_id, content, title, is_anonymous, created_at")
					.is("deleted_at", null)
					.order("created_at", { ascending: false })
					.limit(5);
				rpcRows = (directRows || []).map((r: Record<string, unknown>) => ({
					id: r.id as string,
					sender_id: r.sender_id as string,
					recipient_id: r.recipient_id as string,
					content: r.content as string,
					title: (r.title as string) || "",
					is_anonymous: (r.is_anonymous as boolean) || false,
					heart_count: 0,
					hashtag_names: null,
					created_at: r.created_at as string,
				}));
			} else {
				rpcRows = (rows || []) as unknown as RpcHighlightRow[];
			}

			if (rpcRows.length === 0) {
				setHighlights([]);
				return;
			}

			const userIds = [
				...new Set(rpcRows.flatMap((r) => [r.sender_id, r.recipient_id])),
			];
			const kudoIds = rpcRows.map((r) => r.id);

			const [profilesRes, mediaRes, likesRes] = await Promise.all([
				supabase
					.from("profiles")
					.select(
						"*, department:departments(name), hero_title:hero_titles(name,color)",
					)
					.in("id", userIds),
				supabase.from("kudo_media").select("*").in("kudo_id", kudoIds),
				user
					? supabase
							.from("kudo_likes")
							.select("kudo_id")
							.eq("user_id", user.id)
							.in("kudo_id", kudoIds)
					: Promise.resolve({ data: [] as { kudo_id: string }[] }),
			]);

			const profileMap = new Map<string, KudoUser>();
			for (const p of profilesRes.data || []) {
				profileMap.set(p.id, mapProfileToKudoUser(p));
			}

			const mediaMap = new Map<string, KudoMedia[]>();
			for (const m of (mediaRes.data || []) as Record<string, unknown>[]) {
				const kudoId = m.kudo_id as string;
				if (!mediaMap.has(kudoId)) mediaMap.set(kudoId, []);
				mediaMap.get(kudoId)!.push({
					id: m.id as string,
					url: m.url as string,
					type: (m.media_type as "image" | "video") || "image",
					thumbnailUrl: (m.thumbnail_url as string) || undefined,
				});
			}

			const likedKudoIds = new Set(
				(
					(likesRes as { data: { kudo_id: string }[] | null }).data || []
				).map((l) => l.kudo_id),
			);

			const emptyUser: KudoUser = {
				id: "",
				name: "",
				avatar: "",
				department: "",
				starCount: 0,
				title: "",
			};

			const mapped: HighlightKudo[] = rpcRows.map((row, index) => ({
				id: row.id,
				rank: index + 1,
				sender: profileMap.get(row.sender_id) || {
					...emptyUser,
					id: row.sender_id,
				},
				recipient: profileMap.get(row.recipient_id) || {
					...emptyUser,
					id: row.recipient_id,
				},
				content: row.content,
				title: row.title || "",
				isAnonymous: row.is_anonymous || false,
				hashtags: row.hashtag_names || [],
				images: mediaMap.get(row.id) || [],
				heartCount: row.heart_count || 0,
				isLikedByMe: likedKudoIds.has(row.id),
				createdAt: row.created_at,
			}));

			setHighlights(mapped);
		} catch (err) {
			setError(
				err instanceof Error ? err.message : "Failed to load highlights",
			);
		} finally {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchHighlights();
	}, [fetchHighlights]);

	return { highlights, isLoading, error, refetch: fetchHighlights };
}
