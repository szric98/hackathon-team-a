import { STORYBOOK_ICONS } from "@/renderers/const";
import type { Meta, StoryObj } from "@storybook/react";
import { DropdownIconTrigger, type DropdownIconTriggerProps } from "./DropdownIconTrigger";

const meta = {
  component: DropdownIconTrigger,
  title: "molecules/DropdownIconTrigger",
} satisfies Meta<DropdownIconTriggerProps>;

type Story = StoryObj<DropdownIconTriggerProps>;

export const Base: Story = {
  args: {
    icon: "PlayIcon",
    size: "md",
    dataAnalyticsId: "storybook_dropdown-icon-trigger",
  },
  argTypes: {
    icon: {
      control: "select",
      options: STORYBOOK_ICONS,
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
  },
  render: (args) => {
    return <DropdownIconTrigger {...args} />;
  },
};

export default meta;
