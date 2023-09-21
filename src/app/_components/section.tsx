import { ReactNode } from "react";

export function Section(props: {
	id: string;
	title: string;
	children: ReactNode;
}) {
	return (
		<section id={props.id} className="flex flex-col items-center w-full">
			<h2 className="text-4xl mt-12 mb-8">{props.title}</h2>
			{props.children}
		</section>
	);
}
