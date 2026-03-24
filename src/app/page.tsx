import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProfileDropdown } from "@/components/ProfileDropdown";
import { HeroBanner } from "@/components/homepage/HeroBanner";
import { RootFurtherFrame486 } from "@/components/homepage/RootFurtherSection";
import { AwardsGrid } from "@/components/homepage/AwardsGrid";
import { KudosPromotion } from "@/components/homepage/KudosPromotion";
import { WidgetButton } from "@/components/homepage/WidgetButton";
import {
	FOOTER_NAV_LINKS,
} from "@/utils/homepage-data";

export default function Home() {
	return (
		<>
			<Header showNotification>
				<ProfileDropdown />
			</Header>
			<main className="relative bg-[var(--color-bg-primary)]">
				{/* Background layers (absolute positioned) */}
				<Image
					src="/images/homepage/bg-keyvisual.png"
					alt=""
					width={1512}
					height={1392}
					priority
					className="absolute top-0 left-0 w-full h-[1392px] object-cover z-[1]"
					aria-hidden="true"
				/>
				<div
					className="absolute top-0 left-0 w-full h-[1480px] z-[2]"
					style={{
						background:
							"linear-gradient(12deg, #00101A 23.7%, rgba(0, 18, 29, 0.46) 38.34%, rgba(0, 19, 32, 0) 48.92%)",
					}}
					aria-hidden="true"
				/>
				{/* Dark overlay: smooth transition from keyvisual to solid dark page bg */}
				<div
					className="absolute left-0 w-full bottom-0 z-[2]"
					style={{
						top: "600px",
						background:
							"linear-gradient(to bottom, transparent 0%, rgba(0, 16, 26, 0.6) 15%, rgba(0, 16, 26, 0.9) 25%, #00101A 35%)",
					}}
					aria-hidden="true"
				/>

				{/* "Bìa" content container — all sections with 120px gaps */}
				<div className="relative z-[3] flex flex-col items-center gap-16 lg:gap-[120px] pt-[120px] lg:pt-[176px] pb-16 lg:pb-24 px-6 lg:px-36">
					<HeroBanner />
					<RootFurtherFrame486 />
					<AwardsGrid />
					<KudosPromotion />
				</div>
			</main>
			<Footer navLinks={FOOTER_NAV_LINKS} showLogo />
			<WidgetButton />
		</>
	);
}
