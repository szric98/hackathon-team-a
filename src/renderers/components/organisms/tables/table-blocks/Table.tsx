import type { FC, PropsWithChildren } from "react";

export const Table: FC<PropsWithChildren> = ({ children }) => {
  return (
    <table className="table w-full table-auto text-left text-gray-500 text-sm rtl:text-right dark:text-gray-400">
      {children}
    </table>
  );
};
