import { StorybookCenteredLayout } from "@/renderers/templates/StorybookLayout";
import { disableStoryArgs } from "@/utils/disable-story-args";
import type { Meta, StoryObj } from "@storybook/react";
import { IconShape } from "../icon-shape/IconShape";
import { Toast, type ToastProps } from "./Toast";

const meta = {
  component: Toast,
  title: "molecules/Toast",
  args: {},
  argTypes: {},
} satisfies Meta<ToastProps>;

type Story = StoryObj<ToastProps>;

export const Base: Story = {
  args: {
    description: "Settings updated",
    icon: <IconShape icon="CheckIcon" color="green" size="lg" ariaLabel="Check" />,
    showCloseButton: false,
  },
  argTypes: { showCloseButton: { control: "boolean" }, ...disableStoryArgs("onDismiss", "icon") },
  decorators: StorybookCenteredLayout,
  render: (props) => {
    return <Toast {...props} />;
  },
};

export default meta;
