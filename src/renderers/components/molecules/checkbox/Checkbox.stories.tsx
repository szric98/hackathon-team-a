import { disableStoryArgs } from "@/utils/disable-story-args";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { COLOR_VALUES, Checkbox, type CheckboxProps } from "./Checkbox";

const meta = {
  component: Checkbox,
  title: "molecules/Checkbox",
} satisfies Meta<CheckboxProps>;

type Story = StoryObj<CheckboxProps>;

export const Base: Story = {
  argTypes: {
    ...disableStoryArgs("id", "checked", "text", "onCheckedChange"),
    color: {
      control: "select",
      options: COLOR_VALUES,
    },
  },
  render: ({ color }) => {
    const [checked, setChecked] = useState(false);
    return (
      <Checkbox
        id="storybook"
        checked={checked}
        color={color}
        onCheckedChange={(checked) => setChecked(checked)}
        text={{ value: "Check me", color: "primary", variant: "CaptionBold" }}
      />
    );
  },
};

export default meta;
