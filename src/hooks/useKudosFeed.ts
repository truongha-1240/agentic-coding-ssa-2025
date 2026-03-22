"use client";

import { useState, useCallback } from "react";
import type { Kudo, KudoUser } from "@/types/kudos";

function createMockUser(id: string, name: string, department: string): KudoUser {
	return {
		id,
		name,
		avatar: `https://picsum.photos/seed/user${id}/200`,
		department,
		starCount: Math.floor(Math.random() * 50) + 10,
		title: "Member",
	};
}

const mockSenders: KudoUser[] = [
	createMockUser("s1", "Huỳnh Dương Xuân Nhật", "D4"),
	createMockUser("s2", "Nguyễn Thị Minh Anh", "D1"),
	createMockUser("s3", "Trần Văn Hoàng", "D2"),
	createMockUser("s4", "Lê Thị Hồng Nhung", "D5"),
	createMockUser("s5", "Phạm Quốc Bảo", "D3"),
];

const mockRecipients: KudoUser[] = [
	createMockUser("r1", "Võ Thanh Tùng", "D2"),
	createMockUser("r2", "Đặng Thị Mai Linh", "D4"),
	createMockUser("r3", "Bùi Minh Đức", "D1"),
	createMockUser("r4", "Hoàng Thị Lan Anh", "D3"),
	createMockUser("r5", "Ngô Quang Huy", "D5"),
];

const mockContents = [
	"Cảm ơn bạn đã luôn hỗ trợ mình trong dự án vừa qua. Tinh thần làm việc nhóm của bạn thật sự rất tuyệt vời! Mình rất trân trọng sự giúp đỡ của bạn.",
	"Bạn là nguồn cảm hứng lớn cho cả team. Sự tận tâm và nhiệt huyết của bạn khiến mọi người xung quanh đều muốn cố gắng hơn mỗi ngày.",
	"Cảm ơn bạn đã chia sẻ kiến thức và kinh nghiệm quý báu. Nhờ có bạn mà mình đã học được rất nhiều điều mới trong thời gian qua.",
	"Bạn luôn sẵn sàng giúp đỡ mọi người, dù công việc có bận rộn đến đâu. Mình thật sự rất biết ơn vì có đồng nghiệp tuyệt vời như bạn!",
	"Dự án thành công không thể thiếu sự đóng góp của bạn. Cảm ơn bạn đã luôn nỗ lực hết mình và mang lại kết quả xuất sắc.",
];

function generateMockKudo(index: number): Kudo {
	return {
		id: `kudo-${index}`,
		sender: mockSenders[index % mockSenders.length],
		recipient: mockRecipients[index % mockRecipients.length],
		content: mockContents[index % mockContents.length],
		category: "IDOL GIỚI TRẺ",
		hashtags: ["Dedicated", "Inspiring", "Dedicated", "Inspiring", "Dedicated"],
		images:
			index % 3 === 0
				? [
						{
							id: `media-${index}-1`,
							url: `https://picsum.photos/seed/kudo${index}/400/300`,
							type: "video",
							thumbnailUrl: `https://picsum.photos/seed/kudo${index}/200/200`,
						},
						{
							id: `media-${index}-2`,
							url: `https://picsum.photos/seed/kudo${index}b/400/300`,
							type: "image",
						},
					]
				: [],
		heartCount: 1000,
		isLikedByMe: index % 2 === 0,
		createdAt: new Date(2025, 9, 30, 16, 0, 0).toISOString(),
	};
}

const PAGE_SIZE = 5;
const MAX_ITEMS = 15;

export function useKudosFeed() {
	const [kudos, setKudos] = useState<Kudo[]>(() =>
		Array.from({ length: PAGE_SIZE }, (_, i) => generateMockKudo(i)),
	);
	const [isLoading, setIsLoading] = useState(false);
	const [error] = useState<string | null>(null);

	const hasMore = kudos.length < MAX_ITEMS;

	const loadMore = useCallback(() => {
		if (isLoading || !hasMore) return;

		setIsLoading(true);
		// Simulate async loading
		setTimeout(() => {
			setKudos((prev) => {
				const startIndex = prev.length;
				const newItems = Array.from({ length: PAGE_SIZE }, (_, i) =>
					generateMockKudo(startIndex + i),
				);
				return [...prev, ...newItems];
			});
			setIsLoading(false);
		}, 500);
	}, [isLoading, hasMore]);

	return { kudos, isLoading, hasMore, loadMore, error };
}
