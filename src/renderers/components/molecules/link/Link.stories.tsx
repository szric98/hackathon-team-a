import type { Meta, StoryObj } from "@storybook/react";
import { COLOR_VALUES, VARIANT_VALUES } from "../../atoms/typographies/config";

import type { TypographyVariants } from "../../atoms/typographies/Typography";
import { Link, type LinkProps } from "./Link";

const meta = {
  component: Link,
  title: "molecules/Link",
} satisfies Meta<LinkProps>;

type Story = StoryObj<TypographyVariants>;

export const Base: Story = {
  args: {
    variant: "CaptionBold",
  },
  argTypes: {
    color: {
      control: "select",
      options: COLOR_VALUES,
    },
    variant: {
      control: "select",
      options: VARIANT_VALUES,
    },
  },
  render: (typography) => {
    return (
      <Link link={{ to: "#" }} typography={typography} dataAnalyticsId="storybook__link">
        Redirect me somewhere.
      </Link>
    );
  },
};

export default meta;
