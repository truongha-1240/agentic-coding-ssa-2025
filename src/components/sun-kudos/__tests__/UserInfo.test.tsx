import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("next/image", () => ({
	default: ({ alt, ...props }: { alt: string; [key: string]: unknown }) => (
		// eslint-disable-next-line @next/next/no-img-element
		<img alt={alt} {...props} />
	),
}));

vi.mock("next/link", () => ({
	default: ({
		children,
		href,
	}: {
		children: React.ReactNode;
		href: string;
	}) => <a href={href}>{children}</a>,
}));

const mockUser = {
	id: "user-1",
	name: "Nguyễn Văn A",
	avatar: "/avatars/user-1.png",
	department: "Engineering",
	starCount: 42,
	title: "Senior Developer",
};

describe("UserInfo", () => {
	it("renders avatar with correct size (48px default)", async () => {
		const { UserInfo } = await import("@/components/sun-kudos/UserInfo");
		render(<UserInfo user={mockUser} />);

		const avatar = screen.getByAltText("Nguyễn Văn A");
		expect(avatar).toBeInTheDocument();
		expect(avatar).toHaveAttribute("width", "48");
		expect(avatar).toHaveAttribute("height", "48");
	});

	it("renders avatar with 32px size when variant is small", async () => {
		const { UserInfo } = await import("@/components/sun-kudos/UserInfo");
		render(<UserInfo user={mockUser} size="small" />);

		const avatar = screen.getByAltText("Nguyễn Văn A");
		expect(avatar).toHaveAttribute("width", "32");
		expect(avatar).toHaveAttribute("height", "32");
	});

	it("renders name as a link to profile", async () => {
		const { UserInfo } = await import("@/components/sun-kudos/UserInfo");
		render(<UserInfo user={mockUser} />);

		const link = screen.getByRole("link", { name: /Nguyễn Văn A/i });
		expect(link).toHaveAttribute("href", "/profile/user-1");
	});

	it("renders star count badge", async () => {
		const { UserInfo } = await import("@/components/sun-kudos/UserInfo");
		render(<UserInfo user={mockUser} />);

		expect(screen.getByText("42")).toBeInTheDocument();
	});

	it("renders department text", async () => {
		const { UserInfo } = await import("@/components/sun-kudos/UserInfo");
		render(<UserInfo user={mockUser} />);

		expect(screen.getByText("Engineering")).toBeInTheDocument();
	});
});
