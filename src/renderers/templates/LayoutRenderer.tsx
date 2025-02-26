import type { FC, PropsWithChildren } from "react";
import type { SidebarType } from "../components/organisms/sidebar/schema";

import { Sidebar } from "../components/organisms/sidebar/Sidebar";
import { ContentLayout, MainLayout } from "./common";

export type LayoutRendererProps = {
  sidebarProps?: SidebarType;
};
export const SidebarLayout: FC<PropsWithChildren<LayoutRendererProps>> = ({ children, sidebarProps }) => {
  return (
    <MainLayout>
      {sidebarProps ? <Sidebar {...sidebarProps} /> : null}
      <ContentLayout autoMaxWidth={sidebarProps?.hidden}>{children}</ContentLayout>
    </MainLayout>
  );
};
