import { TimeDefault, parseDayjs } from "@plandek-utils/ts-parse-dayjs";

import type { GenericMetricInputMin } from "@/__generated__/dashboards-api";

import { PresetDatePeriodKeys } from "@/constants/date-granularity";

import { getDateRangeFromPreset } from "./date-range";
import type { DateRangeData, DateRangeStrict, EffectiveDatesData } from "./types";

function calculateDatePeriod(input: { timeQuery: string; datePeriodKey: PresetDatePeriodKeys }): DateRangeStrict {
  if (input.datePeriodKey === PresetDatePeriodKeys.Custom) {
    const [from, to] = input.timeQuery.split("_");
    const parsedFrom = parseDayjs(from, { time: TimeDefault.StartOfDayIfMissing });
    const parsedTo = parseDayjs(to, { time: TimeDefault.EndOfDayIfMissing });

    if (parsedFrom && parsedTo) {
      return { from: parsedFrom, to: parsedTo };
    }
  }

  return getDateRangeFromPreset(input.datePeriodKey);
}

export function dateRangeDataFromRaw(raw: DateRangeData["raw"]): DateRangeData {
  const { timeQuery, datePeriodKey, sprintKey, pastSprintKey, granularity } = raw;
  const dateRange = calculateDatePeriod({ timeQuery: timeQuery ?? datePeriodKey, datePeriodKey });

  let effective: EffectiveDatesData;
  let genericMetricInputMin: GenericMetricInputMin;
  if (sprintKey) {
    effective = { type: "sprint", granularity, sprintKey, pastSprintKey };
    genericMetricInputMin = {
      granularity,
      dateRange: null,
      sprintKey,
      pastSprintKey,
    };
  } else {
    effective = { type: "dates", granularity, dateRange };
    genericMetricInputMin = {
      granularity,
      dateRange,
      sprintKey: null,
      pastSprintKey: null,
    };
  }

  return {
    effective,
    genericMetricInputMin,
    backgroundDateRange: dateRange,
    raw,
  };
}
