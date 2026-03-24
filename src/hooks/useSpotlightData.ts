"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/libs/supabase/client";
import type { SpotlightNode } from "@/types/kudos";

interface UseSpotlightDataReturn {
	nodes: SpotlightNode[];
	totalKudos: number;
	isLoading: boolean;
	error: string | null;
}

function seededRandom(seed: number): number {
	const x = Math.sin(seed) * 10000;
	return x - Math.floor(x);
}

export function useSpotlightData(): UseSpotlightDataReturn {
	const [nodes, setNodes] = useState<SpotlightNode[]>([]);
	const [totalKudos, setTotalKudos] = useState(0);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function fetchSpotlight() {
			setIsLoading(true);
			setError(null);
			try {
				const supabase = createClient();
				const { data, error: rpcError } = await supabase.rpc(
					"get_spotlight_data",
				);

				let rows: { user_id: string; name: string; kudos_count: number }[] = [];

				if (rpcError) {
					console.warn("RPC get_spotlight_data failed, using direct query:", rpcError.message);
					// Fallback: aggregate from kudos directly
					const { data: kudoRows } = await supabase
						.from("kudos")
						.select("recipient_id, recipient:profiles!kudos_recipient_id_fkey(name)")
						.is("deleted_at", null);
					const countMap = new Map<string, { name: string; count: number }>();
					for (const r of (kudoRows || []) as Record<string, unknown>[]) {
						const rid = r.recipient_id as string;
						const prof = r.recipient as Record<string, string> | null;
						if (!countMap.has(rid)) countMap.set(rid, { name: prof?.name || "", count: 0 });
						countMap.get(rid)!.count++;
					}
					rows = Array.from(countMap.entries()).map(([id, v]) => ({
						user_id: id, name: v.name, kudos_count: v.count,
					}));
				} else {
					rows = (data || []) as typeof rows;
				}

				let total = 0;
				const mapped: SpotlightNode[] = rows.map((row, index) => {
					total += row.kudos_count;
					const seed = index + 1;
					return {
						id: row.user_id,
						name: row.name,
						kudosCount: row.kudos_count,
						x: Math.round(seededRandom(seed * 13) * 90) + 5,
						y: Math.round(seededRandom(seed * 37) * 85) + 5,
					};
				});

				setNodes(mapped);
				setTotalKudos(total);
			} catch (err) {
				setError(
					err instanceof Error
						? err.message
						: "Failed to load spotlight data",
				);
			} finally {
				setIsLoading(false);
			}
		}

		fetchSpotlight();
	}, []);

	return { nodes, totalKudos, isLoading, error };
}
