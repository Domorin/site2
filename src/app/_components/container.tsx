import classNames from "classnames";
import { ReactNode } from "react";

export function Container(props: {
	className?: string;
	children: ReactNode;
	color?: "secondary" | "sesh-bg" | "hackstack-bg" | "notecraft-bg";
	opacity?: "10" | "25" | "50" | "75";
	noRounded?: boolean;
}) {
	return (
		<div
			className={classNames(
				"bg-clip-padding backdrop-filter backdrop-blur-sm",
				props.className,
				{
					"bg-white": !props.color || props.color === "secondary",
					"bg-sesh-bg": props.color === "sesh-bg",
					"bg-hackstack-bg": props.color === "hackstack-bg",
					// "bg-white": props.color === "notecraft-bg",
					"bg-opacity-20": !props.opacity || props.opacity === "10",
					"bg-opacity-25": props.opacity === "25",
					"bg-opacity-50": props.opacity === "50",
					"bg-opacity-75": props.opacity === "75",
					"rounded-md": !props.noRounded,
				}
			)}
		>
			{props.children}
		</div>
	);
}
