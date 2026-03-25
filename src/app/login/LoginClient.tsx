"use client";

import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LoginButton } from "@/app/login/LoginButton";
import { useAuth } from "@/hooks/useAuth";
import { createClient } from "@/libs/supabase/client";

export function LoginClient() {
	const { isLoading, error, redirectTo, setIsLoading, clearError } = useAuth();

	function handleLogin() {
		setIsLoading(true);
		const supabase = createClient();
		const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || window.location.origin;
		supabase.auth.signInWithOAuth({
			provider: "google",
			options: {
				redirectTo: `${siteUrl}/api/auth/callback?next=${encodeURIComponent(redirectTo)}`,
			},
		});
	}

	return (
		<div className="relative min-h-screen bg-[#00101A] overflow-hidden flex flex-col">
			{/* Background Image */}
			<Image
				src="/images/login/bg-keyvisual.png"
				alt=""
				fill
				priority
				className="object-cover z-0"
				sizes="100vw"
			/>

			{/* Left Gradient Overlay */}
			<div
				className="absolute inset-0 z-[1]"
				style={{
					background:
						"linear-gradient(90deg, #00101A 0%, #00101A 25.41%, transparent 100%)",
				}}
			/>

			{/* Bottom Gradient Overlay */}
			<div
				className="absolute inset-0 z-[2]"
				style={{
					background:
						"linear-gradient(0deg, #00101A 22.48%, rgba(0, 19, 32, 0) 51.74%)",
				}}
			/>

			{/* Header */}
			<Header />

			{/* Hero Section */}
			<section className="relative z-[5] flex flex-col flex-1 px-6 py-12 md:px-12 md:py-16 lg:px-36 lg:py-24">
				<div className="flex flex-col gap-10 md:gap-[60px] lg:gap-20">
					{/* Key Visual */}
					<Image
						src="/images/login/root-further.png"
						alt="ROOT FURTHER"
						width={451}
						height={200}
						className="w-[280px] md:w-[360px] lg:w-[451px] h-auto"
					/>

					{/* Content Block */}
					<div className="flex flex-col gap-6 pl-0 lg:pl-4">
						<p className="max-w-full lg:max-w-[480px] text-base leading-7 md:text-xl md:leading-10 font-bold tracking-[0.5px] text-white font-[family-name:var(--font-montserrat)]">
							Bắt đầu hành trình của bạn cùng SAA 2025.
							<br />
							Đăng nhập để khám phá!
						</p>

						<LoginButton
							error={error}
							redirectTo={redirectTo}
							isLoading={isLoading}
							onLogin={handleLogin}
							onClearError={clearError}
						/>
					</div>
				</div>
			</section>

			{/* Footer */}
			<Footer />
		</div>
	);
}
