import { STORYBOOK_ICONS } from "@/renderers/const";
import { disableStoryArgs } from "@/utils/disable-story-args";
import type { Meta, StoryObj } from "@storybook/react";
import { Button, COLOR_VALUES, type IconButtonProps, SIZE_VALUES } from "./Button";

const meta = {
  component: Button.Icon,
  title: "molecules/Button",
} satisfies Meta<IconButtonProps>;

type Story = StoryObj<IconButtonProps>;

export const IconOnly: Story = {
  args: {
    icon: "PlusIcon",
    disabled: false,
    dataAnalyticsId: "storybook__icon_button",
    ariaLabel: "icon-button",
    onClick: () => console.info("Clicked"),
  },
  argTypes: {
    ...disableStoryArgs("dataAnalyticsId", "onClick"),
    color: {
      control: "select",
      options: COLOR_VALUES,
    },
    size: {
      control: "select",
      options: SIZE_VALUES,
    },
    icon: {
      control: "select",
      options: STORYBOOK_ICONS,
    },
  },
  render: (props) => {
    return <Button.Icon {...props} />;
  },
};

export default meta;
