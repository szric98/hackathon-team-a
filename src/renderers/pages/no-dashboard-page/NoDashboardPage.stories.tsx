import { StorybookCommonPageLayout } from "@/renderers/templates/StorybookLayout";
import type { Meta, StoryObj } from "@storybook/react";
import { NoDashboardPage, type NoDashboardPageProps } from "./NoDashboardPage";

const meta = {
  component: NoDashboardPage,
  title: "pages/NoDashboardPage",
} satisfies Meta;

type Story = StoryObj<NoDashboardPageProps>;

export const Main: Story = {
  decorators: StorybookCommonPageLayout,
  render: () => <NoDashboardPage dataSetName="Plandek" viewAllHref="#" />,
};

export default meta;
