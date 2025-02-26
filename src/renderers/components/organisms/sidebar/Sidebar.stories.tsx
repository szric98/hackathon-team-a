import type { Meta, StoryObj } from "@storybook/react";
import { Sidebar } from "./Sidebar";
import { SIDEBAR_CONFIG } from "./mock";
import type { SidebarType } from "./schema";

export type SidebarStoryProps = SidebarType;

const meta = {
  component: Sidebar,
  title: "organisms/Sidebar",
} satisfies Meta<SidebarType>;

type Story = StoryObj<SidebarType>;

export const SidebarPlandek: Story = {
  render: () => <Sidebar {...SIDEBAR_CONFIG} />,
};

export default meta;
