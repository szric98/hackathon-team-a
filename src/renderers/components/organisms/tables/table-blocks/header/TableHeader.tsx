import type { FC, PropsWithChildren } from "react";

export const TableHeader: FC<PropsWithChildren> = ({ children }) => {
  return <thead className="bg-gray-50 text-gray-700 dark:bg-gray-700 dark:text-gray-400">{children}</thead>;
};
