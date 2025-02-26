import { StorybookCenteredLayout } from "@/renderers/templates/StorybookLayout";
import { disableStoryArgs } from "@/utils/disable-story-args";
import type { Meta, StoryObj } from "@storybook/react";
import { SelectInput, type SelectInputProps } from "./SelectInput";

const categories = ["Category A", "Category B", "Category C"];

const getRandomCategory = () => {
  return categories[Math.floor(Math.random() * categories.length)];
};

const meta = {
  component: SelectInput,
  title: "molecules/Inputs/SelectInput",
} satisfies Meta<SelectInputProps>;

type Story = StoryObj<SelectInputProps>;

const generateDropdownItems = (count: number) =>
  Array.from({ length: count }, (_, index) => {
    const key = `option-${index + 1}`;
    return {
      key,
      label: `Option ${index + 1}`,
      dataAnalyticsId: key,
      category: getRandomCategory(),
    };
  });

export const Base: Story = {
  args: {
    label: "Select an option",
    placeholder: "Select an option",
    dataAnalyticsId: "dropdown-select-example",
    inputClassName: "min-w-80",
    items: generateDropdownItems(10),
  },
  argTypes: disableStoryArgs("dataAnalyticsId", "label", "ariaLabel", "dropdownProps", "inputProps"),
  render: (props) => {
    return <SelectInput {...props} />;
  },
  decorators: StorybookCenteredLayout,
};

export default meta;
