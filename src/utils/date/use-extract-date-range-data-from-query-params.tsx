import { useMemo } from "react";
import { $enum } from "ts-enum-util";

import { isGranularity } from "@/__generated__/dashboards-api";

import { PresetDatePeriodKeys, defaultDatePeriodKey, defaultGranularity } from "@/constants/date-granularity";
import { URLQueryParams } from "@/hooks/use-navigation";

import { dateRangeDataFromRaw } from "./date-range-data-from-raw";
import type { DateRangeData } from "./types";

function toPresetDatePeriodKey(value: "" | null): null;
function toPresetDatePeriodKey(value: string): PresetDatePeriodKeys;
function toPresetDatePeriodKey(value: string | null): PresetDatePeriodKeys | null;
function toPresetDatePeriodKey(value: string | null): PresetDatePeriodKeys | null {
  if (!value) return null;

  return $enum(PresetDatePeriodKeys).asValueOrDefault(value, PresetDatePeriodKeys.Custom);
}

function rawParamsFromQueryParams(queryParams: URLSearchParams): DateRangeData["raw"] {
  const raw = queryParams.get(URLQueryParams.granularity);
  const granularity = isGranularity(raw) ? raw : defaultGranularity;
  const sprintKey = queryParams.get(URLQueryParams.sprintKey) || null;
  const pastSprintKey = queryParams.get(URLQueryParams.pastSprintKey) || null;

  const timeQuery = queryParams.get(URLQueryParams.time) || defaultDatePeriodKey;
  return { granularity, sprintKey, pastSprintKey, timeQuery, datePeriodKey: toPresetDatePeriodKey(timeQuery) };
}

export function useExtractDateRangeDataFromQueryParams(queryParams: URLSearchParams): DateRangeData {
  const { timeQuery, datePeriodKey, sprintKey, pastSprintKey, granularity } = rawParamsFromQueryParams(queryParams);

  return useMemo(() => {
    return dateRangeDataFromRaw({ timeQuery, datePeriodKey, sprintKey, pastSprintKey, granularity });
  }, [timeQuery, datePeriodKey, sprintKey, pastSprintKey, granularity]);
}
