import { cva } from "class-variance-authority";
import { useEffect, useState } from "react";
import { Typography } from "../../../atoms/typographies/Typography";

interface SelectButtonInputProps<T> {
	label?: string;
	ariaLabel: string;
	dataAnalyticsId: string;
	onChange: (selected: T) => void;
	disabled?: boolean;
	options: T[];
	value?: string | readonly string[] | number | undefined;
	getKey: (option: T) => string;
	getLabel: (option: T) => string;
	disableOption?: (option: T) => boolean;
}

export const SelectButtonInput = <T,>({
	label,
	ariaLabel,
	dataAnalyticsId,
	onChange,
	disabled = false,
	options,
	value,
	getKey,
	getLabel,
	disableOption,
}: SelectButtonInputProps<T>) => {
	const [selected, setSelected] = useState(value);

	useEffect(() => {
		setSelected(value);
	}, [value]);

	const handleClick = (option: T) => {
		if (!disabled) {
			setSelected(getKey(option));
			onChange(option);
		}
	};

	return (
		<div data-analytics-id={dataAnalyticsId} aria-label={ariaLabel}>
			{label && (
				<Typography.CaptionMedium color="primary" className="mb-3 block">
					{label}
				</Typography.CaptionMedium>
			)}
			<div className="flex flex-wrap gap-3">
				{options.map((option) => (
					<button
						key={getKey(option)}
						type="button"
						className={selectedButton({
							isSelected: getKey(option) === selected,
						})}
						onClick={() => handleClick(option)}
						disabled={
							disabled || (disableOption ? disableOption(option) : false)
						}
					>
						<Typography.Caption
							className={
								disabled || disableOption?.(option)
									? "text-gray-300"
									: selectedButtonText({
											isSelected: getKey(option) === selected,
										})
							}
						>
							{getLabel(option)}
						</Typography.Caption>
					</button>
				))}
			</div>
		</div>
	);
};

export const selectedButton = cva("rounded-lg px-5 py-2.5", {
	variants: {
		isSelected: {
			true: "bg-gray-600",
			false: "bg-gray-100",
		},
	},
	defaultVariants: {
		isSelected: false,
	},
});

export const selectedButtonText = cva("", {
	variants: {
		isSelected: {
			true: "text-white",
			false: "text-gray-500",
		},
	},
	defaultVariants: {
		isSelected: false,
	},
});
