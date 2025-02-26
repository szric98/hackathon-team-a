import { positiveDelta } from "@/renderers/mocks/deltas";
import { StorybookCenteredLayout } from "@/renderers/templates/StorybookLayout";
import { disableStoryArgs } from "@/utils/disable-story-args";
import type { Meta, StoryObj } from "@storybook/react";
import type { DeltaPopoverProps } from "./DeltaPopover";
import { DeltaPopover } from "./DeltaPopover";

const meta = {
  component: DeltaPopover,
  title: "organisms/Popovers/DeltaPopover",
} satisfies Meta;

type Story = StoryObj<DeltaPopoverProps>;

export const Base: Story = {
  args: {
    delta: positiveDelta,
  },
  argTypes: {
    ...disableStoryArgs("delta", "isTableDelta"),
  },
  render: (props) => {
    return <DeltaPopover {...props} />;
  },
  decorators: StorybookCenteredLayout,
  // commented out for now as it's not working. TODO: fix it
  // play: async ({ canvasElement, args }) => {
  //   const canvas = within(canvasElement);

  //   await expect(canvas.getByText(args.currentDescriptor)).toBeInTheDocument();
  //   await expect(canvas.getByText(args.pastDescriptor)).toBeInTheDocument();
  //   await expect(canvas.getByText(DELTA_QUALITY_TEXT[args.qualityMode])).toBeInTheDocument();
  // },
};

export default meta;
