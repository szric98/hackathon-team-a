import { disableStoryArgs } from "@/utils/disable-story-args";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "@storybook/test";
import { Icon } from "../../atoms/icons/Icon";
import { Typography } from "../../atoms/typographies/Typography";
import { Alert, type AlertProps, alertTheme } from "./Alert";

const meta = {
  component: Alert,
  title: "molecules/Alert",
} satisfies Meta<AlertProps>;

type Story = StoryObj<AlertProps>;

export const Base: Story = {
  args: {
    icon: () => <Icon className="mr-1 size-4 fill-brand-800 dark:fill-brand-400" icon="HandWaveIcon" />,
    additionalContent: (
      <Typography.Caption color="brandDark">Please select a workspace to get started!</Typography.Caption>
    ),
  },
  argTypes: {
    color: {
      control: "select",
      options: Object.keys(alertTheme?.color ?? {}),
    },
    ...disableStoryArgs("icon", "additionalContent"),
  },
  render: ({ color, icon, additionalContent }) => {
    return (
      <Alert color={color} icon={icon} additionalContent={additionalContent}>
        <Typography.BodyBold color="brandDark">Welcome back to Plandek</Typography.BodyBold>
      </Alert>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const alert = canvas.getByRole("alert");
    expect(alert).toBeInTheDocument();
  },
};

export default meta;
