import { cva } from "class-variance-authority";
import {
	type CustomFlowbiteTheme,
	Button as FlowButton,
	type ButtonProps as FlowbiteButtonProps,
	theme,
} from "flowbite-react";
import type { FC, MouseEvent, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

import { Icon } from "../../atoms/icons/Icon";
import type { AvailableIcons } from "../../atoms/icons/types";
import type { WithAnalyticsTag, WithAriaLabel } from "../../../types";

type ButtonParams = Pick<
	FlowbiteButtonProps,
	| "size"
	| "onClick"
	| "isProcessing"
	| "pill"
	| "disabled"
	| "className"
	| "children"
> & {
	color?: FlowbiteButtonProps["color"] | "alternative";
	ref?: FlowbiteButtonProps["ref"];
	ariaExpanded?: boolean;
};

export const Button: FC<ButtonParams> & {
	Icon: FC<IconButtonProps>;
} = ({
	size,
	onClick,
	color = "default",
	children,
	className,
	disabled,
	isProcessing,
	pill,
	ref,
	ariaExpanded,
}) => {
	return (
		<FlowButton
			ref={ref}
			theme={buttonTheme}
			color={color}
			disabled={disabled}
			isProcessing={isProcessing}
			pill={pill}
			size={size}
			onClick={onClick}
			className={className}
			aria-expanded={ariaExpanded}
		>
			{children}
		</FlowButton>
	);
};

const buttonTheme: CustomFlowbiteTheme["button"] = /*tw:*/ {
	inner: {
		base: `${theme.button.inner.base} items-center whitespace-nowrap min-w-24 justify-center group`,
	},
	color: {
		default:
			"border border-transparent bg-brand-700 text-white focus:ring-4 focus:ring-brand-300 enabled:hover:bg-brand-800 dark:bg-brand-600 dark:hover:bg-brand-700 dark:focus:ring-brand-800",
		alternative:
			"border bg-white border-gray-200 focus:text-brand-700 aria-expanded:ring-4 aria-expanded:ring-gray-100 aria-expanded:text-brand-700 hover:border-gray-200 hover:bg-gray-100 hover:text-brand-700  focus:ring-4 focus:ring-gray-100 dark:border-gray-800 dark:disabled:bg-gray-400 dark:focus:bg-gray-700 dark:focus:ring-gray-700 dark:hover:bg-gray-700",
		light: `${theme.button.color.light} focus:ring-0`,
	},
	disabled: "cursor-normal pointer-events-none opacity-50",
};

/* ------ IconButton ------ */

export const SIZE_VALUES = ["xs", "sm", "md", "lg", "xl"] as const;
type SIZE = (typeof SIZE_VALUES)[number];

export const COLOR_VALUES = [
	"brand",
	"dark",
	"green",
	"red",
	"alternative",
] as const;
type COLOR = (typeof COLOR_VALUES)[number];

type IconButtonParams = {
	onClick?: (event: MouseEvent<HTMLElement>) => void;
	icon: AvailableIcons;
	color?: COLOR;
	size?: SIZE;
	disabled?: boolean;
	forceFocus?: boolean;
	className?: string;
};

export type IconButtonProps = WithAriaLabel<WithAnalyticsTag<IconButtonParams>>;
const IconButton: FC<PropsWithChildren<IconButtonProps>> = (props) => {
	const {
		icon,
		color = "brand",
		size = "md",
		onClick,
		disabled,
		dataAnalyticsId,
		ariaLabel,
		forceFocus,
		className,
	} = props;

	const buttonClassName = buttonVariant({ size, color, disabled });
	const iconClassname = iconVariants({ size, color });

	return (
		<button
			type="button"
			className={twMerge(buttonClassName, className)}
			onClick={onClick}
			disabled={disabled}
			aria-label={ariaLabel}
			data-analytics-id={dataAnalyticsId}
			data-focus={forceFocus ? "true" : undefined}
		>
			<Icon icon={icon} className={twMerge(iconClassname)} />
		</button>
	);
};

type VariantSettings = {
	color: Record<COLOR, string>;
	size: Record<SIZE, string>;
	disabled: Record<"true" | "false", string>;
};

type ButtonVariant = VariantSettings;
const buttonVariant = /*tw:*/ cva<ButtonVariant>(
	twMerge(`${theme.button.base} items-center group rounded-full shrink-0`),
	{
		variants: {
			color: {
				brand:
					"border border-brand-700 bg-brand-700 text-white focus:ring-4 focus:ring-brand-300 enabled:hover:bg-brand-800 group-aria-expanded:ring-4 group-aria-expanded:ring-brand-300 data-[focus]:ring-4 data-[focus]:ring-brand-300 dark:bg-brand-600 dark:focus:ring-brand-800 dark:hover:bg-brand-700",
				dark: theme.button.color.dark,
				green: theme.button.color.green,
				red: theme.button.color.red,
				alternative:
					"border border-gray-200 bg-transparent hover:border-gray-200 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 group-aria-expanded:ring-4 group-aria-expanded:ring-gray-100 data-[focus]:ring-4 data-[focus]:ring-gray-100 dark:border-gray-800 dark:disabled:bg-gray-400 dark:focus:bg-gray-700 dark:focus:ring-gray-700 dark:hover:bg-gray-700",
			},
			size: {
				xs: "size-5",
				sm: "size-7",
				md: "size-[2.125rem]",
				lg: "size-10",
				xl: "size-11",
			},
			disabled: {
				true: "cursor-not-allowed opacity-50",
				false: "",
			},
		},
	},
);

type IconVariant = Pick<VariantSettings, "color" | "size">;
const iconVariants = /*tw:*/ cva<IconVariant>("", {
	variants: {
		color: {
			brand: "fill-white dark:fill-white",
			dark: "fill-white dark:fill-white",
			green: "fill-green-700 dark:fill-white",
			red: "fill-red-700 dark:fill-white",
			alternative:
				"fill-gray-700 group-hover:fill-brand-700 group-hover:disabled:fill-gray-900 group-focus:fill-brand-700 group-aria-expanded:fill-brand-700 data-[focus]:fill-brand-700 group-data-[focus]:fill-brand-700 dark:fill-white dark:group-hover:fill-brand-700",
		},
		size: {
			xs: "size-3",
			sm: "size-3",
			md: "size-3.5",
			lg: "size-4",
			xl: "size-4",
		},
	},
});

Button.Icon = IconButton;
