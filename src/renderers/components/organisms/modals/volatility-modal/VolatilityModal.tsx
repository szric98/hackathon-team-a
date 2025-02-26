import type { VolatilityDetail, VolatilityScore } from "@/__generated__/dashboards-api";
import { useModalState } from "@/hooks/use-modal-state";
import { Icon } from "@/renderers/components/atoms/icons/Icon";
import { Typography } from "@/renderers/components/atoms/typographies/Typography";
import { Alert } from "@/renderers/components/molecules/alert/Alert";
import { Badge } from "@/renderers/components/molecules/badge/Badge";
import { Button } from "@/renderers/components/molecules/button/Button";
import { IconShape } from "@/renderers/components/molecules/icon-shape/IconShape";
import { Modal, ModalBody, ModalTitle, type WithCommonModalProps } from "@/renderers/components/molecules/modal/Modal";
import type { Maybe } from "@plandek/pkg-metric-utils";
import type { FC } from "react";
import { twMerge } from "tailwind-merge";
import { VolatilityCalculationModal } from "../volatility-calculation-modal/VolatilityCalculationModal";

export type VolatilityModalProps = WithCommonModalProps<{
  volatility: VolatilityDetail;
  past1: Maybe<VolatilityDetail>;
  past2: Maybe<VolatilityDetail>;
}>;

export const VolatilityModal: FC<VolatilityModalProps> = ({ show, onClose, volatility, past1, past2 }) => {
  const {
    isOpen: isCalculationsModalOpen,
    openFn: openCalculationsModal,
    closeFn: closeCalculationsModal,
  } = useModalState();

  return (
    <>
      <Modal show={show} onClose={onClose} size="4xl">
        <ModalTitle onClose={onClose}>Velocity volatility</ModalTitle>

        <ModalBody>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-3 gap-4">
                <VolatilityStatsCard
                  caption="Current sprint"
                  value={volatility.volatility}
                  volatility={volatility.volatilityScore}
                  highlighted
                />
                <VolatilityStatsCard
                  caption="Last sprint"
                  value={past1?.volatility}
                  volatility={past1?.volatilityScore}
                />
                <VolatilityStatsCard
                  caption="2 sprints ago"
                  value={past2?.volatility}
                  volatility={past2?.volatilityScore}
                />
              </div>

              <Alert
                icon={() => <Icon icon="CheckCircleIcon" className="mr-2 size-4 fill-gray-900" />}
                color="gray"
                additionalContent={
                  <div className="flex flex-col gap-3">
                    <Typography.Caption>
                      At Plandek we are all for data transparency. If you want to check your volatility calculations,
                      please click the button below.
                    </Typography.Caption>
                    <Button
                      color="alternative"
                      size="sm"
                      dataAnalyticsId="volatility-modal__show-calculations-button"
                      className="max-w-fit"
                      disabled={volatility.volatilityScore === "N_A_NOT_ENOUGH_DATA"}
                      onClick={openCalculationsModal}
                    >
                      <Icon icon="ScaleIcon" className="mr-2 size-3 fill-current" />
                      <Typography.SubCaptionMedium className="text-current">
                        Show Calculations
                      </Typography.SubCaptionMedium>
                    </Button>
                  </div>
                }
              >
                <Typography.CaptionBold>Want to check your calculations?</Typography.CaptionBold>
              </Alert>
            </div>

            <div className="flex flex-col gap-6">
              <Typography.BodyBold>How does Plandek calculate your volatility?</Typography.BodyBold>

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-1.5">
                  <Badge label="1" className="size-5 justify-center rounded-full" />
                  <Typography.CaptionBold>Analyze your sprint data</Typography.CaptionBold>
                </div>
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                  <Typography.Caption>
                    We analyze the data from your last 3* sprints and look at how much variance we see in the velocity.
                    For example, if in the last 3 sprints your velocity numbers were 1,100,1000 that would indicate high
                    volatility.
                  </Typography.Caption>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-1.5">
                  <Badge label="2" className="size-5 justify-center rounded-full" />
                  <Typography.CaptionBold>Volatility Rating Assignment</Typography.CaptionBold>
                </div>
                <div className="flex gap-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
                  <VolatilityRating volatility="LOW" highlighted={volatility.volatilityScore === "LOW"} />
                  <VolatilityRating volatility="MEDIUM" highlighted={volatility.volatilityScore === "MEDIUM"} />
                  <VolatilityRating volatility="HIGH" highlighted={volatility.volatilityScore === "HIGH"} />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <Typography.BodyBold>How can I manage volatility?</Typography.BodyBold>
              <Typography.Caption>
                When planning a sprint, consider both the past 3 sprints' velocity and volatility to set an achievable
                target. This balance ensures a realistic and effective plan for your team.
              </Typography.Caption>
            </div>

            <div className="flex w-full justify-end gap-3">
              <Button size="sm" dataAnalyticsId="volatility-modal__provide-feedback-button">
                Provide feedback
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>

      <VolatilityCalculationModal
        volatility={volatility}
        show={isCalculationsModalOpen}
        onClose={closeCalculationsModal}
      />
    </>
  );
};

