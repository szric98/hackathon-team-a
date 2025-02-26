import {
  DndContext,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { type FC, Suspense, useMemo } from "react";

import type { CardSizeType, LockInfo } from "@/__generated__/dashboards-api";
import type { PrepareDashboardEventsFn } from "@/modules/Dashboard/use-prepare-dashboard-events-fn";
import {
  DrilldownModal,
  type DrilldownModalProps,
} from "@/renderers/components/organisms/modals/drilldown-modal/DrilldownModal";

import type { UIDashboardCard } from "@/data-transformers/dashboard-card-fragment";
import {
  MetricCardContent,
  type MetricCardContentProps,
} from "@/renderers/components/organisms/complex-cards/metric-card/MetricCardContent";
import { MetricCardContextWrapper } from "@/renderers/components/organisms/complex-cards/metric-card/MetricCardContext";
import { MetricCardErrorFallback } from "@/renderers/components/organisms/complex-cards/metric-card/MetricCardErrorFallback";
import {
  MetricCardFooter,
  type MetricCardFooterProps,
} from "@/renderers/components/organisms/complex-cards/metric-card/MetricCardFooter";
import {
  MetricCardHeader,
  type MetricCardHeaderProps,
} from "@/renderers/components/organisms/complex-cards/metric-card/MetricCardHeader";
import { MetricCardLoadingFallback } from "@/renderers/components/organisms/complex-cards/metric-card/MetricCardLoadingFallback";
import { SaveHtmlTreeContextWrapper } from "@/renderers/components/organisms/save-html-tree-buttons/SaveHtmlTreeContext";
import { DataTableInputContextWrapper } from "@/renderers/components/organisms/tables/data-table/DataTableInputContextWrapper";
import type { RenderFn } from "@/types";
import { strictGet } from "@/utils/strict-utils";
import { formatDate, parseDayjs } from "@plandek-utils/ts-parse-dayjs";
import { ErrorBoundary } from "react-error-boundary";
import { MetricCardContainer } from "../../components/organisms/complex-cards/metric-card/MetricCardContainer";
import {
  DashboardHeader,
  type DashboardHeaderProps,
} from "../../components/organisms/dashboard-header/DashboardHeader";
import { AppHeaderLayout, type AppHeaderLayoutProps } from "../../templates/AppHeaderLayout";

export type MetricCardDataLoaderProps = {
  children: RenderFn<{
    headerProps: MetricCardHeaderProps;
    contentProps: MetricCardContentProps;
    footerProps: MetricCardFooterProps;
  }>;
};

type DashboardPageProps = {
  headerLayoutProps: Pick<AppHeaderLayoutProps, "dataSetName" | "viewAllHref">;
  dashboardHeaderProps: Pick<DashboardHeaderProps, "title" | "description" | "descriptionObject">;
  prepareDashboardEventsFn: PrepareDashboardEventsFn;
  cards: Array<UIDashboardCard>;
  MetricCardDataLoader: FC<MetricCardDataLoaderProps>;
  PrepareDrilldownModal: FC<{ children: RenderFn<DrilldownModalProps> }>;
  lockInfo?: LockInfo | null;
};
export const DashboardPage: FC<DashboardPageProps> = (props) => {
  const {
    headerLayoutProps,
    dashboardHeaderProps,
    prepareDashboardEventsFn,
    cards,
    MetricCardDataLoader,
    PrepareDrilldownModal,
    lockInfo,
  } = props;

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor),
    useSensor(MouseSensor),
  );

  const cardKeys = useMemo(() => cards.map((card) => card.key), [cards]);
  const cardSizeStyleMap = generateCardSizeStyleMap(cards);

  const {
    onReorderMetricCard,
    onSaveDashboardSettings,
    onLockDashboard,
    onUnlockDashboard,
    lockChangeNotPermitted,
    lockIsLoading,
  } = prepareDashboardEventsFn(cardKeys);

  return (
    <AppHeaderLayout onClickDataSetSettings={() => console.info("Click dataset settings")} {...headerLayoutProps}>
      <DashboardHeader
        onSaveDashboardSettings={onSaveDashboardSettings}
        lockDashboardMutation={onLockDashboard}
        unlockDashboardMutation={onUnlockDashboard}
        lockInfo={lockInfo}
        lockIsLoading={lockIsLoading}
        lockChangeNotPermitted={lockChangeNotPermitted}
        {...dashboardHeaderProps}
      />

      <DataTableInputContextWrapper>
        <PrepareDrilldownModal>{(data) => <DrilldownModal {...data} />}</PrepareDrilldownModal>
      </DataTableInputContextWrapper>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onReorderMetricCard}>
        <SortableContext items={cardKeys} strategy={rectSortingStrategy} disabled={!!lockInfo}>
          <div className="grid grid-cols-2 gap-6 xl:grid-cols-6">
            {cards.map((card) => {
              const sizeClassName = strictGet(cardSizeStyleMap, card.key);

              return (
                <SaveHtmlTreeContextWrapper key={card.id} fileName={formatFileName(card.label)}>
                  <MetricCardContextWrapper card={card}>
                    <ErrorBoundary fallback={<MetricCardErrorFallback size={card.size} className={sizeClassName} />}>
                      <Suspense fallback={<MetricCardLoadingFallback size={card.size} className={sizeClassName} />}>
                        <MetricCardDataLoader>
                          {({ headerProps, contentProps, footerProps }) => (
                            <MetricCardContainer className={sizeClassName}>
                              <MetricCardHeader {...headerProps} />
                              <MetricCardContent {...contentProps} />
                              <MetricCardFooter {...footerProps} />
                            </MetricCardContainer>
                          )}
                        </MetricCardDataLoader>
                      </Suspense>
                    </ErrorBoundary>
                  </MetricCardContextWrapper>
                </SaveHtmlTreeContextWrapper>
              );
            })}
          </div>
        </SortableContext>
      </DndContext>
    </AppHeaderLayout>
  );
};

