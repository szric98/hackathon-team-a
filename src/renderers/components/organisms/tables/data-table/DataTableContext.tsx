import type {
  DataTableColumn,
  DataTableFragment,
  DrilldownInputForCell,
  DrilldownInputForExplore,
} from "@/__generated__/dashboards-api";
import type { TableVisibilityChecks } from "@/charts/hook/use-visibility-data";
import { type FC, type PropsWithChildren, createContext, useContext } from "react";

type DrilldownFn<T> = (keys: { rowKey: string; column: DataTableColumn; drilldownInput: T }) => void;
export type OnCellDrilldownClick = DrilldownFn<DrilldownInputForCell>;
export type OnCellExploreClick = DrilldownFn<DrilldownInputForExplore>;

export const DataTableContext = createContext<DataTableContextProps | null>(null);

export type DataTableContextProps = {
  data: DataTableFragment;
  visibility: TableVisibilityChecks | null;
  onCellDrilldownClick?: OnCellDrilldownClick;
  onCellExploreClick: OnCellExploreClick;
};

export const DataTableContextWrapper: FC<PropsWithChildren<DataTableContextProps>> = ({ children, ...props }) => {
  return <DataTableContext.Provider value={props}>{children}</DataTableContext.Provider>;
};

export const useDataTableContext = () => {
  const context = useContext(DataTableContext);
  if (!context) {
    throw new Error("Data tables context is not provided");
  }
  return context;
};
