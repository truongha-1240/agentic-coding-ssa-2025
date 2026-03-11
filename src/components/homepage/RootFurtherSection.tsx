import Image from "next/image";
import { ROOT_FURTHER_CONTENT } from "@/utils/homepage-data";

/**
 * RootFurtherDecorative — Group 434: decorative "ROOT" + "FURTHER" title images
 */
export function RootFurtherDecorative() {
	return (
		<div className="flex flex-col items-center justify-center gap-2">
			<Image
				src="/images/homepage/root-text.png"
				alt=""
				width={189}
				height={67}
				className="w-[140px] lg:w-[189px] h-auto"
				aria-hidden="true"
			/>
			<Image
				src="/images/homepage/further-text.png"
				alt=""
				width={290}
				height={67}
				className="w-[210px] lg:w-[290px] h-auto"
				aria-hidden="true"
			/>
		</div>
	);
}

/**
 * RootFurtherContent — B4_content text block
 */
export function RootFurtherContent() {
	const { paragraphs, quote, quoteTranslation, closingParagraphs } =
		ROOT_FURTHER_CONTENT;

	return (
		<div className="flex flex-col gap-8 text-lg font-normal leading-7 tracking-[0.5px] text-white text-justify w-full">
			{paragraphs.map((paragraph, index) => (
				<p key={index}>{paragraph}</p>
			))}

			<blockquote className="flex flex-col items-center gap-2 py-4 text-center">
				<p className="text-lg font-normal leading-7 tracking-[0.5px] text-white">
					{quote}
				</p>
				<p className="text-lg font-normal leading-7 tracking-[0.5px] text-white">
					{quoteTranslation}
				</p>
			</blockquote>

			{closingParagraphs.map((paragraph, index) => (
				<p key={`closing-${index}`}>{paragraph}</p>
			))}
		</div>
	);
}

/**
 * RootFurtherFrame486 — Frame 486 container wrapping decorative title + content
 * Figma: w=1152px, r=8px, p=120px 104px, gap=32px, vertical flex
 */
export function RootFurtherFrame486() {
	return (
		<section className="w-full max-w-[1152px] mx-auto flex flex-col items-center gap-8 py-[120px] px-6 lg:px-[104px] rounded-lg">
			<RootFurtherDecorative />
			<RootFurtherContent />
		</section>
	);
}

/**
 * @deprecated Use RootFurtherContent or RootFurtherFrame486 instead
 */
export function RootFurtherSection() {
	return <RootFurtherContent />;
}
