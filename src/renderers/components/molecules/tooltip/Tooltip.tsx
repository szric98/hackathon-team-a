import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import type { FC, ReactElement } from "react";

export type TooltipProps = {
	title: string;
	// biome-ignore lint/suspicious/noExplicitAny: Same as "Popover" component
	trigger: ReactElement<unknown>;
	forceOpen?: boolean; // have to be undefined to make the trigger work without any external state
	offset?: number;
	placement?: TooltipPrimitive.TooltipContentProps["side"];
	hideArrow?: boolean;
};

export const Tooltip: FC<TooltipProps> = ({
	title,
	trigger,
	forceOpen,
	offset,
	hideArrow,
	placement,
}) => {
	return (
		<TooltipPrimitive.Provider>
			<TooltipPrimitive.Root open={forceOpen} delayDuration={0}>
				<TooltipPrimitive.Trigger asChild>
					{forceOpen !== undefined ? trigger : <div>{trigger}</div>}
				</TooltipPrimitive.Trigger>
				<TooltipPrimitive.Content
					side={placement}
					sideOffset={offset}
					className="z-10 max-w-screen-sm select-none break-all rounded bg-gray-900 px-3 py-2 font-medium text-sm text-white leading-none shadow-md transition-opacity duration-300 dark:bg-gray-700"
				>
					{title}
					{!hideArrow && (
						<TooltipPrimitive.Arrow className="fill-gray-900 dark:fill-gray-700" />
					)}
				</TooltipPrimitive.Content>
			</TooltipPrimitive.Root>
		</TooltipPrimitive.Provider>
	);
};
