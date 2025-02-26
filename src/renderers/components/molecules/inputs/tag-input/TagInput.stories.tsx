import { disableStoryArgs } from "@/utils/disable-story-args";
import type { Meta, StoryObj } from "@storybook/react";

import { TagInput, type TagInputProps } from "./TagInput";

const meta = {
  component: TagInput,
  title: "molecules/Inputs/TagInput",
} satisfies Meta<TagInputProps>;

type Story = StoryObj<TagInputProps>;

export const Main: Story = {
  args: {
    label: "Countries",
    ariaLabel: "Storybook tag input",
    dataAnalyticsId: "storybook__tag-input",
    withIncludeExclude: true,
    placeholder: "Select countries",
    tags: new Map([
      ["hu", { key: "hu", label: "Hungary" }],
      ["us", { key: "us", label: "United States" }],
      ["ca", { key: "ca", label: "Canada" }],
      ["mx", { key: "mx", label: "Mexico" }],
      ["br", { key: "br", label: "Brazil" }],
      ["ar", { key: "ar", label: "Argentina" }],
    ]),
  },
  argTypes: disableStoryArgs("label", "tags", "ariaLabel", "dataAnalyticsId"),
  render: (props) => <TagInput {...props} />,
};

export default meta;
