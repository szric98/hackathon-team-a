import { StorybookCenteredLayout } from "@/renderers/templates/StorybookLayout";
import { disableStoryArgs } from "@/utils/disable-story-args";
import { strictGet } from "@/utils/strict-utils";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import { Button } from "../button/Button";
import { Tooltip, type TooltipProps } from "./Tooltip";

const meta = {
  component: Tooltip,
  title: "molecules/Tooltip",
  args: {
    title: "Mike Super Dataset",
    forceOpen: undefined,
    hideArrow: false,
    offset: 0,
    placement: "top",
  },
  argTypes: {
    ...disableStoryArgs("title", "trigger"),
    placement: { options: ["top", "right", "bottom", "left"], control: { type: "select" } },
  },
} satisfies Meta<TooltipProps>;

type Story = StoryObj<TooltipProps>;

export const Base: Story = {
  render: (props) => (
    <Tooltip
      {...props}
      trigger={<Button dataAnalyticsId="storybook__tooltip__button">I can be anything I want</Button>}
    />
  ),
  decorators: StorybookCenteredLayout,
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button");
    await userEvent.hover(trigger);

    const title = strictGet(canvas.getAllByText(args.title), 0);
    await expect(title).toBeInTheDocument();
  },
};

export default meta;
