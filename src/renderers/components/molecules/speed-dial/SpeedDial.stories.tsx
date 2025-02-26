import { StorybookCenteredLayout } from "@/renderers/templates/StorybookLayout";
import { disableStoryArgs } from "@/utils/disable-story-args";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { SpeedDial, type SpeedDialProps } from "./SpeedDial";

const meta = {
  component: SpeedDial,
  title: "molecules/SpeedDial",
} satisfies Meta<SpeedDialProps>;

type Story = StoryObj<SpeedDialProps>;

export const Main: Story = {
  args: {
    items: [
      { label: "Chart", icon: "ChartIcon", ariaLabel: "", dataAnalyticsId: "", onClick: fn() },
      { label: "Copy", icon: "ClipboardIcon", ariaLabel: "", dataAnalyticsId: "", onClick: fn() },
      { label: "Settings", icon: "CogIcon", ariaLabel: "", dataAnalyticsId: "", onClick: fn() },
      { label: "Dashboards", icon: "DashboardsIcon", ariaLabel: "", dataAnalyticsId: "", onClick: fn() },
    ],
  },
  argTypes: {
    ...disableStoryArgs("ariaLabel", "dataAnalyticsId", "items"),
  },
  decorators: StorybookCenteredLayout,
  render: (props) => {
    return <SpeedDial {...props} />;
  },
};

export default meta;
