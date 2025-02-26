import type { CardSizeType } from "@/__generated__/dashboards-api";
import { ySizeFromCardSize } from "@/charts/chart-render/utils/card-size-for";
import { yHeightFromSize } from "@/charts/chart-render/utils/size-style-utils";
import { Skeleton } from "@/renderers/components/atoms/skeleton/Skeleton";
import type { FC } from "react";
import { MetricCardContainer } from "./MetricCardContainer";

export type MetricCardLoadingFallbackProps = { className: string; size: CardSizeType };
export const MetricCardLoadingFallback: FC<MetricCardLoadingFallbackProps> = ({ className, size }) => {
  const ySize = ySizeFromCardSize(size);
  const height = yHeightFromSize(ySize);

  return (
    <MetricCardContainer className={className}>
      <div className="flex items-center justify-between border-gray-200 border-b pb-4">
        <div className="flex overflow-hidden">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-60 rounded-md" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-16 rounded-md" />
              <Skeleton className="h-6 w-16 rounded-md" />
            </div>
          </div>
        </div>
        <div className="inline-flex gap-2 self-start">
          <Skeleton className="size-8 rounded-full" />
          <Skeleton className="size-8 rounded-full" />
        </div>
      </div>
      <div className="flex h-full w-full gap-6">
        <Skeleton style={{ height }} className="w-full rounded-t-md" />
      </div>
      <div className="flex items-end border-gray-200 border-t pt-5">
        <div className="ml-auto flex items-center gap-1.5">
          <Skeleton className="h-4 w-16 rounded-md" />
        </div>
      </div>
    </MetricCardContainer>
  );
};
