import type { FC } from "react";

import type { SprintOverrideDetailsFragment } from "@/__generated__/dashboards-api";
import type { DescriptiveChartError } from "@/charts/hook/use-prepare-chart-data";
import { Icon } from "@/renderers/components/atoms/icons/Icon";
import { Typography } from "@/renderers/components/atoms/typographies/Typography";
import { SprintOverridePopover } from "@/renderers/components/organisms/popovers/SprintOverridePopover";

export type MetricCardFooterProps = {
  chartError: DescriptiveChartError | null;
  sprintOverrideDetails?: SprintOverrideDetailsFragment | null;
  onExplore?: VoidFunction;
};

export const MetricCardFooter: FC<MetricCardFooterProps> = ({ onExplore, chartError, sprintOverrideDetails }) => {
  const label = chartError?.recovery?.text ?? "Explore";
  const onClick = chartError?.recovery?.onClick ?? onExplore;

  return (
    <div className="flex w-full items-center gap-2 border-gray-200 border-t pt-5">
      {sprintOverrideDetails && <SprintOverridePopover sprintOverrideDetails={sprintOverrideDetails} />}
      <div className="ml-auto flex items-center gap-1.5">
        <Typography.CaptionBold
          color="brandLight"
          className="uppercase"
          dataAnalyticsId="explore-button"
          onClick={onClick}
        >
          {label}
        </Typography.CaptionBold>

        <Icon icon="ChevronRightIcon" className="size-2.5 fill-brand-600" />
      </div>
    </div>
  );
};
