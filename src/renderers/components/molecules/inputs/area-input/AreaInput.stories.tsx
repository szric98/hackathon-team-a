import { disableStoryArgs } from "@/utils/disable-story-args";
import type { Meta, StoryObj } from "@storybook/react";
import { AreaInput, type AreaInputProps } from "./AreaInput";

const meta = {
  component: AreaInput,
  title: "molecules/Inputs/AreaInput",
} satisfies Meta<AreaInputProps>;

type Story = StoryObj<AreaInputProps["input"]>;

export const Main: Story = {
  argTypes: disableStoryArgs("input", "label"),
  render: ({ color }) => {
    return (
      <AreaInput
        input={{
          id: "name",
          color,
          placeholder: "Enter your name",
          onChange: (newValue) => console.info(`Changed to ${newValue}`),
        }}
      />
    );
  },
};

export default meta;
