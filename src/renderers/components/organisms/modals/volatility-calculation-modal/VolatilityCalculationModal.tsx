import type { VolatilityDetail } from "@/__generated__/dashboards-api";
import { Button } from "@/renderers/components/molecules/button/Button";
import { Modal, ModalBody, ModalTitle, type WithCommonModalProps } from "@/renderers/components/molecules/modal/Modal";
import { type Step, Stepper } from "@/renderers/components/molecules/stepper/Stepper";
import type { FC } from "react";

export type VolatilityCalculationModalProps = WithCommonModalProps<{
  volatility: VolatilityDetail;
}>;

export const VolatilityCalculationModal: FC<VolatilityCalculationModalProps> = ({ volatility, show, onClose }) => {
  const steps: Step[] = [
    {
      icon: {
        name: "SprintsIcon",
        iconAriaLabel: "Sprint Velocities",
      },
      title: "1. We take your sprint velocities",
      description: `[${volatility.values.join(", ")}]`,
    },
    {
      icon: {
        name: "MinusIcon",
        iconAriaLabel: "Mean Average",
      },
      title: "2. Calculate the mean average",
      description: `x̄= ${volatility.mean}`,
    },
    {
      icon: {
        name: "ShuffleIcon",
        iconAriaLabel: "Sample Standard Deviation",
      },
      title: "3. Calculate the Sample Standard Deviation",
      description: `SD = ${volatility.standardDeviation}`,
    },
    {
      icon: {
        name: "ScaleIcon",
        iconAriaLabel: "Velocity Volatility",
        color: "green",
      },
      title: "4. Calculate the Velocity Volatility",
      description: `Volatility = 100 * (SD / x̄) = ${volatility.volatility}`,
    },
  ];

  return (
    <Modal show={show} onClose={onClose} size="fit">
      <ModalTitle onClose={onClose}>Your calculation</ModalTitle>
      <ModalBody>
        <div className="flex flex-col gap-6">
          <Stepper steps={steps} />
          <div className="flex w-full justify-end gap-3">
            <Button color="success" dataAnalyticsId="volatility-calculation-modal__got-it-button" onClick={onClose}>
              Got it
            </Button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};
