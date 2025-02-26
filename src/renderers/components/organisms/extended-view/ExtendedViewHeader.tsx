import type { GenericSummaryResponseFragment } from "@/__generated__/dashboards-api";
import { Button } from "@/renderers/components/molecules/button/Button";
import { type SummaryValueClickFn, SummaryValues } from "@/renderers/components/organisms/summary-values/SummaryValues";
import type { FC } from "react";

export type ExtendedViewHeaderProps = {
  generalSummaries: Array<GenericSummaryResponseFragment>;
  onSummaryClick: SummaryValueClickFn;
  onClickSettings: () => void;
};

export const ExtendedViewHeader: FC<ExtendedViewHeaderProps> = (props) => {
  const { generalSummaries, onSummaryClick, onClickSettings } = props;

  return (
    <div className="flex items-center justify-between border-gray-200 border-b pb-4">
      <SummaryValues type="EV" generalSummaries={generalSummaries} onClick={onSummaryClick} />

      <Button.Icon
        icon="CogIcon"
        dataAnalyticsId="ev-page__settings-button"
        color="alternative"
        ariaLabel="Settings"
        onClick={onClickSettings}
      />
    </div>
  );
};
