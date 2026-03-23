import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProfileDropdown } from "@/components/ProfileDropdown";
import { SectionTitle } from "@/components/awards-information/SectionTitle";
import { AwardsContent } from "@/components/awards-information/AwardsContent";
import { AwardsKudosPromotion } from "@/components/awards-information/AwardsKudosPromotion";
import {
	FOOTER_NAV_LINKS,
} from "@/utils/homepage-data";

export default function AwardsInformationPage() {
	return (
		<>
			<Header showNotification>
				<ProfileDropdown />
			</Header>
			<main className="relative bg-[var(--color-bg-primary)]">
				{/* Keyvisual Background */}
				<Image
					src="/images/awards-information/keyvisual.png"
					alt=""
					width={1440}
					height={547}
					priority
					sizes="100vw"
					className="absolute top-0 left-0 w-full h-[650px] object-cover z-[1]"
					aria-hidden="true"
				/>

				{/* Gradient Overlay (from design spec) */}
				<div
					className="absolute top-0 left-0 w-full h-[750px] z-[2]"
					style={{
						background:
							"linear-gradient(0deg, #00101A -4.23%, rgba(0, 19, 32, 0) 52.79%)",
					}}
					aria-hidden="true"
				/>
				{/* Dark overlay: smooth transition from keyvisual to solid dark page bg */}
				<div
					className="absolute left-0 w-full bottom-0 z-[2]"
					style={{
						top: "380px",
						background:
							"linear-gradient(to bottom, transparent 0%, rgba(0, 16, 26, 0.5) 25%, rgba(0, 16, 26, 0.9) 50%, #00101A 65%)",
					}}
					aria-hidden="true"
				/>

				{/* "Bia" Content Container */}
				<div className="relative z-[3] flex flex-col items-center gap-16 lg:gap-[120px] pt-[120px] lg:pt-[176px] pb-16 lg:pb-24 px-6 md:px-12 lg:px-36">
					{/* Root Further Logo */}
					<Image
						src="/images/awards-information/root-further-logo.png"
						alt=""
						width={338}
						height={150}
						className="w-[200px] lg:w-[338px] h-auto"
						aria-hidden="true"
					/>

					<SectionTitle />
					<AwardsContent />
					<AwardsKudosPromotion />
				</div>
			</main>
			<Footer navLinks={FOOTER_NAV_LINKS} showLogo />
		</>
	);
}
