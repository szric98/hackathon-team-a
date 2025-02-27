import type { FC } from "react";
import { Skeleton } from "../../atoms/skeleton/Skeleton";
import { Tooltip } from "../tooltip/Tooltip";
import { Icon } from "../../atoms/icons/Icon";
import { Typography } from "../../atoms/typographies/Typography";

export type DashboardLockInfoProps = {
	locked: boolean;
	lockIsLoading: boolean;
	lockDashboardMutation: VoidFunction;
	unlockDashboardMutation: VoidFunction;
	disabled?: boolean;
};

export const DashboardLockInfo: FC<DashboardLockInfoProps> = ({
	locked,
	lockIsLoading,
	lockDashboardMutation,
	unlockDashboardMutation,
	disabled,
}) => {
	if (lockIsLoading) {
		return <Skeleton className="h-5 w-20" />;
	}

	const runMutation = () => {
		if (disabled) {
			return null;
		}
		if (locked) {
			unlockDashboardMutation();
		} else {
			lockDashboardMutation();
		}
	};

	const label = locked ? "Locked" : "Unlocked";
	const tooltip = locked
		? "This dashboard is locked, no changes can be made"
		: "This dashboard is unlocked, changes can be made to it";

	return (
		<Tooltip
			title={tooltip}
			trigger={
				// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
				<div
					className="flex cursor-pointer items-center gap-2"
					onClick={runMutation}
				>
					{locked ? (
						<Icon icon="LockIcon" className="size-3.5 fill-gray-500" />
					) : (
						<Icon icon="LockOpenIcon" className="size-3.5 fill-gray-500" />
					)}
					<Typography.CaptionMedium color="secondary">
						{label}
					</Typography.CaptionMedium>
				</div>
			}
		/>
	);
};
