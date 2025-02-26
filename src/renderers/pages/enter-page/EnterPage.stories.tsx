import type { Meta, StoryObj } from "@storybook/react";

import { EnterPage } from "./EnterPage";

const meta = {
  component: EnterPage,
  title: "pages/EnterPage",
} satisfies Meta;

type Story = StoryObj;

export const Main: Story = {
  render: () => <EnterPage onClickEnter={() => console.info("Login")} />,
};

export default meta;
