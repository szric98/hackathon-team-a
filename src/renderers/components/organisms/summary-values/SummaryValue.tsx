import type { FC } from "react";
import { twMerge } from "tailwind-merge";

import type { GenericSummaryResponseFragment } from "@/__generated__/dashboards-api";
import { Typography } from "@/renderers/components/atoms/typographies/Typography";
import { WithTooltip } from "@/renderers/components/molecules/tooltip/WithTooltip";
import { DeltaPopover } from "@/renderers/components/organisms/popovers/DeltaPopover";
import type { SummaryValuesProps } from "@/renderers/components/organisms/summary-values/SummaryValues";
import { numberFormatDecimal } from "@/utils/number-format";

import { useModalState } from "@/hooks/use-modal-state";
import { isMetricResultRecordError } from "@plandek/pkg-metric-utils";
import { LearnMoreLink } from "../../molecules/learn-more-link/LearnMoreLink";
import { VolatilityBadge, VolatilityModal } from "../modals/volatility-modal/VolatilityModal";

type SummaryValueProps = Pick<SummaryValuesProps, "type" | "onClick"> & {
  generalSummary: GenericSummaryResponseFragment;
};
export const SummaryValue: FC<SummaryValueProps> = ({ type, onClick, generalSummary }) => {
  const { isOpen: isVolatilityModalOpen, openFn: openVolatilityModal, closeFn: closeVolatilityModal } = useModalState();

  const dataRecord = generalSummary.dataRecord;
  const { label, articleId } = generalSummary;

  const summaryLabel = (
    <WithTooltip
      Component={getLabelTypography(type)}
      componentProps={{
        className: twMerge("truncate-clip", getExtraLabelClassName(type)),
        children: label,
        color: getLabelColorForType(type),
      }}
      tooltipProps={{ title: label }}
    />
  );

  if (isMetricResultRecordError(dataRecord)) {
    console.info("General summary error", generalSummary);
    return <div className="truncate-clip flex flex-col gap-2.5">{summaryLabel}</div>;
  }

  const { summary, summarySuffix, delta, volatility, volatilityPast1, volatilityPast2 } = dataRecord;

  const value = formatSummaryValue(summary, summarySuffix);
  const ValueTypography = getValueTypography(type);

  return (
    <div className="flex flex-col gap-2.5 overflow-hidden">
      <div className="flex gap-2">
        {summaryLabel} <LearnMoreLink articleId={articleId} />
      </div>
      {value && (
        <div className="flex items-center gap-2">
          <ValueTypography
            color={type === "DASHBOARD" ? "secondary" : "primary"}
            onClick={() => onClick(generalSummary)}
            className="text-nowrap"
          >
            {value}
          </ValueTypography>
          {delta && <DeltaPopover delta={delta} />}
          {volatility && (
            <>
              <VolatilityBadge volatility={volatility.volatilityScore} onClick={openVolatilityModal} />
              <VolatilityModal
                show={isVolatilityModalOpen}
                onClose={closeVolatilityModal}
                volatility={volatility}
                past1={volatilityPast1}
                past2={volatilityPast2}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

const getExtraLabelClassName = (type: SummaryValueProps["type"]) => {
  if (type === "DASHBOARD") return "";
  if (type === "EV") return "uppercase";
  const _never: never = type;
  throw new Error(`Unexpected type: ${_never}`);
};

const getLabelColorForType = (type: SummaryValueProps["type"]) => {
  if (type === "DASHBOARD") return "primary";
  if (type === "EV") return "secondary";
  const _never: never = type;
  throw new Error(`Unexpected type: ${_never}`);
};

const getLabelTypography = (type: SummaryValueProps["type"]) => {
  if (type === "DASHBOARD") return Typography.Heading3;
  if (type === "EV") return Typography.CaptionMedium;
  const _never: never = type;
  throw new Error(`Unexpected type: ${_never}`);
};

const getValueTypography = (type: SummaryValueProps["type"]) => {
  if (type === "DASHBOARD") return Typography.Body;
  if (type === "EV") return Typography.Heading1;
  const _never: never = type;
  throw new Error(`Unexpected type: ${_never}`);
};

const formatSummaryValue = (value?: number | null, suffix?: string | null): string | null => {
  if (typeof value !== "number") return null;
  let formattedValue = numberFormatDecimal(value);
  if (suffix) formattedValue += ` ${suffix}`;

  return formattedValue;
};
