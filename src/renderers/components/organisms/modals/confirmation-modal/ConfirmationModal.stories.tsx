import { useModalState } from "@/hooks/use-modal-state";
import { Button } from "@/renderers/components/molecules/button/Button";
import { StorybookCenteredLayout } from "@/renderers/templates/StorybookLayout";
import { disableStoryArgs } from "@/utils/disable-story-args";
import type { Meta, StoryObj } from "@storybook/react";
import { ConfirmationModal, type ConfirmationModalProps } from "./ConfirmationModal";

const meta = {
  component: ConfirmationModal,
  title: "organisms/Modals/ConfirmationModal",
} satisfies Meta<ConfirmationModalProps>;

type Story = StoryObj<ConfirmationModalProps>;

export const Main: Story = {
  args: {
    message: "Changes have been made to this dashboard settings. Are you sure you want to cancel?",
  },
  argTypes: disableStoryArgs("show", "onClose"),
  decorators: StorybookCenteredLayout,
  render: (props) => {
    const { isOpen, openFn, closeFn } = useModalState();

    return (
      <>
        <Button dataAnalyticsId="storybook__open-modal-button" onClick={openFn}>
          Open modal
        </Button>
        <ConfirmationModal {...props} show={isOpen} onClose={closeFn} onClickConfirm={closeFn} />
      </>
    );
  },
};

export default meta;
