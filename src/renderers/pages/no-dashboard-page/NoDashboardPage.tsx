import { Typography } from "@/renderers/components/atoms/typographies/Typography";
import { AppHeaderLayout, type AppHeaderLayoutProps } from "@/renderers/templates/AppHeaderLayout";
import type { FC } from "react";

export type NoDashboardPageProps = Pick<AppHeaderLayoutProps, "dataSetName" | "viewAllHref">;

export const NoDashboardPage: FC<NoDashboardPageProps> = ({ dataSetName, viewAllHref }) => {
  return (
    <AppHeaderLayout dataSetName={dataSetName} viewAllHref={viewAllHref}>
      <Typography.Heading1>No Dashboard</Typography.Heading1>
    </AppHeaderLayout>
  );
};
