import type { FC, PropsWithChildren } from "react";

export const TableHeaderRow: FC<PropsWithChildren> = ({ children }) => {
  return <tr className="border-gray-200 border-b">{children}</tr>;
};
