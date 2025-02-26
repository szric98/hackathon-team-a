import { printRange, printStarted } from "@plandek-utils/ts-parse-dayjs";
import type { FC } from "react";

import type { DateRange, SprintOverrideDetailsFragment } from "@/__generated__/dashboards-api";
import { WithTooltip } from "@/renderers/components/molecules/tooltip/WithTooltip";
import { parseDateRange } from "@/utils/date/date-range";

import { Icon } from "../../atoms/icons/Icon";
import { Typography } from "../../atoms/typographies/Typography";
import { Popover } from "../../molecules/popover/Popover";

type SprintOverridePopoverProps = { sprintOverrideDetails: SprintOverrideDetailsFragment };
export const SprintOverridePopover: FC<SprintOverridePopoverProps> = ({ sprintOverrideDetails }) => (
  <>
    <Popover
      ariaLabel="Sprint Override Popover"
      dataAnalyticsId="metric-card_sprint-override_popover"
      hover
      placement="top"
      trigger={<Icon icon="InfoIcon" className="size-4 fill-gray-500" />}
      containerClassName="max-w-sm rounded-lg"
      content={{
        heading: formatHeaderLabel(sprintOverrideDetails),
        content: "The dashboard date range for this metric is overridden by the sprint's date range shown above.",
      }}
    />
    <div className="flex flex-col overflow-hidden">
      <WithTooltip
        Component={Typography.Caption}
        componentProps={{
          className: "truncate block",
          color: "secondary",
          children: "Filtering by a sprint date range.",
        }}
        tooltipProps={{ title: "Filtering by a sprint date range." }}
      />
    </div>
  </>
);

function formatHeaderLabel(sprintOverrideDetails: SprintOverrideDetailsFragment) {
  const { sprintKeyOverride, sprint } = sprintOverrideDetails;
  const sprintLabel = sprint.sprintLabel;

  const dateDescription = dateDescriptionFn(parseDateRange(sprint.dateRange));
  const sprintDescription = `${dateDescription ? `(${dateDescription}):` : ""} ${sprintLabel}`;

  switch (sprintKeyOverride) {
    case "_last_sprint_":
      return `Last Sprint ${sprintDescription}`;
    case "_current_sprint_":
      return `Current Sprint ${sprintDescription}`;
    default:
      return `Specific Sprint ${sprintDescription}`;
  }
}

const dateDescriptionFn = (range: DateRange) => {
  if (range.from && range.to) return printRange({ from: range.from, to: range.to });
  if (range.from && !range.to) return printStarted(range.from);
  return "";
};
