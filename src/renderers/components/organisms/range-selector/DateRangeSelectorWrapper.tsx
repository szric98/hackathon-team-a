import type { FunctionComponent } from "react";

import { useClientContext, useDataSetContext, useDateRangeContext } from "@/contexts/hooks";
import { SprintListForDataSetProvider } from "@/providers/SprintsListForDataSetProvider";

import { DateRangeSelector } from "./DateRangeSelector";

export const DateRangeSelectorWrapper: FunctionComponent = () => {
  const { dataSet } = useDataSetContext();
  const { clientData } = useClientContext();
  const { effective, raw, backgroundDateRange, updateDateRangeDataForDates, updateDateRangeDataForSprint } =
    useDateRangeContext();

  const client = clientData?.client;

  if (!dataSet) {
    console.warn("[DateRangeSelectorWrapper] no activeDataSet");
    return null;
  }

  if (!client) {
    console.warn("[DateRangeSelectorWrapper] no activeClient");
    return null;
  }

  return (
    <SprintListForDataSetProvider
      dataSet={dataSet}
      render={(sprintData) => (
        <DateRangeSelector
          raw={raw}
          effectiveDatesData={effective}
          backgroundDateRange={backgroundDateRange}
          updateDateRangeDataForDates={updateDateRangeDataForDates}
          updateDateRangeDataForSprint={updateDateRangeDataForSprint}
          dataSet={dataSet}
          sprintData={sprintData}
        />
      )}
    />
  );
};
