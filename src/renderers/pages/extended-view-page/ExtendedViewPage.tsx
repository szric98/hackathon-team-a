import { type FC, Suspense } from "react";
import { ErrorBoundary, type FallbackProps } from "react-error-boundary";
import { v4 as uuidv4 } from "uuid";

import type {
  ExtendedViewSubTabConfig,
  ExtendedViewTabConfig,
  GenericSummaryResponseFragment,
  MetricCardEvConfigSettingsFragment,
  MetricCardEvTabsAndBreakdownSettingsFragment,
  TabAndSubTabTupleFragment,
} from "@/__generated__/dashboards-api";
import type { OnSummaryClickFn } from "@/charts/chart-render/types";
import type { ChartDataForEvPage } from "@/charts/hook/use-prepare-chart-data";
import { useModalState } from "@/hooks/use-modal-state";
import { Card } from "@/renderers/components/atoms/card/Card";
import { Skeleton } from "@/renderers/components/atoms/skeleton/Skeleton";
import { Breadcrumb, type BreadcrumbProps } from "@/renderers/components/molecules/breadcrumb/Breadcrumb";
import { SpeedDial } from "@/renderers/components/molecules/speed-dial/SpeedDial";
import { Tabs } from "@/renderers/components/molecules/tabs/Tabs";
import {
  type ExtendedViewChartAndTableClickHandlers,
  ExtendedViewChartAndTableRenderer,
} from "@/renderers/components/organisms/extended-view/ExtendedViewChartAndTableRenderer";
import { ExtendedViewHeader } from "@/renderers/components/organisms/extended-view/ExtendedViewHeader";
import {
  ExtendedViewAddBreakdownButton,
  type UpdateBreakdownsFn,
} from "@/renderers/components/organisms/extended-view/ExtendedViewManageBreakdownsButton";
import { ExtendedViewSettingsDrawer } from "@/renderers/components/organisms/extended-view/ExtendedViewSettingsDrawer";
import {
  DrilldownModal,
  type DrilldownModalProps,
} from "@/renderers/components/organisms/modals/drilldown-modal/DrilldownModal";
import type { OnCellDrilldownClick } from "@/renderers/components/organisms/tables/data-table/DataTableContext";
import { DataTableInputContextWrapper } from "@/renderers/components/organisms/tables/data-table/DataTableInputContextWrapper";
import type { RenderFn } from "@/types";
import { createAnalyticsId } from "@/utils/analytics";

export type EvBreadcrumbDataLoaderProps = {
  children: RenderFn<BreadcrumbProps>;
};

export type EvMetricSettingsLoaderProps = {
  children: RenderFn<{ metricSettings: MetricCardEvConfigSettingsFragment }>;
};

export type EvTabsLoaderProps = {
  children: RenderFn<{
    tabSettings: MetricCardEvTabsAndBreakdownSettingsFragment;
    activeTabTuple: TabAndSubTabTupleFragment;
    tabNavigationFns: {
      handleActiveTabChange: (newActiveTab: ExtendedViewTabConfig) => void;
      handleActiveSubTabChange: (newSubTab: ExtendedViewSubTabConfig) => void;
    };
    pinBreakdownFn: VoidFunction;
    updateBreakdownMutation: { updateBreakdowns: UpdateBreakdownsFn; loading: boolean };
  }>;
};

export type EvMetricSummariesLoaderProps = {
  metricSettings: MetricCardEvConfigSettingsFragment;
  children: RenderFn<Array<GenericSummaryResponseFragment>>;
};

export type EvChartAndTableDataLoaderProps = {
  activeTabTuple: TabAndSubTabTupleFragment;
  metricSettings: MetricCardEvConfigSettingsFragment;
  children: RenderFn<{
    chartData: ChartDataForEvPage;
    chartClickHandlers: ExtendedViewChartAndTableClickHandlers;
    onCellDrilldownClick: OnCellDrilldownClick;
    summaryClickHandler: OnSummaryClickFn;
  }>;
};

type ExtendedViewPageProps = {
  EvBreadcrumbDataLoader: FC<EvBreadcrumbDataLoaderProps>;
  EvTabsLoader: FC<EvTabsLoaderProps>;
  EvMetricSettingsLoader: FC<EvMetricSettingsLoaderProps>;
  EvMetricSummariesLoader: FC<EvMetricSummariesLoaderProps>;
  EvChartAndTableDataLoader: FC<EvChartAndTableDataLoaderProps>;
  PrepareDrilldownModal: FC<{ children: RenderFn<DrilldownModalProps> }>;
};

