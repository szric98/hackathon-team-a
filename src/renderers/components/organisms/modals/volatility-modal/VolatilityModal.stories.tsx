import { type VolatilityDetail, VolatilityScoreValues } from "@/__generated__/dashboards-api";
import { Button } from "@/renderers/components/molecules/button/Button";
import { StorybookCenteredLayout } from "@/renderers/templates/StorybookLayout";
import { disableStoryArgs } from "@/utils/disable-story-args";
import type { InputType } from "@storybook/core/types";
import type { Meta, StoryObj } from "@storybook/react";
import { useModalState } from "../../../../../hooks/use-modal-state";
import { VolatilityModal, type VolatilityModalProps } from "./VolatilityModal";
import { HighVolatility, LowVolatility, MediumVolatility, NoDataVolatility } from "./mock";

type VolatilityStoryParams = VolatilityModalProps & {
  volatility: VolatilityDetail;
  past1: VolatilityDetail;
  past2: VolatilityDetail;
};

const meta = {
  component: VolatilityModal,
  title: "organisms/Modals/VolatilityModal",
} satisfies Meta<VolatilityStoryParams>;

type Story = StoryObj<VolatilityStoryParams>;

const VolatilitySelect: InputType = {
  control: { type: "select" },
  options: VolatilityScoreValues,
  mapping: {
    LOW: LowVolatility,
    MEDIUM: MediumVolatility,
    HIGH: HighVolatility,
    N_A_NOT_ENOUGH_DATA: NoDataVolatility,
  },
};

export const Main: Story = {
  args: {
    volatility: LowVolatility,
    past1: MediumVolatility,
    past2: HighVolatility,
  },
  argTypes: {
    volatility: VolatilitySelect,
    past1: VolatilitySelect,
    past2: VolatilitySelect,
    ...disableStoryArgs("show", "onClose"),
  },
  decorators: StorybookCenteredLayout,
  render: (props) => {
    const { isOpen, openFn, closeFn } = useModalState(true);

    return (
      <>
        <Button dataAnalyticsId="storybook__open-modal-button" onClick={openFn}>
          Open modal
        </Button>
        <VolatilityModal {...props} show={isOpen} onClose={closeFn} />
      </>
    );
  },
};

export default meta;
