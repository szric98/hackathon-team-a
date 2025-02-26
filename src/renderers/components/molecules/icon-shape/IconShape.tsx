import { cva } from "class-variance-authority";
import type { FC } from "react";
import { twMerge } from "tailwind-merge";
import { Icon } from "../../atoms/icons/Icon";
import type { AvailableIcons } from "../../atoms/icons/types";
import type { WithAnalyticsTagOptional, WithAriaLabel } from "../../../types";

export const SIZE_VALUES = ["xxs", "xs", "default", "lg", "xl", "xxl"] as const;
type SIZE = (typeof SIZE_VALUES)[number];

export const COLOR_VALUES = [
	"brand",
	"green",
	"red",
	"yellow",
	"purple",
	"gray",
	"dark",
	"white",
	"teal",
	"favorite",
] as const;
type COLOR = (typeof COLOR_VALUES)[number];

export const SHAPE_VALUES = ["square", "circle"] as const;
type SHAPE = (typeof SHAPE_VALUES)[number];

type IconShapeParams = {
	onClick?: () => void;
	color: COLOR;
	icon: AvailableIcons;
	size?: SIZE;
	shape?: SHAPE;
	className?: string;
};

export type IconShapeProps = WithAriaLabel<
	WithAnalyticsTagOptional<IconShapeParams>
>;
export const IconShape: FC<IconShapeProps> = (props) => {
	const {
		color,
		icon,
		size = "default",
		shape = "square",
		className,
		onClick,
		dataAnalyticsId,
		ariaLabel,
	} = props;
	const containerClassname = containerVariants({ size, color, shape });
	const iconClassname = iconVariants({ color, size });

	return (
		// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
		<div
			className={twMerge(containerClassname, className)}
			onClick={onClick}
			role={onClick ? "button" : "img"}
			data-analytics-id={dataAnalyticsId}
			aria-label={ariaLabel}
		>
			<Icon icon={icon} className={twMerge(iconClassname)} />
		</div>
	);
};

type VariantSettings = {
	size: Record<SIZE, string>;
	color: Record<COLOR, string>;
	shape: Record<SHAPE, string>;
};

type ContainerVariant = VariantSettings;
const containerVariants = /*tw:*/ cva<ContainerVariant>(
	"flex w-min shrink-0 items-center justify-center",
	{
		variants: {
			size: {
				xxs: "size-4",
				xs: "size-6",
				default: "size-8",
				lg: "size-12",
				xl: "size-16",
				xxl: "size-24",
			},
			color: {
				brand: "bg-brand-100 dark:bg-brand-900",
				green: "bg-green-100 dark:bg-green-900",
				red: "bg-red-100 dark:bg-red-900",
				yellow: "bg-yellow-100 dark:bg-yellow-900",
				purple: "bg-purple-100 dark:bg-purple-900",
				gray: "bg-gray-100 dark:bg-gray-700",
				dark: "bg-gray-900 dark:bg-gray-900",
				white: "bg-white dark:bg-gray-800",
				teal: "bg-teal-100 dark:bg-teal-900",
				favorite: "bg-yellow-100 dark:bg-yellow-900",
			},
			shape: {
				square: "rounded-lg",
				circle: "rounded-full",
			},
		},
	},
);

type IconVariant = Pick<VariantSettings, "color" | "size">;
const iconVariants = /*tw:*/ cva<IconVariant>(
	{},
	{
		variants: {
			color: {
				brand: "fill-brand-700 dark:fill-brand-400",
				green: "fill-green-700 dark:fill-green-400",
				red: "fill-red-700 dark:fill-red-400",
				yellow: "fill-yellow-700 dark:fill-yellow-400",
				purple: "fill-purple-700 dark:fill-purple-400",
				gray: "fill-gray-500 dark:fill-gray-400",
				dark: "fill-white",
				white: "fill-gray-900 dark:fill-white",
				teal: "fill-teal-700 dark:fill-teal-400",
				favorite: "fill-yellow-400",
			},
			size: {
				xxs: "size-2",
				xs: "size-3",
				default: "size-4",
				lg: "size-6",
				xl: "size-9",
				xxl: "size-14",
			},
		},
	},
);
