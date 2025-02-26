import type { FC, JSX } from "react";
import type { AvailableIcons } from "../../atoms/icons/types";
import { Typography } from "../../atoms/typographies/Typography";
import { IconShape, type IconShapeProps } from "../icon-shape/IconShape";

export type Step = {
  icon: {
    name: AvailableIcons;
    iconAriaLabel: string;
    color?: IconShapeProps["color"]; // default is "gray"
    shape?: IconShapeProps["shape"]; // default is "circle"
  };
  title: string;
  description?: string | JSX.Element;
};

export type StepperProps = {
  steps: Step[];
};

export const Stepper: FC<StepperProps> = ({ steps }) => {
  return (
    <ol className="relative flex flex-col text-gray-500 dark:text-gray-400">
      {steps.map((step, index) => {
        const lastStep = steps.length - 1 === index;

        return (
          <li key={`${step.title}_${step.description}`} className="z-20 flex items-center gap-3">
            <div className="relative">
              {!lastStep && <Tail />}
              <div className="float-left [margin-inline-end:16px]">
                <IconShape
                  color={step.icon.color ?? "gray"}
                  icon={step.icon.name}
                  ariaLabel={step.icon.iconAriaLabel}
                  shape={step.icon.shape ?? "circle"}
                  className="leading-none"
                />
              </div>
              <div className="flex flex-col gap-1">
                <Typography.BodyMedium>{step.title}</Typography.BodyMedium>
                <Typography.Body color="secondary" className={!lastStep ? "pb-12" : undefined}>
                  {step.description}
                </Typography.Body>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
};

const ICON_LINE_SPACING = "0.5rem";
const ICON_SIZE = "2rem";
const LINE_WIDTH = "1px";

const Tail: FC = () => (
  <div
    className="absolute top-0 h-full px-0"
    style={{
      paddingTop: `calc(${ICON_LINE_SPACING} + ${ICON_SIZE})`,
      paddingBottom: `calc(${ICON_LINE_SPACING} * 1.5)`,
      insetInlineStart: `calc(${ICON_SIZE} / 2 - ${LINE_WIDTH})`,
      width: LINE_WIDTH,
    }}
  >
    <div className="h-full w-full rounded-full bg-gray-200" />
  </div>
);
