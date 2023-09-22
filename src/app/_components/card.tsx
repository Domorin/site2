import classNames from "classnames";
import { ElectrolizeFont } from "../layout";
import { ReactNode } from "react";
import { Container } from "./container";

export function Card(props: {
	header: ReactNode;
	body: ReactNode;
	footer?: ReactNode;
	href: string;
	className?: string;
}) {
	return (
		<a
			href={props.href}
			className={classNames(
				props.className,
				"rounded-lg shadow-lg transition-all flex flex-col w-80 items-center border-2 overflow-hidden hover:-translate-x-1 hover:-translate-y-1 hover:border-primary bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10"
			)}
		>
			<Container className="h-full flex flex-col" noBorder>
				{props.header}
				<div className="p-4 w-full">{props.body}</div>
				<div className="text-sm w-full px-4 mt-auto pb-4">
					<div className="opacity-75">{props.footer}</div>
				</div>
			</Container>
		</a>
	);
}
