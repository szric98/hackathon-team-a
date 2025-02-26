import { IconRenderFn } from "@/renderers/components/atoms/icons/IconRenderFn";

import { STORYBOOK_ICONS } from "@/renderers/const";
import { disableStoryArgs } from "@/utils/disable-story-args";
import type { Meta, StoryObj } from "@storybook/react";
import { theme } from "flowbite-react";
import { TextInput, type TextInputProps, textInputTheme } from "./TextInput";

const meta = {
  component: TextInput,
  title: "molecules/Inputs/TextInput",
} satisfies Meta<TextInputProps>;

type Story = StoryObj<Pick<TextInputProps, "color" | "icon" | "sizing">>;

export const Main: Story = {
  args: {
    color: "default",
    icon: IconRenderFn("CogIcon"),
  },
  argTypes: {
    ...disableStoryArgs("input", "label"),
    icon: {
      control: { type: "select" },
      options: [...STORYBOOK_ICONS, null],
      mapping: {
        AdminIcon: IconRenderFn("AdminIcon"),
        ArrowUpIcon: IconRenderFn("ArrowUpIcon"),
        CogIcon: IconRenderFn("CogIcon"),
        WorkspaceIcon: IconRenderFn("WorkspaceIcon"),
        HelpIcon: IconRenderFn("HelpIcon"),
      },
    },
    color: {
      control: "select",
      options: Object.keys(textInputTheme?.field?.input?.colors ?? {}),
    },
    sizing: {
      control: "select",
      options: Object.keys(theme.textInput.field.input.sizes),
    },
  },
  render: ({ color, icon, sizing }) => {
    return (
      <TextInput
        id="name"
        type="text"
        color={color}
        icon={icon}
        sizing={sizing}
        placeholder="Enter your name"
        onChange={(newValue) => console.info(`Changed to ${newValue}`)}
      />
    );
  },
};

export default meta;
