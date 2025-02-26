import { Typography } from "@/renderers/components/atoms/typographies/Typography";
import type { FC, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

type TableHeaderCellProps = {
  isCheckboxCell?: boolean;
  onClick?: VoidFunction;
};

export const TableHeaderCell: FC<PropsWithChildren<TableHeaderCellProps>> = ({ children, onClick, isCheckboxCell }) => {
  return (
    <th scope="col" className={twMerge("whitespace-nowrap px-6 py-4", isCheckboxCell ? "w-16" : "")}>
      <Typography.CaptionBold color="secondary" onClick={onClick}>
        {children}
      </Typography.CaptionBold>
    </th>
  );
};
