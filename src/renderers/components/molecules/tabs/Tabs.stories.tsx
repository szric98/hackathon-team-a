import type { Meta, StoryObj } from "@storybook/react";

import { disableStoryArgs } from "@/utils/disable-story-args";

import { Typography } from "../../atoms/typographies/Typography";
import { type TabVariant, Tabs, type TabsProps } from "./Tabs";

type StoryTabsProps = TabsProps & {
  disabled?: boolean;
};

const meta = {
  component: Tabs,
  title: "molecules/Tabs",
} satisfies Meta<StoryTabsProps>;

type Story = StoryObj<StoryTabsProps>;

function createStory(variant: TabVariant, withMenuItems?: boolean): Story {
  return {
    args: {
      onChange: (value: object) => console.info(value),
      ariaLabel: "Storybook tabs",
      tabs: [
        {
          value: { key: "tab-1" },
          label: "Tab 1",
          children: <Typography.Heading1>Tab 1 content</Typography.Heading1>,
          dataAnalyticsId: "storybook__tab__1",
          menuItems: withMenuItems
            ? [
                { key: "option1", icon: "AdminIcon", label: "Pin to dashboard", dataAnalyticsId: "" },
                { key: "option2", icon: "CogIcon", label: "Download PNG", dataAnalyticsId: "" },
                { key: "option3", icon: "DotsVerticalIcon", label: "Download CSV", dataAnalyticsId: "" },
              ]
            : undefined,
        },
        {
          value: { key: "tab-2" },
          label: "Tab 2",
          children: <Typography.Heading1>Tab 2 content</Typography.Heading1>,
          dataAnalyticsId: "storybook__tab__2",
          menuItems: withMenuItems
            ? [
                { key: "option1", icon: "AdminIcon", label: "Pin to dashboard", dataAnalyticsId: "" },
                { key: "option2", icon: "CogIcon", label: "Download PNG", dataAnalyticsId: "" },
                { key: "option3", icon: "DotsVerticalIcon", label: "Download CSV", dataAnalyticsId: "" },
              ]
            : undefined,
        },
        {
          value: { key: "tab-3" },
          label: "Tab 3",
          children: <Typography.Heading1>Tab 3 content</Typography.Heading1>,
          dataAnalyticsId: "storybook__tab__3",
          menuItems: withMenuItems
            ? [
                { key: "option1", icon: "AdminIcon", label: "Pin to dashboard", dataAnalyticsId: "" },
                { key: "option2", icon: "CogIcon", label: "Download PNG", dataAnalyticsId: "" },
                { key: "option3", icon: "DotsVerticalIcon", label: "Download CSV", dataAnalyticsId: "" },
              ]
            : undefined,
        },
      ],
    },
    argTypes: {
      ...disableStoryArgs("onChange", "ariaLabel", "defaultActive", "tabs", "variant"),
      disabled: {
        control: "boolean",
      },
    },
    render: ({ disabled, ...rest }) => {
      const tabs = rest.tabs.map((tab) => ({ ...tab, disabled }));
      return <Tabs {...rest} variant={variant} tabs={tabs} />;
    },
  };
}

export const Underline = createStory("underline");
export const Pills = createStory("pill");
export const UnderlineWithMenu = createStory("underline", true);

export default meta;
