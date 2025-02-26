import type { Meta, StoryObj } from "@storybook/react";

import type { EnterCardProps } from "./EnterCard";
import { EnterCard } from "./EnterCard";

const meta = {
  component: EnterCard,
  title: "organisms/ComplexCard/EnterCard",
} satisfies Meta<EnterCardProps>;

type Story = StoryObj<EnterCardProps>;

export const Main: Story = {
  args: {},
  render: () => <EnterCard onClickEnter={() => console.info("click enter")} />,
};

export default meta;
