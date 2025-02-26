import * as PopoverPrimitive from "@radix-ui/react-popover";
import type { FC, ReactElement } from "react";
import { isValidElement, useState } from "react";
import { type ClassNameValue, twMerge } from "tailwind-merge";
import {
	GeneralPopoverContentLayout,
	type GeneralPopoverContentLayoutProps,
} from "./GeneralPopoverContentLayout";
import type { WithAnalyticsTag, WithAriaLabel } from "../../../types";

type PopoverPrimitivePropsBase = WithAriaLabel<
	WithAnalyticsTag<{
		content: ReactElement | GeneralPopoverContentLayoutProps;
		containerClassName?: ClassNameValue;
		hover?: boolean;
		placement?: PopoverPrimitive.PopoverContentProps["side"];
		withArrow?: boolean;
		onClickAway?: (e: Event) => void;
	}>
>;

export type PopoverPrimitivePropsWithTrigger = PopoverPrimitivePropsBase & {
	// biome-ignore lint/suspicious/noExplicitAny: Otherwise I don't know how to create dynamic trigger
	trigger: ReactElement<unknown>;
	anchor?: never;
	forceOpen?: never;
};

type PopoverPrimitivePropsWithAnchor = PopoverPrimitivePropsBase & {
	trigger?: never;
	// biome-ignore lint/suspicious/noExplicitAny: Otherwise I don't know how to create dynamic trigger
	anchor: ReactElement<unknown>;
	forceOpen: boolean;
};

export type PopoverPrimitiveProps =
	| PopoverPrimitivePropsWithTrigger
	| PopoverPrimitivePropsWithAnchor;

export const Popover: FC<PopoverPrimitiveProps> = ({
	trigger,
	content,
	containerClassName,
	hover = false,
	withArrow = true,
	placement,
	anchor,
	forceOpen,
	onClickAway,
	ariaLabel,
}) => {
	const [open, setOpen] = useState(false);

	return (
		<PopoverPrimitive.Root
			open={forceOpen !== undefined ? forceOpen : open}
			onOpenChange={setOpen}
		>
			{anchor ? (
				<PopoverPrimitive.Anchor asChild>{anchor}</PopoverPrimitive.Anchor> // needs to used with forceOpen
			) : (
				<PopoverPrimitive.Trigger asChild>
					{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
					<div
						aria-label={ariaLabel}
						onMouseEnter={hover ? () => setOpen(true) : undefined}
						onMouseLeave={hover ? () => setOpen(false) : undefined}
						onClick={!hover ? () => setOpen(!open) : undefined}
					>
						{trigger}
					</div>
				</PopoverPrimitive.Trigger>
			)}

			<PopoverPrimitive.Portal>
				<PopoverPrimitive.Content
					side={placement}
					onInteractOutside={(e) => {
						setOpen(false);
						onClickAway?.(e);
					}}
					onMouseEnter={hover ? () => setOpen(true) : undefined}
					onMouseLeave={hover ? () => setOpen(false) : undefined}
					className={twMerge(
						"z-[10000] rounded-lg border border-gray-200 bg-white text-gray-500 text-sm shadow-sm transition-opacity duration-300 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400",
						containerClassName,
					)}
				>
					{isValidElement(content) ? (
						content
					) : (
						<GeneralPopoverContentLayout
							heading={content.heading}
							content={content.content}
						/>
					)}
					{withArrow && (
						<PopoverPrimitive.Arrow className="fill-gray-200 dark:fill-gray-600" />
					)}
				</PopoverPrimitive.Content>
			</PopoverPrimitive.Portal>
		</PopoverPrimitive.Root>
	);
};
