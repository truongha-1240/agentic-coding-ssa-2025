import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { AwardsList } from "@/components/awards-information/AwardsList";

const AWARD_DETAIL_CATEGORIES = [
	{
		name: "Signature 2025 - Creator",
		slug: "signature-2025-creator",
		description:
			"Giải thưởng đặc biệt năm 2025, vinh danh những người sáng tạo đột phá, mang đến những ý tưởng và sản phẩm mới mẻ cho tổ chức. Creator là những cá nhân hoặc tập thể dám nghĩ dám làm, biến ý tưởng thành hiện thực và tạo nên giá trị khác biệt trong kỷ nguyên AI.",
		thumbnailPath: "/images/awards-information/signature-2025-creator.png",
		quantity: "01",
		unit: "Cá nhân hoặc tập thể",
		prizes: [
			{ value: "5.000.000 VNĐ", note: "cho giải cá nhân" },
			{ value: "8.000.000 VNĐ", note: "cho giải tập thể" },
		],
	},
	{
		name: "Top Talent",
		slug: "top-talent",
		description:
			"Giải thưởng vinh danh những cá nhân xuất sắc nhất, có đóng góp nổi bật và tạo ra tác động tích cực đến sự phát triển chung của tổ chức trong suốt một năm qua. Những người được đề cử Top Talent không chỉ hoàn thành tốt công việc mà còn thể hiện tinh thần vượt trội, sáng tạo và khả năng truyền cảm hứng cho đồng nghiệp xung quanh.",
		thumbnailPath: "/images/awards-information/top-talent.png",
		quantity: "10",
		unit: "Đơn vị",
		prizes: [{ value: "7.000.000 VNĐ", note: "cho mỗi giải thưởng" }],
	},
	{
		name: "Top Project Leader",
		slug: "top-project-leader",
		description:
			"Vinh danh những người dẫn dắt dự án xuất sắc, truyền cảm hứng và tạo nên thành công cho đội nhóm. Những Project Leader được ghi nhận không chỉ đảm bảo tiến độ và chất lượng dự án mà còn phát triển năng lực đội ngũ và xây dựng mối quan hệ bền vững với khách hàng.",
		thumbnailPath: "/images/awards-information/top-project-leader.png",
		quantity: "03",
		unit: "Cá nhân",
		prizes: [{ value: "7.000.000 VNĐ", note: "cho mỗi giải thưởng" }],
	},
	{
		name: "Best Manager",
		slug: "best-manager",
		description:
			"Giải thưởng dành cho những nhà quản lý xuất sắc, xây dựng đội ngũ mạnh mẽ và tạo môi trường làm việc tích cực. Best Manager là những người lãnh đạo có tầm nhìn chiến lược, khả năng phát triển con người và đóng góp quan trọng vào sự tăng trưởng của tổ chức.",
		thumbnailPath: "/images/awards-information/best-manager.png",
		quantity: "01",
		unit: "Cá nhân",
		prizes: [{ value: "10.000.000 VNĐ" }],
	},
	{
		name: "Top Project",
		slug: "top-project",
		description:
			"Giải thưởng dành cho những dự án xuất sắc, mang lại giá trị vượt trội cho khách hàng và công ty. Các dự án được vinh danh thể hiện sự phối hợp nhịp nhàng giữa các thành viên, áp dụng quy trình hiệu quả và đạt được kết quả kinh doanh đáng ghi nhận trong năm.",
		thumbnailPath: "/images/awards-information/top-project.png",
		quantity: "02",
		unit: "Tập thể",
		prizes: [{ value: "15.000.000 VNĐ", note: "cho mỗi giải thưởng" }],
	},
	{
		name: "MVP",
		slug: "mvp",
		description:
			"Most Valuable Person — giải thưởng dành cho cá nhân có giá trị nhất trong năm, người có đóng góp toàn diện và ảnh hưởng sâu rộng đến mọi khía cạnh hoạt động của tổ chức. MVP là biểu tượng của sự cống hiến, năng lực vượt trội và tinh thần Sun* đích thực.",
		thumbnailPath: "/images/awards-information/mvp.png",
		quantity: "01",
		unit: "Cá nhân",
		prizes: [{ value: "15.000.000 VNĐ" }],
	},
];

describe("AwardsList", () => {
	it("renders all 6 award cards", () => {
		render(<AwardsList categories={AWARD_DETAIL_CATEGORIES} />);
		AWARD_DETAIL_CATEGORIES.forEach((category) => {
			expect(screen.getByText(category.name)).toBeInTheDocument();
		});
	});

	it("renders sections with correct ids for hash navigation", () => {
		const { container } = render(
			<AwardsList categories={AWARD_DETAIL_CATEGORIES} />
		);
		AWARD_DETAIL_CATEGORIES.forEach((category) => {
			const section = container.querySelector(`#${category.slug}`);
			expect(section).toBeInTheDocument();
		});
	});
});
