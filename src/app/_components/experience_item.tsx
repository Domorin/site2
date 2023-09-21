export function ExperienceItem(props: {
	title: string;
	company?: string;
	date: string;
	endDate?: string;
	bullets: string[];
}) {
	const dateTextArray = [props.date];
	if (props.endDate) {
		dateTextArray.push(props.endDate);
	}

	return (
		<div className="flex w-full flex-col gap-2">
			<div className="flex w-full items-center">
				<h3 className="text-2xl font-bold flex gap-4 items-center">
					<div>{props.title}</div>
				</h3>
				<p className="ml-auto opacity-70 text-sm flex-shrink-0">
					{dateTextArray.join(" - ")}
				</p>
			</div>
			{props.company && <div>{props.company}</div>}
			<ul className="list-disc list-inside text-base text-white">
				{props.bullets.map((bullet) => (
					<li>{bullet}</li>
				))}
			</ul>
		</div>
	);
}
