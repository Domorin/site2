import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			colors: {
				foundation: "#000000",
				container: "#171717",
				primary: "#F2BB05",
				secondary: "#F0F0C9",
				sesh: "#00f4ff",
				"sesh-bg": "#2c3440",
				"hackstack-bg": "#D11149",
			},
		},
	},
	plugins: [require("@codaworks/react-glow/tailwind")],
};
export default config;
