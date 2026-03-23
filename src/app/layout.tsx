import type { Metadata } from "next";
import { Montserrat, Montserrat_Alternates } from "next/font/google";
import { Providers } from "@/app/Providers";
import "./globals.css";

const montserrat = Montserrat({
	weight: ["400", "500", "700"],
	subsets: ["latin", "vietnamese"],
	variable: "--font-montserrat",
});

const montserratAlternates = Montserrat_Alternates({
	weight: ["700"],
	subsets: ["latin", "vietnamese"],
	variable: "--font-montserrat-alternates",
});

export const metadata: Metadata = {
	title: "SAA 2025",
	description: "Sun Annual Awards 2025 — ROOT FURTHER",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<link rel="icon" href="/favicon.svg" type="image/svg+xml"></link>
			</head>
			<body className={`${montserrat.variable} ${montserratAlternates.variable} antialiased`}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
