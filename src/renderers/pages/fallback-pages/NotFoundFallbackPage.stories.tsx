import { NotFoundFallbackPage } from "@/renderers/pages/fallback-pages/NotFoundFallbackPage";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: NotFoundFallbackPage,
  title: "pages/NotFoundFallbackPage",
} satisfies Meta;

type Story = StoryObj;

export const Main: Story = {
  args: {},
  render: () => <NotFoundFallbackPage redirect={() => console.info("Redirecting to somewhere...")} />,
};

export default meta;
