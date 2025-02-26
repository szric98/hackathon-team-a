import type { FC } from "react";

import { ChartController } from "@/charts/ChartController";
import {
  ChartEnvironment,
  type OnChordPointClickFn,
  type OnTreemapDetailsDrilldownFn,
  type OnTreemapOpenFolderFn,
  type OnXYPointClickFn,
} from "@/charts/chart-render/types";
import { ySizeForEVFrom } from "@/charts/chart-render/utils/card-size-for";
import type { ChartDataForEvPage } from "@/charts/hook/use-prepare-chart-data";
import { useVisibilityData } from "@/charts/hook/use-visibility-data";
import { DataErrorCard } from "@/renderers/components/organisms/complex-cards/data-error-card/DataErrorCard";
import { DataTable } from "@/renderers/components/organisms/tables/data-table/DataTable";
import { DataTableContextWrapper, type OnCellDrilldownClick } from "../tables/data-table/DataTableContext";
import { DataTablePagination } from "../tables/data-table/DataTablePagination";

export type ExtendedViewChartAndTableClickHandlers = {
  xyPointClickHandler: OnXYPointClickFn;
  chordPointClickHandler: OnChordPointClickFn;
  treemapDetailsDrilldownClickHandler: OnTreemapDetailsDrilldownFn;
  treemapOpenFolderClickHandler: OnTreemapOpenFolderFn;
};

type ExtendedViewChartAndTableRendererProps = {
  chartData: ChartDataForEvPage;
  chartClickHandlers: ExtendedViewChartAndTableClickHandlers;
  onCellDrilldownClick: OnCellDrilldownClick;
};
export const ExtendedViewChartAndTableRenderer: FC<ExtendedViewChartAndTableRendererProps> = (props) => {
  const { chartData, chartClickHandlers, onCellDrilldownClick } = props;
  const { chartError, extractedChartData, chartDataRecordEnabled } = chartData;

  const visibilityData = useVisibilityData(extractedChartData, chartDataRecordEnabled?.chartTableLinkType);

  if (chartError) {
    const { title, description } = chartError;
    return <DataErrorCard title={title} description={description} />;
  }

  if (!(chartDataRecordEnabled && extractedChartData)) {
    return null;
  }

  return (
    <div className="flex flex-col">
      <div className="mb-8">
        <ChartController
          canHaveLegend={true}
          visibility={visibilityData.chartVisibility}
          extractedChartDataRecord={extractedChartData}
          environment={ChartEnvironment.EV}
          ySize={ySizeForEVFrom(extractedChartData.type)}
          onTreemapOpenFolder={chartClickHandlers.treemapOpenFolderClickHandler}
          onTreemapDetailsDrilldown={chartClickHandlers.treemapDetailsDrilldownClickHandler}
          onChordPointClick={chartClickHandlers.chordPointClickHandler}
          onXYPointClick={chartClickHandlers.xyPointClickHandler}
          onSeriesItemClick={null}
        />
      </div>
      <DataTableContextWrapper
        onCellExploreClick={() => null}
        onCellDrilldownClick={onCellDrilldownClick}
        data={chartDataRecordEnabled.chartTable}
        visibility={visibilityData.tableChecks}
      >
        <DataTable />
        <DataTablePagination />
      </DataTableContextWrapper>
    </div>
  );
};
