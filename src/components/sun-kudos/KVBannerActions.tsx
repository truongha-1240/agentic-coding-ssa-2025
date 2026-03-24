"use client";

import { KudosInputBar } from "@/components/sun-kudos/KudosInputBar";
import { SunnerSearchBar } from "@/components/sun-kudos/SunnerSearchBar";

interface KVBannerActionsProps {
	onWriteKudo?: () => void;
}

export function KVBannerActions({ onWriteKudo }: KVBannerActionsProps) {
	return (
		<div className="flex flex-col md:flex-row gap-4 md:gap-6 w-full justify-center items-center">
			<KudosInputBar onWriteKudo={onWriteKudo || (() => {})} />
			<SunnerSearchBar />
		</div>
	);
}
