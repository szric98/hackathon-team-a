import { Typography } from "@/renderers/components/atoms/typographies/Typography";
import type { FC } from "react";

export type PaginationProps = {
  totalRows: number;
  page: number;
  pageSize: number;
  handleNextPage: () => void;
  handlePrevPage: () => void;
};
export const Pagination: FC<PaginationProps> = (props) => {
  const { totalRows, page, pageSize, handleNextPage, handlePrevPage } = props;

  const from = page * pageSize + 1;
  const to = Math.min((page + 1) * pageSize, totalRows);

  const isPrevPageDisabled = from === 1;
  const isNextPageDisabled = to === totalRows;

  return (
    <div className="flex w-full items-center justify-between ">
      <div>
        <span className="text-gray-700 text-sm dark:text-gray-400">
          Showing <span className="font-semibold text-gray-900 dark:text-white">{from}</span> to{" "}
          <span className="font-semibold text-gray-900 dark:text-white">{to}</span> of{" "}
          <span className="font-semibold text-gray-900 dark:text-white">{totalRows}</span> Entries
        </span>
      </div>
      <div>
        <button
          type="button"
          disabled={isPrevPageDisabled}
          onClick={handlePrevPage}
          className="group rounded-l-md border border-gray-300 px-6 py-2 hover:bg-brand-100 disabled:pointer-events-none disabled:opacity-50"
        >
          <Typography.BodyMedium color="secondary" className="group-hover:text-brand-700">
            Prev
          </Typography.BodyMedium>
        </button>
        <button
          type="button"
          disabled={isNextPageDisabled}
          onClick={handleNextPage}
          className="group rounded-r-md border border-gray-300 px-6 py-2 hover:bg-brand-100 disabled:pointer-events-none disabled:opacity-50"
        >
          <Typography.BodyMedium color="secondary" className="group-hover:text-brand-700">
            Next
          </Typography.BodyMedium>
        </button>
      </div>
    </div>
  );
};
