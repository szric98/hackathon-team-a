import type { BaseKeyLabel } from "@/types";
import type { Meta, StoryObj } from "@storybook/react";
import { SelectButtonInput } from "./SelectButtonInput";

const meta: Meta<typeof SelectButtonInput> = {
  title: "molecules/Inputs/SelectButtonInput",
  component: SelectButtonInput,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    label: { control: "text" },
    ariaLabel: { control: "text" },
    dataAnalyticsId: { control: "text" },
    disabled: { control: "boolean" },
    onChange: { action: "changed" },
    options: { control: "object" },
    value: { control: "object" },
  },
};

export default meta;
type Story = StoryObj<typeof SelectButtonInput>;

const sampleOptions: BaseKeyLabel[] = [
  { key: "daily", label: "Daily" },
  { key: "weekly", label: "Weekly" },
  { key: "monthly", label: "Monthly" },
];

// Base story with minimum required props
export const Main: Story = {
  args: {
    label: "Select Granularity",
    ariaLabel: "Select frequency",
    dataAnalyticsId: "frequency-selector",
    options: sampleOptions,
    getKey: (option: unknown) => (option as BaseKeyLabel).key,
    getLabel: (option: unknown) => (option as BaseKeyLabel).label,
    value: sampleOptions[0]?.key,
  },
  render: (props) => {
    return <SelectButtonInput {...props} />;
  },
};
