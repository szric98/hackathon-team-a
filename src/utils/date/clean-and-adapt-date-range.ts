import { dayjsNow, isTodayOrFuture } from "@plandek-utils/ts-parse-dayjs";

import { cleanDateRange } from "./clean-date-range";
import type { DateRangeStrict } from "./types";

export function cleanAndAdaptDateRange({ from, to }: DateRangeStrict): DateRangeStrict {
  const validFrom = isTodayOrFuture(from) ? dayjsNow() : from;
  const validTo = isTodayOrFuture(to) ? dayjsNow() : to;

  return cleanDateRange({ from: validFrom.startOf("date"), to: validTo.endOf("date") });
}
