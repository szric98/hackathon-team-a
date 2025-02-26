import { ErrorFallbackPage } from "@/renderers/pages/fallback-pages/ErrorFallbackPage";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: ErrorFallbackPage,
  title: "pages/ErrorFallbackPage",
} satisfies Meta;

type Story = StoryObj;

export const Main: Story = {
  args: {},
  render: () => <ErrorFallbackPage />,
};

export default meta;
