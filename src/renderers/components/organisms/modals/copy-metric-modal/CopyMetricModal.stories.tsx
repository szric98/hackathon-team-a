import { StorybookCenteredLayout } from "@/renderers/templates/StorybookLayout";
import { disableStoryArgs } from "@/utils/disable-story-args";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { CopyMetricModal, type CopyMetricModalProps } from "./CopyMetricModal";
import { mockCategories } from "./mock";

const meta = {
  component: CopyMetricModal,
  title: "organisms/Modals/CopyMetric",
} satisfies Meta<CopyMetricModalProps>;

type Story = StoryObj<CopyMetricModalProps>;

export const Main: Story = {
  args: {
    show: true,
    onClose: fn(),
    onDuplicate: fn(),
    currentDataSet: { clientKey: "client", dataSetKey: "dataset-1-1", label: "Data set" },
    metricDashboardDataSetTree: {
      clientKey: "client",
      id: "data-set-tree",
      requiredPermission: "EDIT",
      categories: mockCategories,
    },
  },
  argTypes: disableStoryArgs("show", "onDuplicate", "onClose"),
  decorators: StorybookCenteredLayout,
  render: (props) => {
    return <CopyMetricModal {...props} />;
  },
};

export default meta;
