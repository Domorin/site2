import classNames from "classnames";
import { ElectrolizeFont } from "../layout";
import { ReactNode } from "react";

export function Card(props: {
	header: ReactNode;
	body: ReactNode;
	footer?: ReactNode;
	href: string;
}) {
	return (
		<a
			href={props.href}
			className="rounded-lg shadow-lg shadow-gray-950 bg-base transition-all flex flex-col w-80 items-center border border-transparent overflow-hidden hover:-translate-x-1 hover:-translate-y-1 hover:border-secondary hover:border"
		>
			{props.header}
			<div className="p-4 w-full">{props.body}</div>
			<div className="text-sm w-full px-4 mt-auto pb-4">
				<div className="opacity-75">{props.footer}</div>
			</div>
		</a>
	);
}
