import { STORYBOOK_ICONS } from "@/renderers/const";
import { disableStoryArgs } from "@/utils/disable-story-args";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "@storybook/test";
import { Badge, type BadgeProps, COLOR_VALUES, SIZE_VALUES } from "./Badge";

const meta = {
  component: Badge,
  title: "molecules/Badge",
} satisfies Meta<BadgeProps>;

type Story = StoryObj<BadgeProps>;

export const Base: Story = {
  args: {
    label: "Default badge",
    action: { onClick: fn(), dataAnalyticsId: "storybook__action" },
  },
  argTypes: {
    ...disableStoryArgs("action", "onClick"),
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
      options: [...STORYBOOK_ICONS, null],
    },
  },
  render: (props) => {
    return <Badge {...props} />;
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    const actionIcon = canvas.queryByRole("button");
    if (actionIcon) {
      await userEvent.click(actionIcon);
      expect(args.action?.onClick).toHaveBeenCalled();
    }
  },
};

export default meta;
