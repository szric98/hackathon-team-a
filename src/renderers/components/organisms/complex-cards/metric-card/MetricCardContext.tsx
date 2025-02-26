import type { UIDashboardCard } from "@/data-transformers/dashboard-card-fragment";
import { type FC, type PropsWithChildren, createContext, use } from "react";

const MetricCardContext = createContext<UIDashboardCard | null>(null);

export const MetricCardContextWrapper: FC<PropsWithChildren<{ card: UIDashboardCard }>> = ({ children, card }) => {
  return <MetricCardContext.Provider value={card}>{children}</MetricCardContext.Provider>;
};

export const useMetricCardContext = () => {
  const ctx = use(MetricCardContext);
  if (!ctx) throw new Error("Metric card context not found");
  return ctx;
};
