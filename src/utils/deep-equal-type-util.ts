/**
 * Utility type for deep comparison
 *
 * use it for checking the compatibility of the schema with the type:
 * e.g.:
 *   // If there is a type mismatch, TypeScript will throw an error here
 *   const _checkGridLine: DeepEqual<z.infer<typeof gridLineSchema>, GridLine> = true;
 */
export type DeepEqual<T, U> = (T extends U ? (U extends T ? true : never) : never) &
  (keyof T extends keyof U ? (keyof U extends keyof T ? true : never) : never);
