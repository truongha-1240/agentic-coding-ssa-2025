import type { AwardDetailCategory } from "@/types/awards";
import type { Language } from "@/i18n/types";

interface BilingualAward {
	name: string;
	slug: string;
	description: { VN: string; EN: string };
	thumbnailPath: string;
	quantity: string;
	unit: { VN: string; EN: string };
	prizes: { value: string; note?: { VN: string; EN: string } }[];
}

const AWARDS_DATA: BilingualAward[] = [
	{
		name: "Signature 2025 - Creator",
		slug: "signature-2025-creator",
		description: {
			VN: "Giải thưởng đặc biệt năm 2025, vinh danh những người sáng tạo đột phá, mang đến những ý tưởng và sản phẩm mới mẻ cho tổ chức. Creator là những cá nhân hoặc tập thể dám nghĩ dám làm, biến ý tưởng thành hiện thực và tạo nên giá trị khác biệt trong kỷ nguyên AI.",
			EN: "Special award for 2025, honoring breakthrough creators who bring innovative ideas and fresh products to the organization. Creators are individuals or teams who dare to think and act, turning ideas into reality and creating distinctive value in the AI era.",
		},
		thumbnailPath: "/images/awards-information/signature-2025-creator.png",
		quantity: "01",
		unit: { VN: "Cá nhân hoặc tập thể", EN: "Individual or team" },
		prizes: [
			{ value: "5.000.000 VNĐ", note: { VN: "cho giải cá nhân", EN: "for individual award" } },
			{ value: "8.000.000 VNĐ", note: { VN: "cho giải tập thể", EN: "for team award" } },
		],
	},
	{
		name: "Top Talent",
		slug: "top-talent",
		description: {
			VN: "Giải thưởng vinh danh những cá nhân xuất sắc nhất, có đóng góp nổi bật và tạo ra tác động tích cực đến sự phát triển chung của tổ chức trong suốt một năm qua.",
			EN: "Award honoring the most outstanding individuals who have made remarkable contributions and created positive impact on the organization's overall development throughout the past year.",
		},
		thumbnailPath: "/images/awards-information/top-talent.png",
		quantity: "10",
		unit: { VN: "Đơn vị", EN: "Units" },
		prizes: [{ value: "7.000.000 VNĐ", note: { VN: "cho mỗi giải thưởng", EN: "per award" } }],
	},
	{
		name: "Top Project Leader",
		slug: "top-project-leader",
		description: {
			VN: "Vinh danh những người dẫn dắt dự án xuất sắc, truyền cảm hứng và tạo nên thành công cho đội nhóm.",
			EN: "Honoring outstanding project leaders who inspire and create success for their teams.",
		},
		thumbnailPath: "/images/awards-information/top-project-leader.png",
		quantity: "03",
		unit: { VN: "Cá nhân", EN: "Individuals" },
		prizes: [{ value: "7.000.000 VNĐ", note: { VN: "cho mỗi giải thưởng", EN: "per award" } }],
	},
	{
		name: "Best Manager",
		slug: "best-manager",
		description: {
			VN: "Giải thưởng dành cho những nhà quản lý xuất sắc, xây dựng đội ngũ mạnh mẽ và tạo môi trường làm việc tích cực.",
			EN: "Award for outstanding managers who build strong teams and create a positive work environment.",
		},
		thumbnailPath: "/images/awards-information/best-manager.png",
		quantity: "01",
		unit: { VN: "Cá nhân", EN: "Individual" },
		prizes: [{ value: "10.000.000 VNĐ" }],
	},
	{
		name: "Top Project",
		slug: "top-project",
		description: {
			VN: "Giải thưởng dành cho những dự án xuất sắc, mang lại giá trị vượt trội cho khách hàng và công ty.",
			EN: "Award for outstanding projects that deliver exceptional value to clients and the company.",
		},
		thumbnailPath: "/images/awards-information/top-project.png",
		quantity: "02",
		unit: { VN: "Tập thể", EN: "Teams" },
		prizes: [{ value: "15.000.000 VNĐ", note: { VN: "cho mỗi giải thưởng", EN: "per award" } }],
	},
	{
		name: "MVP",
		slug: "mvp",
		description: {
			VN: "Most Valuable Person — giải thưởng dành cho cá nhân có giá trị nhất trong năm.",
			EN: "Most Valuable Person — award for the most valuable individual of the year.",
		},
		thumbnailPath: "/images/awards-information/mvp.png",
		quantity: "01",
		unit: { VN: "Cá nhân", EN: "Individual" },
		prizes: [{ value: "15.000.000 VNĐ" }],
	},
];

export function getAwardCategories(lang: Language): AwardDetailCategory[] {
	return AWARDS_DATA.map((award) => ({
		name: award.name,
		slug: award.slug,
		description: award.description[lang],
		thumbnailPath: award.thumbnailPath,
		quantity: award.quantity,
		unit: award.unit[lang],
		prizes: award.prizes.map((p) => ({
			value: p.value,
			note: p.note ? p.note[lang] : undefined,
		})),
	}));
}

// Backward compat — default to VN
export const AWARD_DETAIL_CATEGORIES: AwardDetailCategory[] = getAwardCategories("VN");
