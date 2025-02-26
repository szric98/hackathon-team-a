export function disableStoryArgs(...args: string[]) {
  return args.reduce(
    (acc, arg) => {
      acc[arg] = {
        table: {
          disable: true,
        },
      };
      return acc;
    },
    {} as Record<string, object>,
  );
}
