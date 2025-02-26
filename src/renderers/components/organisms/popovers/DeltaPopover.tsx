import type { DeltaQualityMode, DeltaValueFragment, DeltaValueMode } from "@/__generated__/dashboards-api";
import type { AvailableIcons } from "@/renderers/components/atoms/icons/types";
import { Typography } from "@/renderers/components/atoms/typographies/Typography";
import { Badge } from "@/renderers/components/molecules/badge/Badge";
import { numberFormat } from "@/utils/number-format";
import { percentFormat } from "@/utils/percent-format";
import type { FC } from "react";
import { Popover } from "../../molecules/popover/Popover";

export type DeltaPopoverProps = {
  delta: DeltaValueFragment;
  isTableDelta?: boolean;
};
export const DeltaPopover: FC<DeltaPopoverProps> = ({ delta, isTableDelta }) => {
  const {
    canHaveRelative,
    deltaRelative,
    deltaAbsolute,
    valueMode,
    currentDescriptor,
    pastDescriptor,
    qualityMode,
    currentValue,
    pastValue,
  } = delta;

  const qualityDescriptor = getDeltaQualityText(qualityMode);

  const badgeLabel = createBadgeLabel(delta, isTableDelta ? valueMode : undefined);
  const badgeColor = getBadgeColor(delta);
  const badgeIcon = getTrendIcon(delta);

  const qualityDescriptorColor = mapQualityToTextColor(delta);

  return (
    <Popover
      ariaLabel="Delta Popover"
      dataAnalyticsId="delta_popover"
      trigger={<Badge label={badgeLabel} size="lg" icon={badgeIcon} color={badgeColor} />}
      hover
      placement="right"
      containerClassName="flex max-w-64 flex-col gap-2.5 rounded-md p-3 shadow"
      content={
        <>
          <div>
            <div className="flex items-center justify-between gap-0.5">
              <Typography.Caption>Previous value</Typography.Caption>
              <Typography.CaptionBold>{pastValue}</Typography.CaptionBold>
            </div>
            <Typography.Caption color="disabled">{pastDescriptor}</Typography.Caption>
          </div>
          <div>
            <div className="flex items-center justify-between gap-0.5">
              <Typography.Caption>Current value</Typography.Caption>
              <Typography.CaptionBold>{currentValue}</Typography.CaptionBold>
            </div>
            <Typography.Caption color="disabled">{currentDescriptor}</Typography.Caption>
          </div>
          <div className="flex items-center justify-between gap-0.5">
            <Typography.Caption>Change</Typography.Caption>
            <div className="flex gap-2">
              <Typography.Caption color={qualityDescriptorColor}>{numberFormat(deltaAbsolute)}</Typography.Caption>
              {canHaveRelative && (
                <Typography.CaptionBold color={qualityDescriptorColor}>
                  {" "}
                  ({percentFormat(deltaRelative)})
                </Typography.CaptionBold>
              )}
            </div>
          </div>
          <hr className="border border-gray-200" />
          <Typography.Caption color="secondary">{qualityDescriptor}</Typography.Caption>
        </>
      }
    />
  );
};

function createBadgeLabel(deltaValue: DeltaValueFragment, forcedValueMode?: DeltaValueMode): string {
  const absoluteFormatter = numberFormat;
  const relativeFormatter = percentFormat;
  if (!forcedValueMode) {
    return deltaValue.canHaveRelative
      ? relativeFormatter(deltaValue.deltaRelative)
      : absoluteFormatter(deltaValue.deltaAbsolute);
  }

  if (forcedValueMode === "ABSOLUTE_ONLY") return absoluteFormatter(deltaValue.deltaAbsolute);

  return deltaValue.canHaveRelative ? relativeFormatter(deltaValue.deltaRelative) : "—";
}

export const DELTA_QUALITY_TEXT: Record<DeltaQualityMode, string> = {
  DIRECT: "An increasing change indicates improvement.",
  INVERSE: "A decreasing change indicates improvement.",
  NEUTRAL: "For this metric, improvement is not tied to an increase or decrease in change.",
};

function getDeltaQualityText(qualityMode: DeltaQualityMode) {
  const text = DELTA_QUALITY_TEXT[qualityMode];

  if (!text) throw new Error(`Unknown quality mode: ${qualityMode}`);

  return text;
}

const getBadgeColor = ({ quality, canHaveRelative, valueMode }: DeltaValueFragment) => {
  if (valueMode === "PREFER_RELATIVE" && !canHaveRelative) return "gray";
  if (quality === "BETTER") return "green";
  if (quality === "WORSE") return "red";
  if (quality === "NEUTRAL") return "gray";
  const _never: never = quality;
  throw new Error(`Unknown quality: ${_never}`);
};

const getTrendIcon = ({ increase, canHaveRelative, valueMode }: DeltaValueFragment): AvailableIcons | undefined => {
  if (valueMode === "PREFER_RELATIVE" && !canHaveRelative) return undefined;
  if (increase === "INCREASE") return "ArrowUpIcon";
  if (increase === "SAME") return "ArrowRightIcon";
  if (increase === "DECREASE") return "ArrowDownIcon";
  const _never: never = increase;
  throw new Error(`Unknown DeltaIncrease: ${_never}`);
};

function mapQualityToTextColor({ quality, valueMode, canHaveRelative }: DeltaValueFragment) {
  if (valueMode === "PREFER_RELATIVE" && !canHaveRelative) return "primary";
  if (quality === "BETTER") return "success";
  if (quality === "WORSE") return "error";
  if (quality === "NEUTRAL") return "primary";
  const _never: never = quality;
  throw new Error(`Unknown quality: ${_never}`);
}
