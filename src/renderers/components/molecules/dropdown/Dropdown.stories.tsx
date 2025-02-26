import { StorybookCenteredLayout } from "@/renderers/templates/StorybookLayout";
import { disableStoryArgs } from "@/utils/disable-story-args";
import type { Meta, StoryObj } from "@storybook/react";
import { Dropdown, type DropdownProps } from "./Dropdown";
import { DropdownIconTrigger } from "./DropdownIconTrigger";
import { generateMenuItems } from "./utils";

const meta = {
  component: Dropdown,
  title: "molecules/Dropdown",
} satisfies Meta<DropdownProps>;

type Story = StoryObj<DropdownProps>;

const commonArgs: Story["args"] = {
  Trigger: <DropdownIconTrigger icon="ChevronSortIcon" size="xs" dataAnalyticsId="storybook-icon-only-dropdown" />,
  ariaLabel: "storybook__dropdown",
  dataAnalyticsId: "storybook__dropdown",
};

const commonArgTypes: Story["argTypes"] = {
  ...disableStoryArgs("dataAnalyticsId", "menuItems", "Trigger", "label", "ariaLabel"),
};

export const Text: Story = {
  args: commonArgs,
  argTypes: commonArgTypes,
  render: (props) => <Dropdown {...props} menuItems={generateMenuItems({ count: 20 })} />,
  decorators: StorybookCenteredLayout,
};

export const Icon: Story = {
  args: commonArgs,
  argTypes: commonArgTypes,
  render: (props) => <Dropdown {...props} menuItems={generateMenuItems({ count: 3, withIcon: true })} />,
  decorators: StorybookCenteredLayout,
};

export const WithSearchInput: StoryObj<DropdownProps & { hasCategories?: boolean }> = {
  args: {
    ...commonArgs,
    hasCategories: true,
  },
  argTypes: {
    ...commonArgTypes,
    hasCategories: { control: "boolean" },
  },
  render: (props) => (
    <Dropdown {...props} menuItems={generateMenuItems({ count: 12, generateRandomCategory: props.hasCategories })} />
  ),
  decorators: StorybookCenteredLayout,
};

export default meta;
