import { cva } from "class-variance-authority";
import type { FC } from "react";
import { twMerge } from "tailwind-merge";
import { Icon } from "../../atoms/icons/Icon";
import type { AvailableIcons } from "../../atoms/icons/types";
import { Typography } from "../../atoms/typographies/Typography";
import type { WithAnalyticsTag } from "../../../types";

export const COLOR_VALUES = [
	"default",
	"gray",
	"red",
	"yellow",
	"green",
] as const;
type COLOR = (typeof COLOR_VALUES)[number];

export const SIZE_VALUES = ["sm", "lg"] as const;
type SIZE = (typeof SIZE_VALUES)[number];

export type BadgeProps = {
	label: string;
	color?: COLOR;
	size?: SIZE;
	icon?: AvailableIcons;
	iconPosition?: "left" | "right";
	className?: string;
	onClick?: VoidFunction;
	action?: WithAnalyticsTag<{
		onClick: React.MouseEventHandler<SVGElement>;
		icon?: AvailableIcons;
	}>;
};

export const Badge: FC<BadgeProps> = ({
	color = "default",
	size = "sm",
	icon,
	iconPosition,
	className,
	label,
	action,
	onClick,
}) => {
	const badgeClassName = badgeVariants({ color, size, clickable: !!onClick });
	const primaryIconClassname = primaryIconVariants({
		size,
		position: iconPosition,
	});
	const secondaryIconClassName = secondaryIconVariants({ color, size });

	const BadgeTypography = typographyForSize(size);

	return (
		<BadgeTypography
			className={twMerge(badgeClassName, className)}
			onClick={onClick}
		>
			{icon && <Icon icon={icon} className={primaryIconClassname} />}
			{label}
			{action && (
				<Icon
					role="button"
					icon={action.icon ?? "XOutlineIcon"}
					className={secondaryIconClassName}
					onClick={action.onClick}
				/>
			)}
		</BadgeTypography>
	);
};

type VariantSettings = {
	color: Record<COLOR, string>;
	size: Record<SIZE, string>;
};

type BadgeVariant = VariantSettings & {
	clickable: Record<"true" | "false", string>;
};
const badgeVariants = /*tw:*/ cva<BadgeVariant>(
	"inline-flex items-center gap-1 rounded-md",
	{
		variants: {
			color: {
				default:
					'bg-brand-100 text-brand-800 data-[clickable="true"]:hover:text-brand-500 dark:bg-brand-900 dark:text-brand-300',
				gray: 'bg-gray-100 text-gray-600 data-[clickable="true"]:hover:text-gray-500 dark:bg-gray-700 dark:text-gray-300',
				red: 'bg-red-100 text-red-800 data-[clickable="true"]:hover:text-red-500 dark:bg-red-900 dark:text-red-300',
				yellow:
					'bg-yellow-100 text-yellow-800 data-[clickable="true"]:hover:text-yellow-400 dark:bg-yellow-900 dark:text-yellow-300',
				green:
					'bg-green-100 text-green-800 data-[clickable="true"]:hover:text-green-500 dark:bg-green-900 dark:text-green-300',
			},
			size: {
				sm: "px-2.5 py-0.5",
				lg: "px-3 py-0.5",
			},
			clickable: {
				true: "cursor-pointer",
				false: "",
			},
		},
	},
);

type PrimaryIconVariant = Pick<VariantSettings, "size"> & {
	position: Record<"left" | "right", string>;
};
const primaryIconVariants = /*tw:*/ cva<PrimaryIconVariant>("fill-current", {
	variants: {
		position: {
			left: "order-first",
			right: "order-last",
		},
		size: {
			sm: "size-2.5",
			lg: "size-3",
		},
	},
});

const secondaryIconVariants = /*tw:*/ cva<VariantSettings>("cursor-pointer", {
	variants: {
		color: {
			default: "fill-brand-500 dark:fill-brand-300",
			gray: "fill-gray-500 dark:fill-gray-500",
			red: "fill-red-500 dark:fill-red-300",
			yellow: "fill-yellow-400 dark:fill-yellow-300",
			green: "fill-green-500 dark:fill-green-300",
		},
		size: {
			sm: "size-2",
			lg: "size-2.5",
		},
	},
});

const typographyForSize = (size: SIZE) => {
	if (size === "sm") return Typography.SubCaptionMedium;
	if (size === "lg") return Typography.CaptionMedium;
	const _never = size;
	throw new Error(`Unexpected size: ${_never}`);
};
