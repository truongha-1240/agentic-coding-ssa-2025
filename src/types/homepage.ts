export interface AwardCategory {
	name: string;
	slug: string;
	description: string;
	thumbnailPath: string;
}

export interface NavLink {
	label: string;
	href: string;
}

export interface EventConfig {
	eventDateTime: string;
	eventLocation: string;
	eventNote: string;
}
