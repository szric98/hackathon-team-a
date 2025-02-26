import type { Dayjs } from "dayjs";

import type { DateRange, GenericMetricInputMin, Granularity } from "@/__generated__/dashboards-api";

import type { PresetDatePeriodKeys } from "@/constants/date-granularity";

export type DateRangeStrings = { from: string; to: string };
export type DateRangeStrict = { from: Dayjs; to: Dayjs };

export type Options = { noFutureDay?: boolean };

export type EffectiveDatesDataDateRange = { type: "dates"; granularity: Granularity; dateRange: DateRangeStrict };
export type EffectiveDatesDataSprint = {
  type: "sprint";
  granularity: Granularity;
  sprintKey: string;
  pastSprintKey: string | null;
};

export type EffectiveDatesData = EffectiveDatesDataDateRange | EffectiveDatesDataSprint;

export type DateRangeData = {
  effective: EffectiveDatesData;
  genericMetricInputMin: GenericMetricInputMin;
  backgroundDateRange: DateRange;
  raw: {
    datePeriodKey: PresetDatePeriodKeys;
    granularity: Granularity;
    pastSprintKey: string | null;
    sprintKey: string | null;
    timeQuery: string | null;
  };
};
