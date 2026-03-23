"use client";

import { useState, useCallback } from "react";
import type { GiftRecipient } from "@/types/kudos";

const MOCK_RECIPIENTS: GiftRecipient[] = [
	{
		id: "gr-1",
		user: {
			id: "gu1",
			name: "Nguyen Thi Huong",
			avatar: "https://picsum.photos/seed/gu1/200",
			department: "Engineering",
			starCount: 85,
			title: "Senior Developer",
		},
		description: "Nhan duoc 1 an pham SAA",
		isNew: true,
	},
	{
		id: "gr-2",
		user: {
			id: "gu2",
			name: "Tran Van Minh",
			avatar: "https://picsum.photos/seed/gu2/200",
			department: "Design",
			starCount: 60,
			title: "UI/UX Designer",
		},
		description: "Nhan duoc 1 an pham SAA",
		isNew: true,
	},
	{
		id: "gr-3",
		user: {
			id: "gu3",
			name: "Le Thi Thu",
			avatar: "https://picsum.photos/seed/gu3/200",
			department: "QA",
			starCount: 45,
			title: "QA Engineer",
		},
		description: "Nhan duoc 1 an pham SAA",
		isNew: true,
	},
	{
		id: "gr-4",
		user: {
			id: "gu4",
			name: "Pham Duc Huy",
			avatar: "https://picsum.photos/seed/gu4/200",
			department: "Product",
			starCount: 70,
			title: "Product Manager",
		},
		description: "Nhan duoc 1 an pham SAA",
		isNew: false,
	},
	{
		id: "gr-5",
		user: {
			id: "gu5",
			name: "Vo Thi Lan Anh",
			avatar: "https://picsum.photos/seed/gu5/200",
			department: "HR",
			starCount: 55,
			title: "HR Specialist",
		},
		description: "Nhan duoc 1 an pham SAA",
		isNew: false,
	},
	{
		id: "gr-6",
		user: {
			id: "gu6",
			name: "Hoang Van Tung",
			avatar: "https://picsum.photos/seed/gu6/200",
			department: "Engineering",
			starCount: 90,
			title: "Tech Lead",
		},
		description: "Nhan duoc 1 an pham SAA",
		isNew: false,
	},
	{
		id: "gr-7",
		user: {
			id: "gu7",
			name: "Dang Thi Nga",
			avatar: "https://picsum.photos/seed/gu7/200",
			department: "Marketing",
			starCount: 40,
			title: "Marketing Executive",
		},
		description: "Nhan duoc 1 an pham SAA",
		isNew: false,
	},
	{
		id: "gr-8",
		user: {
			id: "gu8",
			name: "Bui Quang Hai",
			avatar: "https://picsum.photos/seed/gu8/200",
			department: "Engineering",
			starCount: 110,
			title: "Senior Developer",
		},
		description: "Nhan duoc 1 an pham SAA",
		isNew: false,
	},
	{
		id: "gr-9",
		user: {
			id: "gu9",
			name: "Nguyen Minh Chau",
			avatar: "https://picsum.photos/seed/gu9/200",
			department: "Design",
			starCount: 75,
			title: "Senior Designer",
		},
		description: "Nhan duoc 1 an pham SAA",
		isNew: false,
	},
	{
		id: "gr-10",
		user: {
			id: "gu10",
			name: "Tran Thi Phuong",
			avatar: "https://picsum.photos/seed/gu10/200",
			department: "QA",
			starCount: 50,
			title: "QA Lead",
		},
		description: "Nhan duoc 1 an pham SAA",
		isNew: false,
	},
];

interface UseGiftRecipientsReturn {
	recipients: GiftRecipient[];
	hasMore: boolean;
	loadMore: () => void;
	isLoading: boolean;
}

export function useGiftRecipients(): UseGiftRecipientsReturn {
	const [visibleCount, setVisibleCount] = useState(5);
	const [isLoading] = useState(false);

	const recipients = MOCK_RECIPIENTS.slice(0, visibleCount);
	const hasMore = visibleCount < MOCK_RECIPIENTS.length;

	const loadMore = useCallback(() => {
		setVisibleCount((prev) => Math.min(prev + 5, MOCK_RECIPIENTS.length));
	}, []);

	return { recipients, hasMore, loadMore, isLoading };
}
