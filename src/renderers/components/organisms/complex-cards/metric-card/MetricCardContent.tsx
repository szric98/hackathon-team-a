import type { FC } from "react";

import { ChartController } from "@/charts/ChartController";
import {
  ChartEnvironment,
  type OnChordPointClickFn,
  type OnTreemapDetailsDrilldownFn,
  type OnTreemapOpenFolderFn,
  type OnXYPointClickFn,
} from "@/charts/chart-render/types";
import { yHeightFromSize } from "@/charts/chart-render/utils/size-style-utils";
import type { DescriptiveChartError } from "@/charts/hook/use-prepare-chart-data";
import { useVisibilityForInternalLegendControl } from "@/charts/hook/use-visibility-data";
import { DataErrorCard } from "@/renderers/components/organisms/complex-cards/data-error-card/DataErrorCard";
import { type ExtractedChartDataRecord, YSize } from "@plandek/pkg-chart-data";

export type MetricCardContentProps = {
  ySize: YSize;
  chartError: DescriptiveChartError | null;
  extractedChartDataRecord: ExtractedChartDataRecord | null;
  chartClickHandlers: {
    xyPointClickHandler: OnXYPointClickFn;
    chordPointClickHandler: OnChordPointClickFn;
    treemapDetailsDrilldownClickHandler: OnTreemapDetailsDrilldownFn;
    treemapOpenFolderClickHandler: OnTreemapOpenFolderFn;
  };
};
export const MetricCardContent: FC<MetricCardContentProps> = (props) => {
  const { ySize, chartError, extractedChartDataRecord, chartClickHandlers } = props;
  const visibility = useVisibilityForInternalLegendControl(extractedChartDataRecord);

  if (chartError) {
    const { title, description } = chartError;

    return (
      <div style={{ height: yHeightFromSize(ySize) }} className="flex flex-grow items-center justify-center">
        <DataErrorCard title={title} description={description} />
      </div>
    );
  }

  if (!extractedChartDataRecord) {
    return null;
  }

  return (
    <ChartController
      environment={ChartEnvironment.Dashboard}
      ySize={ySize}
      canHaveLegend={ySize === YSize.DashboardWithLegend}
      visibility={visibility}
      extractedChartDataRecord={extractedChartDataRecord}
      onXYPointClick={chartClickHandlers.xyPointClickHandler}
      onChordPointClick={chartClickHandlers.chordPointClickHandler}
      onTreemapOpenFolder={null}
      onTreemapDetailsDrilldown={chartClickHandlers.treemapDetailsDrilldownClickHandler}
      onSeriesItemClick={null}
    />
  );
};
