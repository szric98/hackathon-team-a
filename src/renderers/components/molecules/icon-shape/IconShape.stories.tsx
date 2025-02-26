import { STORYBOOK_ICONS } from "@/renderers/const";
import { disableStoryArgs } from "@/utils/disable-story-args";
import type { Meta, StoryObj } from "@storybook/react";
import { COLOR_VALUES, IconShape, type IconShapeProps, SHAPE_VALUES, SIZE_VALUES } from "./IconShape";

const meta = {
  component: IconShape,
  title: "molecules/IconShape",
} satisfies Meta<IconShapeProps>;

type Story = StoryObj<IconShapeProps>;

export const Base: Story = {
  args: {
    icon: "EpicsIcon",
    shape: "square",
    color: "brand",
    size: "default",
    ariaLabel: "icon",
  },
  argTypes: {
    ...disableStoryArgs("ariaLabel"),
    icon: {
      control: "select",
      options: STORYBOOK_ICONS,
    },
    color: {
      control: "select",
      options: COLOR_VALUES,
    },
    shape: {
      control: "select",
      options: SHAPE_VALUES,
    },
    size: {
      control: "select",
      options: SIZE_VALUES,
    },
  },
  render: (props) => <IconShape {...props} />,
};

export default meta;
