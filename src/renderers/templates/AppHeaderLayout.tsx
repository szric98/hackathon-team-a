import type { FC, PropsWithChildren } from "react";
import type { JSX } from "react/jsx-runtime";

import { AppHeader, type AppHeaderProps } from "../components/organisms/app-header/AppHeader";

export type AppHeaderLayoutProps = Omit<AppHeaderProps, "dataSetName"> & {
  dataSetName?: string;
  noDataSetFallback?: JSX.Element;
};
export const AppHeaderLayout: FC<PropsWithChildren<AppHeaderLayoutProps>> = ({
  children,
  dataSetName,
  onClickDataSetSettings,
  viewAllHref,
  noDataSetFallback,
}) => {
  const header = dataSetName ? (
    <AppHeader dataSetName={dataSetName} onClickDataSetSettings={onClickDataSetSettings} viewAllHref={viewAllHref} />
  ) : (
    noDataSetFallback
  );

  return (
    <>
      {header}
      {children}
    </>
  );
};
