import { get } from "es-toolkit/compat";

export function strictGet<T extends object, K extends keyof T>(object: T, path: K | readonly [K]): T[K] {
  const value = get(object, path);
  if (value === undefined) throw new Error(`Value not found at path: ${String(path)}`);
  return value;
}

export function strictFind<T>(array: T[], predicate: (value: T, index: number, obj: T[]) => boolean): T {
  const value = array.find(predicate);
  if (value === undefined) throw new Error("Value not found");
  return value;
}
