import type { FC, PropsWithChildren } from "react";

export const TableBodyCell: FC<PropsWithChildren> = ({ children }) => {
  return <td className="px-6 py-4">{children}</td>;
};
