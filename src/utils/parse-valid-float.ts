import { isNull, isString, isUndefined } from "es-toolkit";
import type { AnyFunc } from "simplytyped";

export class InvalidNumberError extends Error {}

/**
 * parse value as a finite number, returning null if not possible.
 *
 * ```
 * parseValidFloat(1.1) // => 1.1
 * parseValidFloat("1.1") // => 1.1
 * parseValidFloat(null) // => null
 * parseValidFloat(undefined) // => null
 * parseValidFloat(NaN) // => null
 * parseValidFloat("") // => null
 * parseValidFloat(Infinity) // => null
 * parseValidFloat([]) // => null
 * parseValidFloat({}) // => null
 * ```
 * @param v
 */
export function parseValidFloat(v: null | undefined | Record<string, unknown> | AnyFunc): null;
export function parseValidFloat(v: string | number): number | null;
export function parseValidFloat(v: unknown): number | null;
export function parseValidFloat(v: unknown): number | null {
  if (typeof v === "number" && Number.isFinite(v)) return v;
  if (isString(v)) {
    const x = Number.parseFloat(v);
    if (Number.isFinite(x)) return x;
  }

  return null;
}

/**
 * parse value as a finite number, throwing InvalidNumberError if not possible.
 *
 * ```
 * parseValidFloatStrict(1.1) // => 1.1
 * parseValidFloatStrict("1.1") // => 1.1
 * parseValidFloatStrict(null) // => throws InvalidNumberError
 * parseValidFloatStrict(undefined) // => throws InvalidNumberError
 * parseValidFloatStrict(NaN) // => throws InvalidNumberError
 * parseValidFloatStrict("") // => throws InvalidNumberError
 * parseValidFloatStrict(Infinity) // => throws InvalidNumberError
 * parseValidFloatStrict([]) // => throws InvalidNumberError
 * parseValidFloatStrict({}) // => throws InvalidNumberError
 * ```
 * @param v
 */
export function parseValidFloatStrict(v: unknown): number {
  const parsed = parseValidFloat(v);
  if (typeof parsed === "number") return parsed;

  throw new InvalidNumberError("value cannot be parsed as a valid number");
}

/**
 * parse value as a finite number, returning null if the value is `null`, `undefined` or `""`, and throwing InvalidNumberError in any other invalid case.
 *
 * ```
 * parseValidFloatOptional(1.1) // => 1.1
 * parseValidFloatOptional("1.1") // => 1.1
 * parseValidFloatOptional(null) // => null
 * parseValidFloatOptional(undefined) // => null
 * parseValidFloatOptional("") // => null
 * parseValidFloatOptional(NaN) // => throws InvalidNumberError
 * parseValidFloatOptional(Infinity) // => throws InvalidNumberError
 * parseValidFloatOptional([]) // => throws InvalidNumberError
 * parseValidFloatOptional({}) // => throws InvalidNumberError
 * ```
 * @param v
 */
export function parseValidFloatOptional(v: null | undefined | ""): null;
export function parseValidFloatOptional(v: Exclude<string, ""> | number): number | null;
export function parseValidFloatOptional(v: unknown): number | null;
export function parseValidFloatOptional(v: unknown): number | null {
  if (isNull(v) || isUndefined(v) || v === "") return null;
  return parseValidFloatStrict(v);
}
