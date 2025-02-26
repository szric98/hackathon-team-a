import { type Dayjs, TimeDefault, dayjsNow, parseDayjs, parseFromStandardPeriods } from "@plandek-utils/ts-parse-dayjs";

import type { DateRange, UnprocessedDateRangeInputType } from "@/__generated__/dashboards-api";

export function parseDateRange(dr: UnprocessedDateRangeInputType): DateRange {
  return {
    from: parseDayjs(dr.from),
    to: parseDayjs(dr.to),
  };
}

type DateRangeStrict = { from: Dayjs; to: Dayjs };
type Options = { noFutureDay?: boolean };
/**
 * Clean and parse the date range.
 * If the dates in `from` and `to` have TIME inside, it will use it.
 * Otherwise, it will set `from` at the start of the day (UTC) and `to` at the end of the day (UTC)
 * @param dr
 * @param options
 * @param options.noFutureDay if true, it will check `to` and replace it with dayjsNow().endOf('day') if it beyond today
 */
function cleanDateRange(dr: DateRangeStrict, options?: Options): DateRangeStrict {
  let from = parseDayjs(dr.from, { time: TimeDefault.StartOfDayIfMissing });
  let to = parseDayjs(dr.to, { time: TimeDefault.EndOfDayIfMissing });

  // flip them if they are reversed
  if (from && to && from.isAfter(to)) {
    // parse again so that we can apply the changes in time
    from = parseDayjs(dr.to, { time: TimeDefault.StartOfDayIfMissing });
    to = parseDayjs(dr.from, { time: TimeDefault.EndOfDayIfMissing });
  }

  // avoid future
  if (options?.noFutureDay && to) {
    const now = dayjsNow();
    to = to.isAfter(now, "date") ? now : to;
  }

  if (!(from && to)) {
    throw new Error("Invalid date range");
  }

  return { from, to };
}

export function getDateRangeFromPreset(value: string): DateRangeStrict {
  const range = parseFromStandardPeriods(value);

  if (!range) {
    throw new Error(`default standard period does not produce a valid range: ${value}`);
  }

  return cleanDateRange(range, { noFutureDay: true });
}
