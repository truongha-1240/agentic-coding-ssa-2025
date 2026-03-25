"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/libs/supabase/client";
import type { Kudo, KudoUser, KudoMedia } from "@/types/kudos";

const PAGE_SIZE = 10;

interface RpcFeedRow {
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
		heroTitle: heroTitle?.name || undefined,
		heroTitleColor: heroTitle?.color || undefined,
	};
}

async function fetchProfilesAndMedia(
	supabase: ReturnType<typeof createClient>,
	rows: RpcFeedRow[],
	currentUserId: string | undefined,
): Promise<Kudo[]> {
	if (rows.length === 0) return [];

	const userIds = [
		...new Set(rows.flatMap((r) => [r.sender_id, r.recipient_id])),
	];
	const kudoIds = rows.map((r) => r.id);

	const [profilesRes, mediaRes, likesRes] = await Promise.all([
		supabase
			.from("profiles")
			.select("*, department:departments(name), hero_title:hero_titles(name,color)")
			.in("id", userIds),
		supabase.from("kudo_media").select("*").in("kudo_id", kudoIds),
		currentUserId
			? supabase
					.from("kudo_likes")
					.select("kudo_id")
					.eq("user_id", currentUserId)
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
		((likesRes as { data: { kudo_id: string }[] | null }).data || []).map(
			(l) => l.kudo_id,
		),
	);

	return rows.map((row) => ({
		id: row.id,
		sender: profileMap.get(row.sender_id) || {
			id: row.sender_id,
			name: "",
			avatar: "",
			department: "",
			starCount: 0,
			title: "",
		},
		recipient: profileMap.get(row.recipient_id) || {
			id: row.recipient_id,
			name: "",
			avatar: "",
			department: "",
			starCount: 0,
			title: "",
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
}

interface UseKudosFeedOptions {
	hashtag?: string | null;
	departmentId?: string | null;
}

export function useKudosFeed(options: UseKudosFeedOptions = {}) {
	const { hashtag = null, departmentId = null } = options;
	const [kudos, setKudos] = useState<Kudo[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [cursor, setCursor] = useState<string | null>(null);
	const [hasMore, setHasMore] = useState(true);

	const fetchFeed = useCallback(
		async (currentCursor: string | null, append: boolean) => {
			setIsLoading(true);
			setError(null);
			try {
				const supabase = createClient();
				const {
					data: { user },
				} = await supabase.auth.getUser();

				// Try RPC first, fallback to direct query
			let rpcRows: RpcFeedRow[] = [];
			const { data: rows, error: rpcError } = await supabase.rpc(
					"get_kudos_feed",
					{
						p_cursor: currentCursor,
						p_limit: PAGE_SIZE,
						p_hashtag: hashtag || null,
						p_department_id: departmentId || null,
					},
				);

				if (rpcError) {
				console.warn("RPC get_kudos_feed failed, using direct query:", rpcError.message);
				// Fallback: direct query
				let query = supabase
					.from("kudos")
					.select("id, sender_id, recipient_id, content, title, is_anonymous, created_at")
					.is("deleted_at", null)
					.order("created_at", { ascending: false })
					.limit(PAGE_SIZE);
				if (currentCursor) {
					query = query.lt("created_at", currentCursor);
				}
				const { data: directRows, error: directError } = await query;
				if (directError) throw directError;
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
				rpcRows = (rows || []) as unknown as RpcFeedRow[];
			}
				const newKudos = await fetchProfilesAndMedia(
					supabase,
					rpcRows,
					user?.id,
				);

				if (rpcRows.length < PAGE_SIZE) {
					setHasMore(false);
				}

				if (rpcRows.length > 0) {
					setCursor(rpcRows[rpcRows.length - 1].created_at);
				}

				setKudos((prev) => (append ? [...prev, ...newKudos] : newKudos));
			} catch (err) {
				setError(err instanceof Error ? err.message : "Failed to load feed");
			} finally {
				setIsLoading(false);
			}
		},
		[hashtag, departmentId],
	);

	useEffect(() => {
		setCursor(null);
		setHasMore(true);
		fetchFeed(null, false);
	}, [fetchFeed]);

	const loadMore = useCallback(() => {
		if (isLoading || !hasMore) return;
		fetchFeed(cursor, true);
	}, [isLoading, hasMore, cursor, fetchFeed]);

	return { kudos, isLoading, hasMore, loadMore, error };
}
