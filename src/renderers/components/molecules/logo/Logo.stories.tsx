import type { Meta, StoryObj } from "@storybook/react";

import type { LogoProps } from "./Logo";
import { Logo, SIZE_VALUES } from "./Logo";

const meta = {
  component: Logo,
  title: "molecules/Logo",
} satisfies Meta<LogoProps>;

type Story = StoryObj<LogoProps>;

export const Plandek: Story = {
  args: { withText: true, size: "md" },
  argTypes: {
    size: {
      options: SIZE_VALUES,
      control: { type: "select" },
    },
  },
  render: (props) => {
    return <Logo {...props} />;
  },
};

export default meta;
