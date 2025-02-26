import { disableStoryArgs } from "@/utils/disable-story-args";
import type { Meta, StoryObj } from "@storybook/react";
import { Typography } from "../typographies/Typography";
import type { CardProps } from "./Card";
import { Card, SIZE_VALUES } from "./Card";

const meta = {
  component: Card,
  title: "atoms/Card",
} satisfies Meta<CardProps>;

type Story = StoryObj<CardProps>;

export const Base: Story = {
  args: { highlight: false, size: "md" },
  argTypes: {
    ...disableStoryArgs("dataAnalyticsId"),
    size: { options: SIZE_VALUES, control: { type: "select" } },
    highlight: { control: { type: "boolean" } },
  },
  render: (props) => (
    <Card {...props}>
      <Typography.Heading2>Card Header</Typography.Heading2>
      <Typography.Body>Card Content</Typography.Body>
    </Card>
  ),
};

export default meta;
