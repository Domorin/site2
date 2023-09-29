import classNames from "classnames";
import type { Metadata } from "next";
import { Electrolize, Gloria_Hallelujah, Inter } from "next/font/google";
import { Shader } from "./_components/shader";
import "./globals.css";
import Head from "next/head";
import { Glow, GlowCapture } from "@codaworks/react-glow";
import { TestGlowCapture } from "./_components/glow/test_glow";

const inter = Inter({ subsets: ["latin"] });
export const ElectrolizeFont = Electrolize({
	weight: "400",
	subsets: ["latin"],
});
export const WeirdFont = Gloria_Hallelujah({
	weight: "400",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Cody Lutzel",
	description: "Cody Lutzel's website",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body
				className={classNames(
					inter.className,
					"text-white bg-gradient-to-r from-foundation to-gray-950 text-lg"
				)}
			>
				<TestGlowCapture size={600}>
					<Shader />
					{children}
				</TestGlowCapture>
			</body>
		</html>
	);
}