type VolatilityStatsCardProps = {
  volatility?: VolatilityScore;
  value: Maybe<number>;
  caption: string;
  highlighted?: boolean;
};

export const VolatilityBadge: FC<{ volatility: VolatilityScore; onClick?: VoidFunction }> = ({
  volatility,
  onClick,
}) => {
  const config = VOLATILITY_CONFIG[volatility];

  return (
    <Badge
      label={config.title}
      color={config.componentColor}
      icon={onClick ? "ChevronRightIcon" : undefined}
      iconPosition="right"
      onClick={onClick}
    />
  );
};

const VolatilityStatsCard: FC<VolatilityStatsCardProps> = ({ volatility, caption, value, highlighted }) => {
  const config = VOLATILITY_CONFIG[volatility ?? "N_A_NOT_ENOUGH_DATA"];

  return (
    <div
      className={twMerge(
        "flex items-center gap-3.5 rounded-lg border p-5 shadow ring-4",
        highlighted ? config.ringColor : "ring-0",
      )}
    >
      <IconShape icon="ChartIcon" color={config.componentColor} size="lg" ariaLabel={config.title} />
      <div className="flex flex-col gap-1">
        <p className="font-bold text-3xl text-gray-900 leading-tight">
          {volatility !== "N_A_NOT_ENOUGH_DATA" ? (value ?? "N/A") : "N/A"}
        </p>
        <VolatilityBadge volatility={volatility ?? "N_A_NOT_ENOUGH_DATA"} />
        <Typography.Caption color="disabled">{caption}</Typography.Caption>
      </div>
    </div>
  );
};

const VolatilityRating: FC<{ volatility: VolatilityScore; highlighted?: boolean }> = ({ volatility, highlighted }) => {
  const config = VOLATILITY_CONFIG[volatility];

  return (
    <div
      className={twMerge(
        "flex flex-col gap-4 rounded-lg border border-gray-100 bg-white p-6",
        highlighted ? `${config.highlightedBorderColor} border-2` : undefined,
      )}
    >
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <div className={twMerge("size-3.5 rounded-full", config.indicatorColor)} />
          <Typography.CaptionBold>{config.title}</Typography.CaptionBold>
        </div>
        <Typography.CaptionMedium>{config.range}</Typography.CaptionMedium>
      </div>
      <Typography.Caption>{config.description}</Typography.Caption>
    </div>
  );
};

const VOLATILITY_CONFIG: Record<
  VolatilityScore,
  {
    title: string;
    description: string;
    range: string;
    componentColor: "red" | "yellow" | "green" | "gray";
    indicatorColor: string;
    ringColor: string;
    highlightedBorderColor: string;
  }
> = {
  HIGH: {
    title: "High Volatility",
    range: "(30 and up)",
    description:
      "High volatility over the last 3 sprints indicates very low confidence in planning the next sprint with 30 points.",
    componentColor: "red",
    indicatorColor: "bg-red-600",
    ringColor: "ring-red-100",
    highlightedBorderColor: "border-red-700",
  },
  MEDIUM: {
    title: "Medium Volatility",
    range: "(15 to 30)",
    description:
      "Medium volatility over the last 3 sprints suggests lower confidence in planning the next sprint with 30 points.",
    componentColor: "yellow",
    indicatorColor: "bg-yellow-300",
    ringColor: "ring-yellow-100",
    highlightedBorderColor: "border-yellow-400",
  },
  LOW: {
    title: "Low Volatility",
    range: "(0 to 15)",
    description:
      "The low volatility over the last 3 sprints suggests strong confidence in planning the next sprint with 30 points",
    componentColor: "green",
    indicatorColor: "bg-green-500",
    ringColor: "ring-green-100",
    highlightedBorderColor: "border-green-600",
  },
  N_A_NOT_ENOUGH_DATA: {
    title: "Not Enough Data",
    range: "N/A",
    description: "Not enough data to calculate volatility",
    componentColor: "gray",
    indicatorColor: "bg-gray-300",
    ringColor: "ring-gray-100",
    highlightedBorderColor: "border-gray-400",
  },
};
