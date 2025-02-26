import { StorybookCenteredLayout } from "@/renderers/templates/StorybookLayout";
import { disableStoryArgs } from "@/utils/disable-story-args";
import type { Meta, StoryObj } from "@storybook/react";
import { Stepper, type StepperProps } from "./Stepper";
import { MOCK_STEPS } from "./mock";

const meta = {
  component: Stepper,
  title: "molecules/Stepper",
} satisfies Meta<StepperProps>;

type Story = StoryObj<StepperProps>;

export const Base: Story = {
  args: { steps: MOCK_STEPS },
  argTypes: disableStoryArgs("steps", "show", "onClose"),
  render: (props) => {
    return <Stepper {...props} />;
  },
  decorators: StorybookCenteredLayout,
};

export default meta;
