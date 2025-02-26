import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { type FC, useState } from "react";
import type { AvailableIcons } from "../../atoms/icons/types";
import { Button } from "../button/Button";
import { Tooltip } from "../tooltip/Tooltip";
import type { WithAnalyticsTag, WithAriaLabel } from "../../../types";
import { callInOrder } from "../../../../utils/fn-utils";

export type SpeedDialItem = WithAriaLabel<
	WithAnalyticsTag<{
		label: string;
		icon: AvailableIcons;
		onClick: VoidFunction;
	}>
>;

export type SpeedDialProps = WithAriaLabel<
	WithAnalyticsTag<{
		items: SpeedDialItem[];
	}>
>;

export const SpeedDial: FC<SpeedDialProps> = ({
	ariaLabel,
	dataAnalyticsId,
	items,
}) => {
	const [open, setOpen] = useState(false);

	return (
		<DropdownMenu.Root open={open} onOpenChange={setOpen}>
			<DropdownMenu.Trigger className="group">
				<Button.Icon
					icon="PlusIcon"
					size="lg"
					dataAnalyticsId={dataAnalyticsId}
					ariaLabel={ariaLabel}
				/>
			</DropdownMenu.Trigger>

			<DropdownMenu.Portal>
				<DropdownMenu.Content side="bottom" sideOffset={16}>
					{items.map((item) => (
						<Tooltip
							key={item.dataAnalyticsId}
							title={item.label}
							placement="left"
							offset={8}
							trigger={
								<Button.Icon
									color="alternative"
									dataAnalyticsId={item.dataAnalyticsId}
									icon={item.icon}
									className="mb-2 shadow-lg"
									ariaLabel={item.ariaLabel}
									size="lg"
									onClick={callInOrder(item.onClick, () => setOpen(false))}
								/>
							}
						/>
					))}
				</DropdownMenu.Content>
			</DropdownMenu.Portal>
		</DropdownMenu.Root>
	);
};
