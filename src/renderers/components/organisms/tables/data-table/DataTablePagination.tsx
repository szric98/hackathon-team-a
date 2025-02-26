import type { FC } from "react";
import { Pagination } from "../table-blocks/Pagination";
import { useDataTableContext } from "./DataTableContext";
import { useDataTableInputContext } from "./DataTableInputContextWrapper";

export const DataTablePagination: FC = () => {
  const { publishEvent } = useDataTableInputContext();
  const { data } = useDataTableContext();
  const { page, pageSize, totalRows } = data;
  const onPageChange = (newPage: number) => publishEvent({ type: "PAGE_CHANGE", payload: { newPage } });

  return (
    <Pagination
      totalRows={totalRows}
      page={page}
      pageSize={pageSize}
      handleNextPage={() => onPageChange(data.page + 1)}
      handlePrevPage={() => onPageChange(data.page - 1)}
    />
  );
};
