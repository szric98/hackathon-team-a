import { MainLayout } from "@/renderers/templates/common";
import type { Meta, StoryObj } from "@storybook/react";

import { LoadingFallbackPage } from "./LoadingFallbackPage";

const meta = {
  component: LoadingFallbackPage,
  title: "pages/LoadingFallbackPage",
} satisfies Meta;

type Story = StoryObj;

export const Main: Story = {
  args: {},
  render: () => (
    <MainLayout>
      <LoadingFallbackPage />
    </MainLayout>
  ),
};

export default meta;
