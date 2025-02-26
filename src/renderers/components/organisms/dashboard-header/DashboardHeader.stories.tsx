import type { Meta, StoryObj } from "@storybook/react/*";
import { fn } from "@storybook/test";
import {
  DashboardHeaderCompact,
  type DashboardHeaderCompactProps,
  DashboardHeaderFull,
  type DashboardHeaderFullProps,
} from "./DashboardHeader";

const meta = {
  title: "organisms/DashboardHeader",
} satisfies Meta;

type DashboardHeaderFullStory = StoryObj<DashboardHeaderFullProps>;
export const Full: DashboardHeaderFullStory = {
  args: {
    title: "Dashboard",
    description: "This is a description",
    onClickAddMetric: fn(),
    DateRangeSelector: () => <>DATE RANGE</>,
  },
  render: (args) => {
    return <DashboardHeaderFull {...args} />;
  },
};

type DashboardHeaderCompactStory = StoryObj<DashboardHeaderCompactProps>;
export const Compact: DashboardHeaderCompactStory = {
  args: {
    title: "Dashboard",
    onClickAddMetric: fn(),
    DateRangeSelector: () => <>DATE RANGE</>,
  },
  render: (args) => {
    return <DashboardHeaderCompact {...args} />;
  },
};

export default meta;
