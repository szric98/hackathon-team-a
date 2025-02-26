import { Button } from "@/renderers/components/molecules/button/Button";
import { StorybookCenteredLayout } from "@/renderers/templates/StorybookLayout";

import type { Meta, StoryObj } from "@storybook/react";
import { useModalState } from "../../../../../hooks/use-modal-state";
import { LowVolatility } from "../volatility-modal/mock";
import { VolatilityCalculationModal, type VolatilityCalculationModalProps } from "./VolatilityCalculationModal";

const meta = {
  component: VolatilityCalculationModal,
  title: "organisms/Modals/VolatilityCalculationModal",
} satisfies Meta<VolatilityCalculationModalProps>;

type Story = StoryObj<VolatilityCalculationModalProps>;

export const Main: Story = {
  args: { volatility: LowVolatility },
  decorators: StorybookCenteredLayout,
  render: (props) => {
    const { isOpen, openFn, closeFn } = useModalState(true);

    return (
      <>
        <Button dataAnalyticsId="storybook__open-modal-button" onClick={openFn}>
          Open modal
        </Button>
        <VolatilityCalculationModal {...props} show={isOpen} onClose={closeFn} />
      </>
    );
  },
};

export default meta;
