import { cva } from "class-variance-authority";
import type { CustomFlowbiteTheme, SpinnerProps as FlowSpinnerProps } from "flowbite-react";
import { Spinner as FlowSpinner } from "flowbite-react";
import type { FC } from "react";
import { twMerge } from "tailwind-merge";

export const SIZES = ["sm", "md", "lg"] as const;
export type SpinnerSize = (typeof SIZES)[number];

export type SpinnerProps = Pick<FlowSpinnerProps, "color" | "className"> & { size?: SpinnerSize };

export const Spinner: FC<SpinnerProps> = ({ size = "md", color = "default", className }) => {
  const spinnerSizeClassName = spinnerSizeVariants({ size });

  return <FlowSpinner color={color} theme={spinnerTheme} className={twMerge(spinnerSizeClassName, className)} />;
};

const spinnerTheme: CustomFlowbiteTheme["spinner"] = /*tw:*/ {
  color: {
    default: "fill-brand-600",
  },
};

type Variant = { size: Record<SpinnerSize, string> };

const spinnerSizeVariants = /*tw:*/ cva<Variant>("", {
  variants: {
    size: {
      sm: "size-12",
      md: "size-16",
      lg: "size-24",
    },
  },
});
