import { toISOString } from "@plandek-utils/ts-parse-dayjs";

import { getDateFromDatePointXString } from "@plandek/pkg-chart-data";

import type { UnprocessedDateRangeInput } from "@/__generated__/dashboards-api";

export function unprocessedDateRangeFromDatePoint(point: {
  xDateRangeFrom?: string | null;
  xDateRangeTo?: string | null;
}): UnprocessedDateRangeInput {
  return {
    from: point.xDateRangeFrom ? toISOString(getDateFromDatePointXString(point.xDateRangeFrom)) : null,
    to: point.xDateRangeTo ? toISOString(getDateFromDatePointXString(point.xDateRangeTo)) : null,
  };
}
