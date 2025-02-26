import type { VolatilityDetail } from "@/__generated__/dashboards-api";

export const LowVolatility: VolatilityDetail = {
  volatilityScore: "LOW",
  volatility: 5,
  dataAdjustment: "NORMAL",
  mean: 3.5,
  originalMean: 3.5,
  standardDeviation: 1.5,
  values: [10, 12, 23, 23, 16, 23, 21, 16],
};

export const MediumVolatility: VolatilityDetail = { ...LowVolatility, volatility: 17, volatilityScore: "MEDIUM" };
export const HighVolatility: VolatilityDetail = { ...LowVolatility, volatility: 33, volatilityScore: "HIGH" };
export const NoDataVolatility: VolatilityDetail = {
  ...LowVolatility,
  volatility: undefined,
  volatilityScore: "N_A_NOT_ENOUGH_DATA",
};
