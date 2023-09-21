import { ReactNode } from "react";

export function Section(props: { title: string; children: ReactNode }) {
	return (
		<section className="flex flex-col items-center w-full">
			<h2 className="text-4xl mt-12 mb-8">{props.title}</h2>
			{props.children}
		</section>
	);
}
