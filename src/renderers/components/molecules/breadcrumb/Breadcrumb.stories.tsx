import type { Meta, StoryObj } from "@storybook/react";
import { generateMenuItems } from "../dropdown/utils";
import type { BreadcrumbProps } from "./Breadcrumb";
import { Breadcrumb } from "./Breadcrumb";

const meta = {
  component: Breadcrumb,
  title: "molecules/Breadcrumb",
} satisfies Meta<BreadcrumbProps>;

type Story = StoryObj<BreadcrumbProps>;

export const Base: Story = {
  args: {
    items: [
      { itemLabel: "Home" },
      { itemLabel: "E-commerce" },
      { itemLabel: "Products", onClick: () => console.log("Clicked") },
      {
        itemLabel: "Products",
        dropdownMenuItems: generateMenuItems({ count: 3 }),
      },
    ],
    withBackground: false,
    icon: "HomeIcon",
  },
  render: (args) => {
    return <Breadcrumb {...args} />;
  },
};

export default meta;
