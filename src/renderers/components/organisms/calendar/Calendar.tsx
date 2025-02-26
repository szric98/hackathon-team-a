import { parseDayjs } from "@plandek-utils/ts-parse-dayjs";
import { kebabCase } from "es-toolkit";
import type { FunctionComponent } from "react";
import { useMemo } from "react";

import { DateInput } from "../../molecules/inputs/date-input/DateInput";

export type CalendarVariantType = "daily" | "weekly" | "monthly" | "yearly";
export interface Props {
  label?: string;
  value: Date | null;
  minDate?: Date;
  helperTextOverride?: string | false;
  onChange: (date: Date | null) => void;
  variant?: CalendarVariantType;
  size?: "small" | "large";
  fullWidth?: boolean;
  disableFuture?: boolean;
  disabled?: boolean;
}

export const Calendar: FunctionComponent<Props> = ({
  label,
  value,
  minDate,
  onChange,
  variant = "daily",
  disabled,
}) => {
  const newMinDate = useMemo(() => {
    let parsedDate = minDate && parseDayjs(new Date(minDate).setHours(8));
    if (variant === "weekly") {
      parsedDate = parsedDate?.startOf("week") ?? null;
    }
    if (variant === "monthly") {
      parsedDate = parsedDate?.startOf("month") ?? null;
    }
    if (variant === "yearly") {
      parsedDate = parsedDate?.startOf("year") ?? null;
    }
    return parsedDate?.toDate();
  }, [minDate, variant]);

  const handleOnChange = (date: Date | null) => {
    let parsedDate = date && parseDayjs(new Date(date).setHours(8));
    if (variant === "weekly") {
      parsedDate = parsedDate?.startOf("week") ?? null;
    }
    if (variant === "monthly") {
      parsedDate = parsedDate?.startOf("month") ?? null;
    }
    if (variant === "yearly") {
      parsedDate = parsedDate?.startOf("year") ?? null;
    }
    onChange(parsedDate?.toDate() ?? null);
  };

  return (
    <DateInput
      ariaLabel="date_picker"
      value={value}
      dataAnalyticsId={`date-picker__field--${kebabCase(label ?? "")}`}
      minDate={newMinDate}
      maxDate={new Date()}
      label={label}
      onChange={handleOnChange}
      disabled={disabled}
    />
  );
};
