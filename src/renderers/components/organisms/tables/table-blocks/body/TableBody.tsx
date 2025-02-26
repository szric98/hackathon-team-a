import type { FC, PropsWithChildren } from "react";

export const TableBody: FC<PropsWithChildren> = ({ children }) => {
  return <tbody>{children}</tbody>;
};
