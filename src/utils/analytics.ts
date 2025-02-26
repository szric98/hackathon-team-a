// biome-ignore lint/suspicious/noExplicitAny: This is the easiest way to handle it
export function useCheckForAnalyticsId(props: any) {
  if ((props?.onClick || props?.href) && !props?.dataAnalyticsId) {
    throw new Error("You must pass a dataAnalyticsId prop when this component is clickable");
  }
}

export function createAnalyticsId(tag: string) {
  return tag.replaceAll(" ", "-").toLowerCase();
}
