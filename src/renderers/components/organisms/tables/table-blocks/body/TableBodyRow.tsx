import type { FC, PropsWithChildren } from "react";

export const TableBodyRow: FC<PropsWithChildren> = ({ children }) => {
  return <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">{children}</tr>;
};
