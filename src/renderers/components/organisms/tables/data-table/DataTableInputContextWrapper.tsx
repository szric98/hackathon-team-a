import { type FC, type PropsWithChildren, createContext, use, useReducer } from "react";

import type { DataTableInput, DataTableSort } from "@/__generated__/dashboards-api";

const INITIAL_DATA_TABLE_INPUT: DataTableInput = {
  search: "",
  pageSize: 10,
  page: 0,
};

export type PublishDataTableEventFn = (event: DataTableEvent) => void;

type DataTableEvent =
  | { type: "RESET"; payload: null }
  | { type: "SEARCH"; payload: { search: string } }
  | { type: "SORT"; payload: { columnKey: string; order: DataTableSort } }
  | { type: "PAGE_CHANGE"; payload: { newPage: number } };

type ContextProps = {
  dataTableInput: DataTableInput;
  publishEvent: PublishDataTableEventFn;
};

const DataTableInputContext = createContext<ContextProps | null>(null);

export const DataTableInputContextWrapper: FC<PropsWithChildren> = ({ children }) => {
  const dataTableInputReducer = useDataTableInputReducer();
  const [dataTableInput, publish] = useReducer(dataTableInputReducer, INITIAL_DATA_TABLE_INPUT);
  const publishEvent: PublishDataTableEventFn = (event) => publish(event);

  return (
    <DataTableInputContext.Provider value={{ dataTableInput, publishEvent }}>{children}</DataTableInputContext.Provider>
  );
};

export const useDataTableInputContext = () => {
  const ctx = use(DataTableInputContext);
  if (!ctx) throw new Error("Data table input context is not provided");
  return ctx;
};

const useDataTableInputReducer = () => {
  return function dataTableInputReducer(prevState: DataTableInput, { type, payload }: DataTableEvent): DataTableInput {
    if (type === "RESET") return INITIAL_DATA_TABLE_INPUT;
    if (type === "SEARCH") return { ...prevState, search: payload.search, page: 0 };
    if (type === "SORT") return { ...prevState, sortByColumn: payload.columnKey, sortOrder: payload.order, page: 0 };
    if (type === "PAGE_CHANGE") return { ...prevState, page: payload.newPage };
    const _never: never = type;
    throw new Error(`Unhandled data table event type: ${_never}`);
  };
};
