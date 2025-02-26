import type { CardSizeType } from "@/__generated__/dashboards-api";
import { ySizeFromCardSize } from "@/charts/chart-render/utils/card-size-for";
import { yHeightFromSize } from "@/charts/chart-render/utils/size-style-utils";
import type { DescriptiveChartError } from "@/charts/hook/use-prepare-chart-data";
import { openGiveFeedback } from "@/utils/intercom";
import type { FC } from "react";
import { DataErrorCard } from "../data-error-card/DataErrorCard";
import { MetricCardContainer } from "./MetricCardContainer";
import { MetricCardFooter } from "./MetricCardFooter";

const generalError: DescriptiveChartError = {
  title: "Something went wrong with this metric.",
  description: "Please contact support",
  recovery: { text: "Contact Support", onClick: openGiveFeedback },
};

export type MetricCardErrorFallbackProps = { className: string; size: CardSizeType };
export const MetricCardErrorFallback: FC<MetricCardErrorFallbackProps> = ({ className, size }) => {
  const ySize = ySizeFromCardSize(size);
  const height = yHeightFromSize(ySize);

  return (
    <MetricCardContainer className={className}>
      <div className="flex flex-1 items-center justify-center" style={{ height }}>
        <DataErrorCard {...generalError} />
      </div>
      <MetricCardFooter chartError={generalError} />
    </MetricCardContainer>
  );
};
