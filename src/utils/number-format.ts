// NOTE: this assumes we will not want more than 2 dp
// NOTE: this assumes we will not want any trailing 0's
import numeral from "numeral";

export const DEFAULT_FORMAT_INT = "0,0";
export const DEFAULT_FORMAT_2DEC = "0,0.00";
export const DEFAULT_FORMAT = DEFAULT_FORMAT_2DEC;

type NumberFormatOptions = {
  format: string;
  forceDecimal: boolean;
};

export function numberFormatInt(number: number | string) {
  return numberFormat(number, { format: DEFAULT_FORMAT_INT, forceDecimal: false });
}

export function numberFormatDecimalForced(number: number | string) {
  return numberFormat(number, { format: DEFAULT_FORMAT_2DEC, forceDecimal: true });
}

export function numberFormatDecimal(number: number | string) {
  return numberFormat(number, { format: DEFAULT_FORMAT_2DEC, forceDecimal: false });
}

export function numberFormat(
  number: number | string,
  options: NumberFormatOptions = { format: DEFAULT_FORMAT, forceDecimal: false },
) {
  const { format, forceDecimal } = options;

  if (Number.isNaN(Number.parseInt(number as string, 10))) {
    console.warn(`Number format: '${number}' parsed as 'NaN'.`);
    return "NaN";
  }

  const formatted = numeral(number).format(format);

  if (forceDecimal) return formatted;

  return removeRightZeroes(formatted);
}

function removeRightZeroes(formatted: string): string {
  if (!formatted.includes(".")) return formatted;

  let temp = `${formatted}`;
  while (temp[temp.length - 1] === "0") {
    temp = temp.slice(0, -1);
  }
  if (temp[temp.length - 1] === ".") {
    temp = temp.slice(0, -1);
  }
  return temp;
}