// TODO: TEMPORARY SIZING SOLUTION FOR METRIC CARDS...
export const generateCardSizeStyleMap = (cards: UIDashboardCard[]) => {
  const sizes: Record<string, string> = {};

  const stylesForSize: Record<CardSizeType | "MEDIUM_COMPACT", string> = {
    MEDIUM_COMPACT: "col-span-1 xl:col-span-2",
    MEDIUM: "col-span-1 xl:col-span-3",
    LARGE: "col-span-2 xl:col-span-4",
    XLARGE: "col-span-2 xl:col-span-6",
  };

  let index = 0;
  while (index < cards.length) {
    const card = strictGet(cards, index);

    const nextCard = cards[index + 1];
    const secondNextCard = cards[index + 2];
    const previousCard = cards[index - 1];

    // Use effectiveSize instead of size for compatibility
    if (card.size === "MEDIUM" && nextCard?.size === "MEDIUM" && secondNextCard?.size === "MEDIUM") {
      sizes[card.key] = sizes[nextCard.key] = sizes[secondNextCard.key] = stylesForSize.MEDIUM_COMPACT;
      index += 3;
      continue;
    }

    if (card.size === "MEDIUM" && nextCard?.size === "MEDIUM" && secondNextCard?.size !== "MEDIUM") {
      sizes[card.key] = sizes[nextCard.key] = stylesForSize.MEDIUM;
      index += 2;
      continue;
    }

    if (card.size === "LARGE" && previousCard && sizes[previousCard.key] === stylesForSize.MEDIUM_COMPACT) {
      sizes[card.key] = stylesForSize[card.size];
      index++;
      continue;
    }

    if (card.size === "LARGE" && nextCard?.size === "MEDIUM") {
      sizes[card.key] = stylesForSize[card.size];
      sizes[nextCard.key] = stylesForSize.MEDIUM_COMPACT;
      index += 2;
      continue;
    }

    if (card.size === "MEDIUM" && nextCard?.size === "LARGE") {
      sizes[card.key] = stylesForSize.MEDIUM_COMPACT;
      index++;
      continue;
    }

    sizes[card.key] = stylesForSize[card.size];
    index++;
  }

  return sizes;
};

function formatFileName(metricName?: string, extraLabel?: string): string {
  return `${(metricName ?? "").replace(/\s+/g, "_")}-${formatDate(parseDayjs(new Date()), "YYYY-MM-DD-HH:mm:ss")}${(extraLabel ?? "").replace(/\s+/g, "_")}`;
}
