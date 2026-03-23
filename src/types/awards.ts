export interface AwardPrize {
	value: string;
	note?: string;
}

export interface AwardDetailCategory {
	name: string;
	slug: string;
	description: string;
	thumbnailPath: string;
	quantity: string;
	unit: string;
	prizes: AwardPrize[];
}
