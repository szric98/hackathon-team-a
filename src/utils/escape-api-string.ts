import { filterNones } from "@plandek-utils/safe-compact";
import { isString } from "es-toolkit";

// BASED ON glimmer's escapeExpression, but replacing with different chars (unicode).

const ESCAPE_MAP: Record<string, string> = {
  "<": "﹤", // SMALL < sign (U+FE64)
  ">": "﹥", // SMALL > sign (U+FE65)
  "`": "｀", // Fullwidth Grave Accent (U+FF40)
  "'": "＇", // Fullwidth Apostrophe (U+FF07)
  '"': "＂", // Fullwidth Quotation Mark (U+0022)
  "&": "﹠", // Small Ampersand (U+FE60)
  "=": "﹦", // Small Equals Sign (U+FE66)
  "(": "﹙", // Small Left Parenthesis (U+FE59)
  ")": "﹚", // Small Right Parenthesis (U+FE5A)
  ";": "﹔", // Small Semicolon (U+FE54)
  ":": "﹕", // Small Colon (U+FE55)
  "{": "﹛", // Small Left Curly Bracket (U+FE5C)
  "}": "﹜", // Small Right Curly Bracket (U+FE5C)
};

const POSSIBLE_CHARS = /[<>]/;
const BAD_CHARS = /[<>]/g;

function escapeChar(chr: string): string {
  return ESCAPE_MAP[chr] || chr;
}

export function escapeApiString(given: string): string;
export function escapeApiString(given: null | undefined): null;
export function escapeApiString(given: null | string | undefined): string | null;
export function escapeApiString(given: null | string | undefined): string | null {
  if (!isString(given)) return null;

  if (!POSSIBLE_CHARS.test(given)) return given;
  return `${given}`.replace(BAD_CHARS, escapeChar);
}

export function escapeApiStringList(given: string[] | ReadonlyArray<string> | null | undefined): string[] {
  if (!given) return [];
  const list = Array.isArray(given) ? given : [given];
  return filterNones(list.map((x) => (isString(x) ? escapeApiString(x) : null)));
}
