import { StorybookCenteredLayout } from "@/renderers/templates/StorybookLayout";
import { disableStoryArgs } from "@/utils/disable-story-args";
import type { Meta, StoryObj } from "@storybook/react";
import { Typography } from "../../atoms/typographies/Typography";
import { Button } from "../button/Button";
import { Popover, type PopoverPrimitivePropsWithTrigger } from "./Popover";

const meta = {
  component: Popover,
  title: "molecules/Popover",
} satisfies Meta<PopoverPrimitivePropsWithTrigger>;

type Story = StoryObj<PopoverPrimitivePropsWithTrigger>;

const commonArgs: Story["args"] = {
  trigger: <Button dataAnalyticsId="Storybook button">Click me</Button>,
  hover: false,
  placement: "bottom",
  withArrow: true,
  dataAnalyticsId: "storybook__popover",
  ariaLabel: "storybook__popover",
};

const commonArgTypes: Story["argTypes"] = {
  ...disableStoryArgs("dataAnalyticsId", "menuItems", "Trigger", "label", "ariaLabel"),
  placement: { control: "select", options: ["top", "bottom", "right", "left"] },
};

export const WithCustomContent: Story = {
  args: commonArgs,
  argTypes: commonArgTypes,
  render: (props) => (
    <Popover
      {...props}
      containerClassName="p-4"
      content={<Typography.Body>This can be any JSX element</Typography.Body>}
    />
  ),
  decorators: StorybookCenteredLayout,
};

export const WithGeneralHeaderAndContentLayout: Story = {
  args: commonArgs,
  argTypes: commonArgTypes,
  render: (props) => (
    <Popover
      {...props}
      content={{
        heading: "Popover click",
        content: "And here's some amazing content. It's very engaging. Right? Right? Right?",
      }}
    />
  ),
  decorators: StorybookCenteredLayout,
};

export default meta;
