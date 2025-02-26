import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { cva } from "class-variance-authority";
import type { FC } from "react";
import { useState } from "react";
import type { JSX } from "react/jsx-runtime";
import { type ClassNameValue, twMerge } from "tailwind-merge";
import { IconRenderFn } from "../../atoms/icons/IconRenderFn";
import type { AvailableIcons } from "../../atoms/icons/types";
import { Typography } from "../../atoms/typographies/Typography";
import { SearchInput } from "../inputs/search-input/SearchInput";
import { callInOrder } from "../../../../utils/fn-utils";
import { WithTooltip } from "../tooltip/WithTooltip";
import type { WithAnalyticsTag, WithAriaLabel } from "../../../types";
import { useSearchFilter } from "../../../../hooks/use-search-filter";

const UNCATEGORIZED_KEY = "<Uncategorized>";

export type DropdownMenuItemSimple = WithAnalyticsTag<{
	key: string;
	icon?: AvailableIcons;
	iconClassName?: ClassNameValue;
	iconElement?: JSX.Element;
	category?: string;
	label?: string;
	onClick?: VoidFunction;
	disabled?: boolean;
}>;

type DropdownMenuItemNested = Omit<DropdownProps, "Trigger"> &
	DropdownMenuItemSimple;

export type DropdownMenuItem = DropdownMenuItemSimple | DropdownMenuItemNested;

export type DropdownMenuItemWithRequiredLabel = DropdownMenuItem & {
	label: string;
};

export type DropdownProps = WithAriaLabel<
	WithAnalyticsTag<{
		menuItems: DropdownMenuItem[];
		Trigger: React.ReactNode;
		className?: ClassNameValue;
		menuWidth?: "auto" | "trigger";
		disabled?: boolean;
		showCategories?: boolean;
		closeOnClick?: boolean;
	}>
>;

type VariantSettings = {
	withSearchInput: Record<"true" | "false", string>;
	menuWidth: Record<"auto" | "trigger", string>;
};

const contentVariants = /*tw:*/ cva<VariantSettings>(
	"z-[1001] w-fit min-w-0 divide-y divide-gray-100 overflow-x-hidden rounded-lg bg-white py-1 text-gray-900 shadow-md transition-opacity duration-100 focus:outline-none dark:bg-gray-700 dark:text-white",
	{
		variants: {
			withSearchInput: {
				true: "border border-gray-200",
				false: "flex max-h-40 flex-col overflow-y-auto",
			},
			menuWidth: {
				auto: "",
				trigger:
					"min-w-[var(--radix-dropdown-menu-trigger-width)] max-w-[var(--radix-dropdown-menu-trigger-width)]",
			},
		},
	},
);

export const Dropdown: FC<DropdownProps> = ({
	Trigger,
	menuItems,
	dataAnalyticsId,
	ariaLabel,
	className,
	menuWidth = "auto",
	disabled = false,
	showCategories = false,
	closeOnClick = true,
}) => {
	const withSearchInput = menuItems.length > 5;
	const [isOpen, setOpen] = useState(false);

	const { applySearchFilterFn, changeSearchTerm } =
		useSearchFilter<DropdownMenuItem>({
			predicate: (item) =>
				`${item.label ?? ""} ${item.category ?? ""}`.toLowerCase(),
		});

	const filteredData = applySearchFilterFn(menuItems);

	const groupedItems = filteredData.reduce<Record<string, DropdownMenuItem[]>>(
		(acc, item) => {
			const category = item.category ?? UNCATEGORIZED_KEY;
			if (!acc[category]) acc[category] = [];
			acc[category].push(item);
			return acc;
		},
		{},
	);

	const handleSelect = () => {
		changeSearchTerm("");
		if (closeOnClick) setOpen(false);
	};

	const content =
		withSearchInput || showCategories ? (
			<div>
				{withSearchInput && (
					<SearchInput onChange={changeSearchTerm} className="mb-4 px-4 pt-4" />
				)}
				<div className="flex max-h-44 flex-col gap-2 overflow-auto">
					{Object.entries(groupedItems).map(([category, items]) => (
						<div key={category} className="flex flex-col gap-4">
							{category !== UNCATEGORIZED_KEY && (
								<Typography.CaptionBold className="px-4">
									{category}
								</Typography.CaptionBold>
							)}
							<div>
								<DropdownMenuItems
									menuItems={items}
									withSearchInput={withSearchInput}
									onSelect={handleSelect}
								/>
							</div>
						</div>
					))}
				</div>
			</div>
		) : (
			<DropdownMenuItems menuItems={menuItems} onSelect={handleSelect} />
		);

	return (
		// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
		<span
			data-analytics-id={dataAnalyticsId}
			className="flex"
			onClick={(e) => e.stopPropagation()}
		>
			<DropdownMenu.Root
				open={isOpen}
				onOpenChange={(open) => {
					if (disabled) return;

					// We have to manually reset the search term otherwise when you close the dropdown, the search term remains but it's not showing in the input
					if (!open) changeSearchTerm("");
					setOpen(open);
				}}
			>
				<DropdownMenu.Trigger
					aria-label={ariaLabel}
					className="group w-full focus:outline-none"
				>
					{Trigger}
				</DropdownMenu.Trigger>
				<DropdownMenu.Portal>
					<DropdownMenu.Content
						sideOffset={8}
						className={twMerge(
							contentVariants({
								withSearchInput: !!withSearchInput,
								menuWidth,
							}),
							className,
						)}
					>
						{content}
					</DropdownMenu.Content>
				</DropdownMenu.Portal>
			</DropdownMenu.Root>
		</span>
	);
};

