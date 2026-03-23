"use client";

import { useState } from "react";
import type { SpotlightNode } from "@/types/kudos";

const MOCK_NODES: SpotlightNode[] = [
	{ id: "sn-1", name: "Nguyen Van An", kudosCount: 95, x: 15, y: 20 },
	{ id: "sn-2", name: "Tran Thi Bich", kudosCount: 80, x: 45, y: 12 },
	{ id: "sn-3", name: "Le Hoang Nam", kudosCount: 65, x: 72, y: 25 },
	{ id: "sn-4", name: "Pham Minh Tuan", kudosCount: 100, x: 30, y: 45 },
	{ id: "sn-5", name: "Vo Thanh Hoa", kudosCount: 45, x: 60, y: 38 },
	{ id: "sn-6", name: "Dang Thi Mai", kudosCount: 55, x: 85, y: 50 },
	{ id: "sn-7", name: "Bui Duc Manh", kudosCount: 30, x: 10, y: 60 },
	{ id: "sn-8", name: "Nguyen Thi Lan", kudosCount: 70, x: 40, y: 65 },
	{ id: "sn-9", name: "Hoang Van Duc", kudosCount: 25, x: 68, y: 58 },
	{ id: "sn-10", name: "Tran Quoc Bao", kudosCount: 88, x: 20, y: 80 },
	{ id: "sn-11", name: "Nguyen Thi Huong", kudosCount: 42, x: 50, y: 75 },
	{ id: "sn-12", name: "Le Van Thanh", kudosCount: 60, x: 78, y: 70 },
	{ id: "sn-13", name: "Pham Thi Ngoc", kudosCount: 35, x: 5, y: 35 },
	{ id: "sn-14", name: "Vo Minh Khoa", kudosCount: 50, x: 35, y: 30 },
	{ id: "sn-15", name: "Tran Van Hung", kudosCount: 75, x: 55, y: 52 },
	{ id: "sn-16", name: "Nguyen Duc Anh", kudosCount: 20, x: 90, y: 15 },
	{ id: "sn-17", name: "Le Thi Phuong", kudosCount: 40, x: 25, y: 90 },
	{ id: "sn-18", name: "Hoang Minh Tu", kudosCount: 58, x: 65, y: 85 },
	{ id: "sn-19", name: "Dang Van Lam", kudosCount: 15, x: 82, y: 90 },
	{ id: "sn-20", name: "Bui Thi Hanh", kudosCount: 48, x: 48, y: 42 },
	{ id: "sn-21", name: "Nguyen Quoc Dat", kudosCount: 33, x: 12, y: 48 },
	{ id: "sn-22", name: "Tran Minh Phat", kudosCount: 72, x: 38, y: 18 },
	{ id: "sn-23", name: "Le Thi Thanh", kudosCount: 28, x: 92, y: 35 },
	{ id: "sn-24", name: "Pham Van Dung", kudosCount: 85, x: 58, y: 8 },
	{ id: "sn-25", name: "Vo Thi Kim", kudosCount: 10, x: 75, y: 45 },
];

interface UseSpotlightDataReturn {
	nodes: SpotlightNode[];
	totalKudos: number;
	isLoading: boolean;
	error: string | null;
}

export function useSpotlightData(): UseSpotlightDataReturn {
	const [nodes] = useState<SpotlightNode[]>(MOCK_NODES);
	const [isLoading] = useState(false);
	const [error] = useState<string | null>(null);

	return { nodes, totalKudos: 388, isLoading, error };
}