export const ExtendedViewPage: FC<ExtendedViewPageProps> = (props) => {
  const {
    EvBreadcrumbDataLoader,
    EvTabsLoader,
    EvMetricSettingsLoader,
    EvMetricSummariesLoader,
    EvChartAndTableDataLoader,
    PrepareDrilldownModal,
  } = props;

  const { isOpen: isMetricSettingsDrawerOpen, closeFn, openFn } = useModalState(true);

  return (
    <>
      <EvBreadcrumbDataLoader>{(breadcrumbProps) => <Breadcrumb {...breadcrumbProps} />}</EvBreadcrumbDataLoader>

      <DataTableInputContextWrapper>
        <PrepareDrilldownModal>{(data) => <DrilldownModal {...data} />}</PrepareDrilldownModal>
      </DataTableInputContextWrapper>

      <DataTableInputContextWrapper>
        <EvMetricSettingsLoader>
          {({ metricSettings }) => (
            <div className="flex">
              <Card size="lg" className="min-w-0 flex-grow gap-0">
                <ErrorBoundary fallbackRender={(props) => <EvMainError {...props} />}>
                  <Suspense fallback={<LoadEvMain />}>
                    <EvMetricSummariesLoader metricSettings={metricSettings}>
                      {(generalSummaries) => (
                        <EvTabsLoader>
                          {({
                            tabSettings,
                            activeTabTuple,
                            tabNavigationFns,
                            updateBreakdownMutation,
                            pinBreakdownFn,
                          }) => (
                            <EvChartAndTableDataLoader metricSettings={metricSettings} activeTabTuple={activeTabTuple}>
                              {({ chartData, summaryClickHandler, chartClickHandlers, onCellDrilldownClick }) => (
                                <>
                                  <ExtendedViewHeader
                                    generalSummaries={generalSummaries}
                                    onClickSettings={openFn}
                                    onSummaryClick={summaryClickHandler}
                                  />

                                  <div className="flex flex-col gap-4 pt-8">
                                    <div className="flex items-end justify-between gap-8">
                                      {updateBreakdownMutation.loading ? (
                                        <Skeleton className="h-9 flex-1" />
                                      ) : (
                                        <>
                                          <div className="min-w-0 flex-1">
                                            <Tabs
                                              active={activeTabTuple.tab}
                                              tabs={tabSettings.evTabs.map((tab) => ({
                                                value: tab,
                                                label: tab.label,
                                                dataAnalyticsId: `ev-breakdown-tab__${createAnalyticsId(tab.label)}`,
                                              }))}
                                              onChange={tabNavigationFns.handleActiveTabChange}
                                              ariaLabel="Extended View Breakdown Tabs"
                                            />
                                          </div>
                                          <ExtendedViewAddBreakdownButton
                                            tabSettings={tabSettings}
                                            updateBreakdowns={updateBreakdownMutation.updateBreakdowns}
                                          />
                                        </>
                                      )}
                                    </div>

                                    <div className="flex flex-1 justify-end">
                                      <SpeedDial
                                        dataAnalyticsId="ev__speed-dial__button"
                                        ariaLabel="Extended view speed dial button"
                                        items={[
                                          {
                                            label: "Pin",
                                            icon: "MapPinAlt",
                                            ariaLabel: "Pin breakdown tab",
                                            dataAnalyticsId: "ev__pin-breakdown__button",
                                            onClick: pinBreakdownFn,
                                          },
                                        ]}
                                      />
                                    </div>

                                    <ExtendedViewChartAndTableRenderer
                                      key={JSON.stringify(activeTabTuple)}
                                      chartClickHandlers={chartClickHandlers}
                                      onCellDrilldownClick={onCellDrilldownClick}
                                      chartData={chartData}
                                    />
                                  </div>
                                </>
                              )}
                            </EvChartAndTableDataLoader>
                          )}
                        </EvTabsLoader>
                      )}
                    </EvMetricSummariesLoader>
                  </Suspense>
                </ErrorBoundary>
              </Card>

              <ExtendedViewSettingsDrawer open={isMetricSettingsDrawerOpen} onClickClose={closeFn}>
                {null}
              </ExtendedViewSettingsDrawer>
            </div>
          )}
        </EvMetricSettingsLoader>
      </DataTableInputContextWrapper>
    </>
  );
};

const LoadEvMain: FC = () => (
  <div className="flex flex-col gap-6 py-4">
    <div className="flex flex-col gap-2">
      <Skeleton className="h-2 w-32 bg-gray-300" />
      <Skeleton className="h-2 w-20" />
    </div>
    <div className="flex gap-6">
      {[...Array(3)].map(() => (
        <Skeleton key={uuidv4()} className="h-96 flex-1" />
      ))}
      <Skeleton className="hidden h-96 flex-1 lg:flex" />
      <Skeleton className="hidden h-96 flex-1 xl:flex" />
      <Skeleton className="hidden h-96 flex-1 2xl:flex" />
    </div>
    {[...Array(5)].map(() => (
      <div key={uuidv4()} className="flex h-16 w-full items-center justify-between border-b py-2.5">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-2 w-32 bg-gray-300" />
          <Skeleton className="h-2 w-20" />
        </div>
        <Skeleton className="h-1 w-5" />
      </div>
    ))}
  </div>
);

const EvMainError: FC<FallbackProps> = ({ error }) => {
  return <div>Something went wrong! {error.message}</div>;
};
