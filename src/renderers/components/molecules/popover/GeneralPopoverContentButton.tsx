import type { FC } from "react";
import { Icon } from "../../atoms/icons/Icon";
import { Typography } from "../../atoms/typographies/Typography";

type GeneralPopoverContentButtonProps = {
	onClick: VoidFunction;
	prefix?: string;
	suffix?: string;
	value?: number;
	iconColor?: string;
	customIcon?: string;
};

export const GeneralPopoverContentButton: FC<
	GeneralPopoverContentButtonProps
> = ({ iconColor, onClick, prefix, suffix, value, customIcon }) => (
	// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
	<div
		className="group flex h-9 cursor-pointer items-center justify-between gap-2 rounded-md px-3 py-2.5 hover:bg-gray-100"
		onClick={onClick}
	>
		<div className="flex items-center gap-1.5">
			{iconColor && !customIcon && (
				<Icon icon="DotIcon" fill={iconColor} className="size-2" />
			)}
			{customIcon && (
				<span
					style={{
						fontFamily: "Noto Sans JP",
						color: iconColor,
						fontSize: "16px",
					}}
				>
					{customIcon}
				</span>
			)}
			<span>
				<Typography.Caption color="secondary">{prefix}</Typography.Caption>{" "}
				<Typography.CaptionMedium>{value}</Typography.CaptionMedium>{" "}
				<Typography.Caption color="secondary">{suffix}</Typography.Caption>
			</span>
		</div>
		<Icon
			icon="ChevronRightIcon"
			className="invisible size-3 fill-gray-500 group-hover:visible"
		/>
	</div>
);
