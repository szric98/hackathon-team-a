import type { Meta, StoryObj } from "@storybook/react";

import {
  DataErrorCard,
  type DataErrorCardProps,
} from "@/renderers/components/organisms/complex-cards/data-error-card/DataErrorCard";

const meta = {
  component: DataErrorCard,
  title: "organisms/ComplexCard/DataErrorCard",
} satisfies Meta<DataErrorCardProps>;

type Story = StoryObj<DataErrorCardProps>;

export const DataErrorCardStory: Story = {
  args: {
    title: "There is no data to display",
    description: "Please ensure the metric is correctly configured to reflect the desired data accurately.",
  },

  render: (props) => {
    return <DataErrorCard {...props} />;
  },
};

export default meta;
