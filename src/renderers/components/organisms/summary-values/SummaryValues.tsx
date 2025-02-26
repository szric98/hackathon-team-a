import { type FC, Fragment } from "react";
import { v4 } from "uuid";

import type { GenericSummaryResponseFragment } from "@/__generated__/dashboards-api";

import { SummaryValue } from "./SummaryValue";

export type SummaryValueClickFn = (generalSummary: GenericSummaryResponseFragment) => void;
export type SummaryValuesProps = {
  type: "DASHBOARD" | "EV";
  onClick: SummaryValueClickFn;
  generalSummaries: GenericSummaryResponseFragment[];
};

export const SummaryValues: FC<SummaryValuesProps> = ({ type, onClick, generalSummaries }) => {
  return (
    <div className="flex w-full min-w-0">
      {generalSummaries.map((generalSummary, index) => (
        <Fragment key={v4()}>
          <SummaryValue type={type} onClick={onClick} generalSummary={generalSummary} />
          {index !== generalSummaries.length - 1 && (
            <div className="flex justify-center">
              <div className="mx-4 h-full w-px bg-gray-200" />
            </div>
          )}
        </Fragment>
      ))}
    </div>
  );
};
