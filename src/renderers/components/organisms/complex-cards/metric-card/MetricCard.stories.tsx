import { FeatureToggleContext } from "@/contexts/FeatureTogglesContext";
import { disableStoryArgs } from "@/utils/disable-story-args";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, within } from "@storybook/test";
import type { FC } from "react";

import { DEFAULT_FEATURE_TOGGLE_MAP } from "@plandek/pkg-feature-toggles";

import type { DescriptiveChartError } from "@/charts/hook/use-prepare-chart-data";
import type { UIDashboardCard } from "@/data-transformers/dashboard-card-fragment";
import { positiveDelta } from "@/renderers/mocks/deltas";
import { generateCardSizeStyleMap } from "@/renderers/pages/dashboard-page/DashboardPage";
import { strictGet } from "@/utils/strict-utils";
import { YSize } from "@plandek/pkg-chart-data";
import { SaveHtmlTreeContextWrapper } from "../../save-html-tree-buttons/SaveHtmlTreeContext";
import { DataErrorCard } from "../data-error-card/DataErrorCard";
import { MetricCardContainer } from "./MetricCardContainer";
import { MetricCardContent, type MetricCardContentProps } from "./MetricCardContent";
import { MetricCardContextWrapper } from "./MetricCardContext";
import { MetricCardFooter, type MetricCardFooterProps } from "./MetricCardFooter";
import { MetricCardHeader, type MetricCardHeaderProps } from "./MetricCardHeader";
import { MetricCardLoadingFallback, type MetricCardLoadingFallbackProps } from "./MetricCardLoadingFallback";
import { extractedChartDataMock, mockSprintOverrideDetails } from "./mock";

const meta = {
  title: "organisms/ComplexCard/MetricCard",
} satisfies Meta;

const MetricCardLayout = (Story: FC) => (
  <div className="grid grid-cols-2 gap-6 xl:grid-cols-6">
    <Story />
  </div>
);

const metricCardHeaderProps: MetricCardHeaderProps = {
  MetricCardOptionsDataLoader: ({ children }) =>
    children({
      copyModalParams: {
        currentDataSet: { clientKey: "plandek", dataSetKey: "cycle-time", label: "Cycle Time" },
        metricDashboardDataSetTree: { categories: [], clientKey: "plandek", id: "1", requiredPermission: "EDIT" },
        onDuplicate: fn(),
      },
      onCopyToThisDashboard: fn(),
      onRemove: fn(),
      onResize: fn(),
      locked: false,
    }),
  generalSummaries: [
    {
      key: "PRIMARY",
      articleId: "8493113",
      metricPositionRole: "PRIMARY",
      label: "Code cycle time by stage",
      sprintOverrideDetails: null,
      summaryValueDetails: null,
      dataRecord: {
        canHaveDrilldown: true,
        delta: positiveDelta,
        volatility: null,
        volatilityPast1: null,
        volatilityPast2: null,
        summary: 47.57,
        summaryDrilldownDiscriminator: "PRIMARY",
        summarySuffix: " hours",
        summaryKey: "_general_",
      },
    },
  ],
  summaryClickHandler: fn(),
};

const metricCardContentProps: MetricCardContentProps = {
  chartClickHandlers: {
    chordPointClickHandler: fn(),
    treemapDetailsDrilldownClickHandler: fn(),
    treemapOpenFolderClickHandler: fn(),
    xyPointClickHandler: fn(),
  },
  chartError: null,
  extractedChartDataRecord: extractedChartDataMock,
  ySize: YSize.Dashboard,
};

const metricCardFooterProps: MetricCardFooterProps = {
  chartError: null,
  onExplore: fn(),
  sprintOverrideDetails: mockSprintOverrideDetails,
};

const cardOne: UIDashboardCard = {
  id: "1",
  key: "1",
  size: "MEDIUM",
  availableSizes: ["MEDIUM", "LARGE", "XLARGE"],
  label: "Code cycle time by stage",
  dataSetKey: "cycle-time",
  dashboardKey: "1",
  clientKey: "plandek",
  metricContentHash: null,
};

const cardTwo: UIDashboardCard = {
  id: "2",
  key: "2",
  size: "LARGE",
  availableSizes: ["MEDIUM", "LARGE", "XLARGE"],
  label: "Code cycle time by stage",
  dataSetKey: "cycle-time",
  dashboardKey: "1",
  clientKey: "plandek",
  metricContentHash: null,
};

const cardThree: UIDashboardCard = {
  id: "3",
  key: "3",
  size: "XLARGE",
  availableSizes: ["MEDIUM", "LARGE", "XLARGE"],
  label: "Code cycle time by stage",
  dataSetKey: "cycle-time",
  dashboardKey: "1",
  clientKey: "plandek",
  metricContentHash: null,
};

const metricCardsMock: Array<UIDashboardCard> = [cardOne, cardTwo, cardThree];

const cardStyleMap = generateCardSizeStyleMap(metricCardsMock);

export const Main: StoryObj = {
  args: {
    drilldownClickHandlers: {
      chartClickHandlers: {
        chordPointClickHandler: fn(),
        xyPointClickHandler: fn(),
        treemapDetailsDrilldownClickHandler: fn(),
        treemapOpenFolderClickHandler: fn(),
      },
      summaryClickHandler: fn(),
    },
    size: "MEDIUM",
  },
  argTypes: {
    ...disableStoryArgs("contentProps", "footerProps", "headerProps", "sizeOptions", "cardKey", "events"),
  },
  render: () => {
    return (
      <FeatureToggleContext value={DEFAULT_FEATURE_TOGGLE_MAP}>
        {metricCardsMock.map((card) => (
          <MetricCardContextWrapper key={card.id} card={card}>
            <SaveHtmlTreeContextWrapper fileName="metric-card">
              <MetricCardContainer className={strictGet(cardStyleMap, card.key)}>
                <MetricCardHeader {...metricCardHeaderProps} />
                <MetricCardContent {...metricCardContentProps} />
                <MetricCardFooter {...metricCardFooterProps} />
              </MetricCardContainer>
            </SaveHtmlTreeContextWrapper>
          </MetricCardContextWrapper>
        ))}
      </FeatureToggleContext>
    );
  },
  decorators: MetricCardLayout,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Check that the link is displayed when exploreLink is provided", async () => {
      const exploreLinks = canvas.getAllByText("Explore");

      for (const link of exploreLinks) {
        expect(link).toBeInTheDocument();
      }
    });
  },
};

export const Loading: StoryObj<MetricCardLoadingFallbackProps> = {
  decorators: MetricCardLayout,
  render: () => <MetricCardLoadingFallback size={cardOne.size} className={strictGet(cardStyleMap, cardOne.key)} />,
};

export const ErrorCard: StoryObj = {
  decorators: MetricCardLayout,
  render: () => {
    const generalError: DescriptiveChartError = {
      title: "Something went wrong with this metric.",
      description: "Please contact support",
      recovery: { text: "Contact Support", onClick: fn() },
    };

    return (
      <FeatureToggleContext value={DEFAULT_FEATURE_TOGGLE_MAP}>
        <MetricCardContextWrapper key={cardOne.id} card={cardOne}>
          <SaveHtmlTreeContextWrapper fileName="error-card">
            <MetricCardContainer className={strictGet(cardStyleMap, cardOne.key)}>
              <div className="flex flex-1 items-center justify-center">
                <DataErrorCard {...generalError} />
              </div>
              <MetricCardFooter chartError={generalError} />
            </MetricCardContainer>
          </SaveHtmlTreeContextWrapper>
        </MetricCardContextWrapper>
      </FeatureToggleContext>
    );
  },
};

export default meta;
