import { disableStoryArgs } from "@/utils/disable-story-args";
import type { Meta, StoryObj } from "@storybook/react/*";
import { useState } from "react";
import type { ToggleProps } from "./Toggle";
import { SIZE_VALUES, Toggle } from "./Toggle";

const meta = {
  component: Toggle,
  title: "molecules/Toggle",
} satisfies Meta<ToggleProps>;

type Story = StoryObj<ToggleProps>;

export const Base: Story = {
  args: {
    disabled: false,
    label: "Write label text here",
    helperText: "Some helper text here",
    size: "md",
  },
  argTypes: {
    ...disableStoryArgs("checked", "onCheckedChange"),
    size: {
      control: "select",
      options: SIZE_VALUES,
    },
  },
  render: (props) => {
    const [checked, setChecked] = useState(false);
    return <Toggle {...props} checked={checked} onCheckedChange={setChecked} />;
  },
};

export default meta;
