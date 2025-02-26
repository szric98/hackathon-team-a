import { TimeDefault, dayjsNow, parseDayjs } from "@plandek-utils/ts-parse-dayjs";

import type { DateRange } from "@/__generated__/dashboards-api";

import type { DateRangeStrict, DateRangeStrings, Options } from "./types";

/**
 * Clean and parse the date range.
 * If the dates in `from` and `to` have TIME inside, it will use it.
 * Otherwise, it will set `from` at the start of the day (UTC) and `to` at the end of the day (UTC)
 * @param dr
 * @param options
 * @param options.noFutureDay if true, it will check `to` and replace it with dayjsNow().endOf('day') if it beyond today
 */
export function cleanDateRange(dr: DateRangeStrict, options?: Options): DateRangeStrict;
export function cleanDateRange(dr: DateRange, options?: Options): DateRange;
export function cleanDateRange(dr: DateRangeStrings, options?: Options): DateRange;
export function cleanDateRange(dr: DateRange | DateRangeStrings, { noFutureDay = false }: Options = {}): DateRange {
  let from = parseDayjs(dr.from, { time: TimeDefault.StartOfDayIfMissing });
  let to = parseDayjs(dr.to, { time: TimeDefault.EndOfDayIfMissing });

  // flip them if they are reversed
  if (from && to && from.isAfter(to)) {
    // parse again so that we can apply the changes in time
    from = parseDayjs(dr.to, { time: TimeDefault.StartOfDayIfMissing });
    to = parseDayjs(dr.from, { time: TimeDefault.EndOfDayIfMissing });
  }

  // avoid future
  if (noFutureDay && to) {
    const now = dayjsNow();
    to = to.isAfter(now, "date") ? now : to;
  }

  return { from, to };
}
