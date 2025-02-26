import * as RadixToggle from "@radix-ui/react-switch";
import { cva } from "class-variance-authority";
import type { FC } from "react";
import { Typography } from "../../atoms/typographies/Typography";

export type ToggleProps = {
	checked: boolean;
	onCheckedChange: (checked: boolean) => void;
	size?: SIZE;
	label?: string;
	helperText?: string;
	disabled?: boolean;
};

export const Toggle: FC<ToggleProps> = ({
	checked,
	onCheckedChange,
	size = "md",
	label,
	helperText,
	disabled,
}) => {
	const rootClasses = toggleRootVariants({ size, disabled });
	const thumbClasses = toggleThumbVariants({ size });
	return (
		<div className="flex gap-3">
			<RadixToggle.Root
				checked={checked}
				onCheckedChange={onCheckedChange}
				disabled={disabled}
				className={rootClasses}
			>
				<RadixToggle.Thumb className={thumbClasses} />
			</RadixToggle.Root>
			<div className="flex flex-col">
				<Typography.CaptionMedium color={disabled ? "disabled" : "primary"}>
					{label}
				</Typography.CaptionMedium>
				<Typography.SubCaption color={disabled ? "disabled" : "secondary"}>
					{helperText}
				</Typography.SubCaption>
			</div>
		</div>
	);
};

export const SIZE_VALUES = ["sm", "md", "lg"] as const;
type SIZE = (typeof SIZE_VALUES)[number];

type VariantSettings = {
	size: Record<SIZE, string>;
	disabled: Record<"true" | "false", string>;
};

const toggleRootVariants = /*tw:*/ cva<VariantSettings>(
	"relative rounded-full bg-gray-200 outline-none data-[state=checked]:bg-brand-700 dark:bg-gray-600 dark:data-[state=checked]:bg-brand-700",
	{
		variants: {
			size: {
				sm: "h-5 w-10",
				md: "h-6 w-11",
				lg: "h-7 w-14",
			},
			disabled: {
				true: "cursor-not-allowed data-[state=checked]:bg-opacity-50 dark:data-[state=checked]:bg-opacity-50",
				false: "cursor-pointer",
			},
		},
	},
);

const toggleThumbVariants = /*tw:*/ cva<Pick<VariantSettings, "size">>(
	"block translate-x-0.5 rounded-full bg-white transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[22px] dark:bg-gray-400 dark:data-[state=checked]:bg-white",
	{
		variants: {
			size: {
				sm: "size-4",
				md: "size-5",
				lg: "size-[22px] translate-x-1 data-[state=checked]:translate-x-[30px]",
			},
		},
	},
);
