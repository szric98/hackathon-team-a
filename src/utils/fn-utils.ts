/**
 * Calls the given functions in the order they were passed. If a function is undefined or null, it is skipped.
 * @param fns a list of functions
 * @returns a new function that calls the functions in the order they were passed
 */
export const callInOrder = (...fns: Array<VoidFunction | undefined | null>) => {
  return () => {
    for (const fn of fns) fn?.();
  };
};
