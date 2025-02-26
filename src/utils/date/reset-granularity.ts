import type { Granularity } from "@/__generated__/dashboards-api";

export function resetGranularity(activeGranularity: Granularity, enabledGranularities: Granularity[]): Granularity {
  if (enabledGranularities.includes(activeGranularity)) {
    return activeGranularity;
  }
  return "day";
}
