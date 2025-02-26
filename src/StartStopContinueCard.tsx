import { Card } from "./renderers/components/atoms/card/Card";
import type { FormattedResponsePoint } from "./RetroConfig";

interface StartStopContinueCardProps {
	title: string;
	items: FormattedResponsePoint[];
	loading?: boolean;
}

export const StartStopContinueCard: React.FC<StartStopContinueCardProps> = ({
	title,
	items,
	loading = false,
}) => {
	return (
		<Card
			size={"md"}
			className={`min-h-[600px] ${loading ? "animate-pulse" : "h-auto"}`}
		>
			<div className="bg-[rgba(255,246,238,1)] rounded-lg shadow-sm mb-6 -mx-2 -mt-2 sticky top-0 z-10">
				<h2 className="text-xl font-bold p-4 text-center">{title}</h2>
			</div>
			{loading ? (
				<div className="space-y-4 p-4 h-full">
					<div className="h-4 bg-gray-200 rounded dark:bg-gray-700 w-full" />
					<div className="h-4 bg-gray-200 rounded dark:bg-gray-700 w-full" />
					<div className="h-4 bg-gray-200 rounded dark:bg-gray-700 w-full" />
					<div className="h-4 bg-gray-200 rounded dark:bg-gray-700 w-3/4" />
					<div className="h-4 bg-gray-200 rounded dark:bg-gray-700 w-3/4" />
					<div className="h-4 bg-gray-200 rounded dark:bg-gray-700 w-1/2" />
				</div>
			) : (
				<div className="p-4">
					{items.map((point, itemIndex) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						<div key={itemIndex} className="mb-6">
							<div className="font-semibold mb-3">{point.item.label}</div>
							<ul className="list-disc pl-6">
								{point.item.subItems.map((subItem, subItemIndex) => (
									// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
									<li key={subItemIndex} className="mb-2">
										<div className="font-semibold">{subItem.label}:</div>
										<div className="text-gray-600 dark:text-gray-400">
											{subItem.detail}
										</div>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
			)}
		</Card>
	);
};
