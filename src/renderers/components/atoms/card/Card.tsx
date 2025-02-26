import type { WithAnalyticsTagOptional } from "@/types";
import { useCheckForAnalyticsId } from "@/utils/analytics";
import type { DraggableAttributes, DraggableSyntheticListeners } from "@dnd-kit/core";
import { cva } from "class-variance-authority";
import type { FC, HTMLAttributes, PropsWithChildren, Ref } from "react";
import { twMerge } from "tailwind-merge";

export const SIZE_VALUES = ["sm", "md", "lg"] as const;
export type CardSize = (typeof SIZE_VALUES)[number];

type CardParams = Pick<
  HTMLAttributes<HTMLDivElement>,
  "onClick" | "className" | "onMouseEnter" | "onMouseLeave" | "style"
> & {
  ref?: Ref<HTMLDivElement>;
  size: CardSize;
  highlight?: boolean;
  dataTestId?: string;
  attributes?: DraggableAttributes | null;
  listeners?: DraggableSyntheticListeners | null;
};

export type CardProps = WithAnalyticsTagOptional<CardParams>;
export const Card: FC<PropsWithChildren<CardProps>> = (props) => {
  const {
    ref,
    size,
    className,
    highlight = false,
    dataAnalyticsId,
    onMouseEnter,
    onMouseLeave,
    style,
    onClick,
    children,
    dataTestId,
    attributes,
    listeners,
  } = props;
  useCheckForAnalyticsId(props);

  const containerClassname = cardVariants({ size, highlight, clickable: !!props.onClick });

  return (
    <div
      ref={ref}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={style}
      className={twMerge(containerClassname, className)}
      data-analytics-id={dataAnalyticsId}
      data-testid={dataTestId}
      {...attributes}
      {...listeners}
    >
      {children}
    </div>
  );
};

type VariantSettings = {
  clickable: Record<"true" | "false", string>;
  highlight: Record<"true" | "false", string>;
  size: Record<CardSize, string>;
};

const cardVariants = /*tw:*/ cva<VariantSettings>("flex flex-col bg-white dark:bg-gray-800", {
  variants: {
    clickable: {
      true: "cursor-pointer",
      false: "",
    },
    highlight: {
      true: "",
      false: "",
    },
    size: {
      sm: "gap-3 rounded-lg p-2 shadow-sm",
      md: "gap-4 rounded-xl p-3 shadow",
      lg: "gap-6 rounded-xl p-6 shadow-md",
    },
  },
  compoundVariants: [
    {
      highlight: true,
      size: "sm",
      className: "shadow",
    },
    {
      highlight: true,
      size: "md",
      className: "shadow-md",
    },
    {
      highlight: true,
      size: "lg",
      className: "shadow-lg",
    },
  ],
});
