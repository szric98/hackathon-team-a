import { Card } from "./renderers/components/atoms/card/Card";

interface SubItem {
	[key: string]: string | number;
}

interface StartStopContinueCardProps {
	title: string;
	item: string;
	subItems: SubItem;
}

export const StartStopContinueCard: React.FC<StartStopContinueCardProps> = ({
	title,
	item,
	subItems,
}) => {
	return (
		<Card size={"md"}>
			<h2 className="text-xl font-bold mb-4">{title}</h2>
			<div className="mb-3">{item}</div>
			<ul className="list-disc pl-6">
				{Object.entries(subItems).map(([key, value]) => (
					<li key={key} className="mb-1">
						<span className="font-semibold">{key}:</span> {value}
					</li>
				))}
			</ul>
		</Card>
	);
};
