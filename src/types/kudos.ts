export interface KudoUser {
	id: string;
	name: string;
	avatar: string;
	department: string;
	starCount: number;
	title: string;
}

export interface Kudo {
	id: string;
	sender: KudoUser;
	recipient: KudoUser;
	content: string;
	title: string;
	isAnonymous: boolean;
	hashtags: string[];
	images: KudoMedia[];
	heartCount: number;
	isLikedByMe: boolean;
	createdAt: string;
}

export interface KudoMedia {
	id: string;
	url: string;
	type: "image" | "video";
	thumbnailUrl?: string;
}

export interface HighlightKudo extends Kudo {
	rank: number;
}

export interface UserStats {
	kudosReceived: number;
	kudosSent: number;
	heartsReceived: number;
	secretBoxesOpened: number;
	secretBoxesUnopened: number;
}

export interface GiftRecipient {
	id: string;
	user: KudoUser;
	description: string;
	isNew: boolean;
}

export interface SpotlightNode {
	id: string;
	name: string;
	kudosCount: number;
	x: number;
	y: number;
}

export interface Hashtag {
	id: string;
	name: string;
}

export interface Department {
	id: string;
	name: string;
}

export interface PaginatedResponse<T> {
	data: T[];
	nextCursor: string | null;
	hasMore: boolean;
}
