import { Button } from "@/renderers/components/molecules/button/Button";
import { StorybookCenteredLayout } from "@/renderers/templates/StorybookLayout";
import { disableStoryArgs } from "@/utils/disable-story-args";
import type { Meta, StoryObj } from "@storybook/react";
import { useModalState } from "../../../../../hooks/use-modal-state";
import { DashboardSettingsModal, type DashboardSettingsModalProps } from "./DashboardSettingsModal";

const meta = {
  component: DashboardSettingsModal,
  title: "organisms/Modals/DashboardSettings",
} satisfies Meta<DashboardSettingsModalProps>;

type Story = StoryObj<DashboardSettingsModalProps>;

export const Main: Story = {
  args: {
    initialDashboardName: "Plandek",
    initialDashboardDescription: "This is a default Plandek dashboard",
  },
  argTypes: disableStoryArgs("show", "onApply", "onClose"),
  decorators: StorybookCenteredLayout,
  render: (props) => {
    const { isOpen, openFn, closeFn } = useModalState();

    return (
      <>
        <Button dataAnalyticsId="storybook__open-modal-button" onClick={openFn}>
          Open modal
        </Button>
        <DashboardSettingsModal {...props} show={isOpen} onClose={closeFn} onApply={closeFn} />
      </>
    );
  },
};

export default meta;
