import { STORYBOOK_ICONS } from "@/renderers/const";
import { disableStoryArgs } from "@/utils/disable-story-args";
import type { Meta, StoryObj } from "@storybook/react";
import { theme } from "flowbite-react";
import type * as Icons from "../../atoms/icons";
import { IconRenderFn } from "../../atoms/icons/IconRenderFn";
import { Button, type ButtonProps } from "./Button";

export type ButtonStoryProps = ButtonProps & {
  storyIcon: keyof typeof Icons | null;
};

const meta = {
  component: Button,
  title: "molecules/Button",
} satisfies Meta<ButtonStoryProps>;

type Story = StoryObj<ButtonStoryProps>;

const buttonSizes = Object.keys(theme.button.size);

export const Base: Story = {
  args: {
    isProcessing: false,
    pill: false,
    disabled: false,
    dataAnalyticsId: "storybook__button",
  },
  argTypes: {
    ...disableStoryArgs("dataAnalyticsId"),
    color: {
      control: "select",
      options: Object.keys(theme.button.color),
    },
    size: {
      control: "select",
      options: buttonSizes,
    },
    storyIcon: {
      control: "select",
      options: [...STORYBOOK_ICONS, null],
    },
  },
  render: ({ storyIcon, ...props }) => {
    const IconComponent = storyIcon ? IconRenderFn(storyIcon) : null;
    return (
      <Button {...props}>
        {IconComponent && <IconComponent className="mr-2 size-5 fill-gray-400" />}
        My Button component
      </Button>
    );
  },
};

export default meta;
