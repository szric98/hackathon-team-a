import { disableStoryArgs } from "@/utils/disable-story-args";
import type { Meta, StoryObj } from "@storybook/react";
import { DateInput, type DateInputProps } from "./DateInput";

const meta = {
  component: DateInput,
  title: "molecules/Inputs/DateInput",
} satisfies Meta<DateInputProps>;

type Story = StoryObj<DateInputProps>;

export const Main: Story = {
  args: {
    ariaLabel: "Storybook date input",
    dataAnalyticsId: "storybook__date-input",
  },
  argTypes: disableStoryArgs("ariaLabel", "dataAnalyticsId"),
  render: (props) => {
    return <DateInput {...props} />;
  },
};

export default meta;
