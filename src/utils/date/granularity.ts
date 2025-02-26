import type { DayjsInput, GranularityEnumValues } from "@plandek-utils/ts-parse-dayjs";
import { parseDayjs } from "@plandek-utils/ts-parse-dayjs";
import type { Dayjs } from "dayjs";

import type { Granularity } from "@/__generated__/dashboards-api";
import type { DeepEqual } from "@/utils/deep-equal-type-util";

export const _checkGranularity: DeepEqual<GranularityEnumValues, Granularity> = true;

export const GranularitySortedList: Granularity[] = ["day", "week", "month", "year"];

function countGranularityBuckets(from: DayjsInput, to: DayjsInput, granularity: Granularity): number {
  let difference = 0;
  const fromDate = parseDayjs(from);
  const toDate = parseDayjs(to);

  if (!(fromDate && toDate)) return 1;

  if (granularity === "day") {
    difference = fromDate.diff(toDate, "day");
  }

  if (granularity === "week") {
    difference = fromDate.diff(toDate, "week");
  }

  if (granularity === "month") {
    difference = fromDate.diff(toDate, "month");
  }

  if (granularity === "year") {
    difference = fromDate.diff(toDate, "year");
  }

  return Math.abs(difference) + 1;
}

const maxBuckets = 40;

function findLargerGranularity(granularity: Granularity): Granularity {
  if (granularity === "year") return granularity;

  const index = GranularitySortedList.indexOf(granularity);
  if (!granularity || index < 0) return "day";

  return GranularitySortedList[index + 1] ?? "day";
}

function adaptForMaxBuckets(from: DayjsInput, to: DayjsInput, candidateGranularity: Granularity): Granularity {
  if (candidateGranularity === "year") return candidateGranularity;
  if (countGranularityBuckets(from, to, candidateGranularity) <= maxBuckets) return candidateGranularity;

  const newCandidate = findLargerGranularity(candidateGranularity);
  return adaptForMaxBuckets(from, to, newCandidate);
}

type Params = { from?: DayjsInput; to?: DayjsInput };
type StrictParams = Params & { from: Dayjs; to: Dayjs };
type BlankParams = Params & ({ from?: null } | { to?: null } | { from?: null; to?: null });

export function calculateGranularityFromDateRange(range: StrictParams): Granularity;
export function calculateGranularityFromDateRange(range: BlankParams): null;
export function calculateGranularityFromDateRange(range: Params): Granularity | null;
export function calculateGranularityFromDateRange({ from, to }: Params): Granularity | null {
  if (!(from && to)) {
    console.error("calculateGranularityFromDateRange requires a DateRange.from and DateRange.to");
    return null;
  }

  return adaptForMaxBuckets(from, to, "day");
}
