import type { FC } from "react";
import { CenteredContent, ContentLayout, MainLayout } from "../templates/common";

export const StorybookCenteredLayout = (Story: FC) => (
  <MainLayout>
    <CenteredContent>
      <Story />
    </CenteredContent>
  </MainLayout>
);

export const StorybookCommonPageLayout = (Story: FC) => (
  <ContentLayout>
    <Story />
  </ContentLayout>
);
