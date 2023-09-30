import classNames from "classnames";
import Image from "next/image";
import { WeirdFont } from "../layout";

interface CatImageDescriptor {
	src: string;
	title: string;
}

export function CatImage(props: {
	cuteImage: CatImageDescriptor;
	weirdImage: CatImageDescriptor;
}) {
	return (
		<div className="group relative h-full">
			<div className="flex flex-col h-full items-center absolute top-0 left-0 group-hover:opacity-0 opacity-100 transition-all duration-500 sm:w-fit w-screen">
				<div className="text-2xl font-bold mb-2">
					{props.cuteImage.title}
				</div>
				<div className="rounded-3xl overflow-hidden m-4">
					<Image
						className="h-auto w-auto"
						src={props.cuteImage.src}
						width={400}
						height={400}
						alt={props.cuteImage.title}
					/>
				</div>
			</div>
			<div className="flex flex-col h-full items-center absolute top-0 left-0 group-hover:opacity-100 opacity-0 transition-all duration-500 w-screen sm:w-fit">
				<div
					className={classNames(
						"text-2xl font-bold mb-2 bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent",
						WeirdFont.className
					)}
				>
					{props.weirdImage.title}
				</div>
				<div className="rounded-3xl overflow-hidden m-4">
					<Image
						className="w-auto h-auto"
						src={props.weirdImage.src}
						width={400}
						height={400}
						alt={props.weirdImage.title}
					/>
				</div>
			</div>
		</div>
	);
}
