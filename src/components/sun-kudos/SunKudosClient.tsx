"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { KVBanner } from "@/components/sun-kudos/KVBanner";

const WriteKudoModal = dynamic(
	() =>
		import("@/components/write-kudo/WriteKudoModal").then(
			(mod) => mod.WriteKudoModal,
		),
	{ ssr: false },
);

export function SunKudosClient() {
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<>
			<KVBanner onWriteKudo={() => setIsModalOpen(true)} />
			{isModalOpen && (
				<WriteKudoModal
					isOpen={isModalOpen}
					onClose={() => setIsModalOpen(false)}
				/>
			)}
		</>
	);
}
