import { numberFormat } from "./number-format";

export const DEFAULT_FORMAT = "0,0.00";

export function percentFormat(
  number: number | string | null | undefined,
  signed = true,
  format: string = DEFAULT_FORMAT,
  forceDecimal = true,
): string {
  if (number === undefined || number === null || number === "") {
    return "";
  }

  if (Number.isNaN(Number.parseInt(`${number}`, 10))) {
    console.warn("Number format: `number` parsed as `NaN`.");

    return "NaN";
  }

  if (typeof format !== "string") {
    console.warn("Number format: It's advisable that `format` be a string.");
  }

  let effectiveFormat = format;
  if (signed && number !== 0) {
    effectiveFormat = `+${format}`;
  }

  return `${numberFormat(number, { format: effectiveFormat, forceDecimal })}%`;
}
