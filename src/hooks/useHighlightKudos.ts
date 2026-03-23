"use client";

import { useState, useCallback } from "react";
import type { HighlightKudo } from "@/types/kudos";

const MOCK_HIGHLIGHTS: HighlightKudo[] = [
	{
		id: "hl-1",
		rank: 1,
		sender: {
			id: "u1",
			name: "Huỳnh Dương Xuân Nhật",
			avatar: "https://picsum.photos/seed/u1/200",
			department: "STVC",
			starCount: 120,
			title: "New Hero",
		},
		recipient: {
			id: "u2",
			name: "Hà Tiến Cường",
			avatar: "https://picsum.photos/seed/u2/200",
			department: "STVC",
			starCount: 95,
			title: "Legend Hero",
		},
		content:
			"Cơ trưởng mới nhận @Nguyễn Minh Tuấn @Cao Thành Đạt đã chỉ dẫn e rất tận tâm, nhờ có anh mà e được rất nhiều...",
		category: "SẾP QUỐC DÂN",
		hashtags: ["#Hiệu suất cao", "#Giỏi chuyên môn", "#Quản lý xuất sắc"],
		images: [],
		heartCount: 37,
		isLikedByMe: false,
		createdAt: "2025-11-24T15:53:00Z",
	},
	{
		id: "hl-2",
		rank: 2,
		sender: {
			id: "u3",
			name: "Phạm Văn Toàn",
			avatar: "https://picsum.photos/seed/u3/200",
			department: "STVC",
			starCount: 80,
			title: "Rising Hero",
		},
		recipient: {
			id: "u4",
			name: "Trần Đức Thắng",
			avatar: "https://picsum.photos/seed/u4/200",
			department: "STVC",
			starCount: 150,
			title: "Super Hero",
		},
		content:
			"Gửi anh - một người sếp tận tâm, một người anh mẫu mực. Cảm ơn anh đã luôn đồng hành và dẫn dắt team vượt qua mọi thử thách.",
		category: "SẾP QUỐC DÂN",
		hashtags: ["#Hiệu suất cao", "#Giỏi chuyên môn", "#Quản lý xuất sắc"],
		images: [],
		heartCount: 46,
		isLikedByMe: false,
		createdAt: "2025-11-24T15:49:00Z",
	},
	{
		id: "hl-3",
		rank: 3,
		sender: {
			id: "u5",
			name: "Hà Tiến Cường",
			avatar: "https://picsum.photos/seed/u5/200",
			department: "STVC",
			starCount: 60,
			title: "Legend Hero",
		},
		recipient: {
			id: "u6",
			name: "Nguyễn Minh Tuấn",
			avatar: "https://picsum.photos/seed/u6/200",
			department: "STVC",
			starCount: 200,
			title: "Super Hero",
		},
		content:
			"Cơ trưởng mới nhận @Nguyễn Minh Tuấn @Cao Thành Đạt đã chỉ dẫn e rất tận tâm, nhờ có anh mà được rất nhiều kiến thức...",
		category: "SẾP QUỐC DÂN",
		hashtags: ["#Hiệu suất cao", "#Giỏi chuyên môn"],
		images: [],
		heartCount: 42,
		isLikedByMe: true,
		createdAt: "2025-11-24T15:45:00Z",
	},
	{
		id: "hl-4",
		rank: 4,
		sender: {
			id: "u7",
			name: "Lê Văn Hoàng",
			avatar: "https://picsum.photos/seed/u7/200",
			department: "STVC",
			starCount: 45,
			title: "New Hero",
		},
		recipient: {
			id: "u8",
			name: "Trần Thị Mai",
			avatar: "https://picsum.photos/seed/u8/200",
			department: "STVC",
			starCount: 110,
			title: "Rising Hero",
		},
		content:
			"Cảm ơn chị đã luôn hỗ trợ team trong mọi giai đoạn khó khăn. Tinh thần làm việc của chị là nguồn cảm hứng lớn cho cả đội.",
		category: "IDOL GIỚI TRẺ",
		hashtags: ["#Dedicated", "#Inspiring", "#TeamPlayer"],
		images: [],
		heartCount: 38,
		isLikedByMe: false,
		createdAt: "2025-11-23T10:30:00Z",
	},
	{
		id: "hl-5",
		rank: 5,
		sender: {
			id: "u9",
			name: "Nguyễn Quốc Bảo",
			avatar: "https://picsum.photos/seed/u9/200",
			department: "STVC",
			starCount: 75,
			title: "Rising Hero",
		},
		recipient: {
			id: "u10",
			name: "Phạm Minh Đức",
			avatar: "https://picsum.photos/seed/u10/200",
			department: "STVC",
			starCount: 130,
			title: "Legend Hero",
		},
		content:
			"Anh luôn có những ý tưởng sáng tạo và biết cách truyền cảm hứng cho team. Sản phẩm của chúng ta ngày càng tốt hơn nhờ có anh!",
		category: "MENTOR CỦA NĂM",
		hashtags: ["#Inspiring", "#Creative", "#Leadership"],
		images: [],
		heartCount: 55,
		isLikedByMe: true,
		createdAt: "2025-11-22T14:00:00Z",
	},
];

interface UseHighlightKudosReturn {
	highlights: HighlightKudo[];
	isLoading: boolean;
	error: string | null;
	refetch: () => void;
}

export function useHighlightKudos(): UseHighlightKudosReturn {
	const [highlights] = useState<HighlightKudo[]>(MOCK_HIGHLIGHTS);
	const [isLoading] = useState(false);
	const [error] = useState<string | null>(null);

	const refetch = useCallback(() => {
		// Will be implemented when API is ready
	}, []);

	return { highlights, isLoading, error, refetch };
}
