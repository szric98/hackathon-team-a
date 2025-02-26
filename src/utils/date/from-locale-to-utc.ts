import { TimeOverride, isValidDate, parseDayjsOrError } from "@plandek-utils/ts-parse-dayjs";
import type { Dayjs } from "dayjs";

export function fromLocaleToUTC(date: Date | null): Dayjs | null {
  if (!(date && isValidDate(date))) {
    return null;
  }
  // Converting to string, to avoid locale issues and create UTC based date
  const newDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
  return parseDayjsOrError(newDate, { time: TimeOverride.StartOfDay });
}