type DropdownContentProps = Pick<DropdownProps, "menuItems"> & {
	onSelect?: VoidFunction;
	withSearchInput?: boolean;
};

const DropdownMenuItems: FC<DropdownContentProps> = ({
	menuItems,
	withSearchInput = false,
	onSelect,
}) => {
	return menuItems.map((menuItem) => {
		const {
			key,
			label,
			onClick,
			dataAnalyticsId,
			icon,
			iconClassName,
			iconElement,
			disabled,
		} = menuItem;

		if (!("menuItems" in menuItem))
			return (
				<DropdownMenuItem
					key={key}
					icon={icon}
					iconClassName={iconClassName}
					iconElement={iconElement}
					label={label}
					onClick={callInOrder(onClick, onSelect)}
					dataAnalyticsId={dataAnalyticsId}
					disabled={disabled}
				/>
			);

		return (
			<DropdownMenu.Sub key={label}>
				<DropdownMenuItem
					key={key}
					icon={icon}
					iconClassName={iconClassName}
					iconElement={iconElement}
					label={label}
					onClick={callInOrder(onClick, onSelect)}
					dataAnalyticsId={dataAnalyticsId}
					nested
				/>
				<DropdownMenu.SubContent
					sideOffset={8}
					className={contentVariants({ withSearchInput: !!withSearchInput })}
				>
					{menuItem.menuItems.map((subMenuItem) => {
						const {
							key,
							label,
							icon,
							iconClassName,
							iconElement,
							onClick,
							dataAnalyticsId,
						} = subMenuItem;

						return (
							<DropdownMenuItem
								key={key}
								icon={icon}
								iconClassName={iconClassName}
								iconElement={iconElement}
								label={label}
								onClick={callInOrder(onClick, onSelect)}
								dataAnalyticsId={dataAnalyticsId}
							/>
						);
					})}
				</DropdownMenu.SubContent>
			</DropdownMenu.Sub>
		);
	});
};

type DropdownMenuItemProps = DropdownMenuItemSimple & {
	nested?: boolean;
};

export const DropdownMenuItem: FC<DropdownMenuItemProps> = ({
	label,
	onClick,
	icon,
	iconClassName,
	iconElement,
	nested = false,
	dataAnalyticsId,
}) => {
	const content = (
		<button
			type="button"
			onClick={(e) => {
				e.stopPropagation();
				onClick?.();
			}}
			className="flex w-full cursor-pointer items-center justify-start gap-3 whitespace-nowrap px-4 py-2 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none group-aria-expanded:bg-gray-100 dark:focus:bg-gray-600 dark:hover:bg-gray-600"
			aria-label={label}
			data-analytics-id={dataAnalyticsId}
		>
			{iconElement ??
				(icon &&
					IconRenderFn(icon)({
						className: twMerge(
							/*tw:*/ "fill-gray-500 size-3.5 shrink-0",
							iconClassName,
						),
					}))}
			<Typography.Caption className="truncate text-gray-700 dark:text-gray-300">
				{label}
			</Typography.Caption>
		</button>
	);

	const component = nested ? DropdownMenu.SubTrigger : DropdownMenu.Item;

	return (
		<WithTooltip
			Component={component}
			componentProps={{
				className: "focus:outline-none",
				children: content,
			}}
			tooltipProps={{ title: label ?? "" }}
		/>
	);
};
