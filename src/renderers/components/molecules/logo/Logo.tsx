import { cva } from "class-variance-authority";
import type { FC } from "react";

import { Icon } from "../../atoms/icons/Icon";

export const SIZE_VALUES = ["xs", "sm", "md", "lg", "xl"] as const;
type SIZE = (typeof SIZE_VALUES)[number];

export type LogoProps = { size: SIZE; withText?: boolean };
export const Logo: FC<LogoProps> = ({ size, withText = false }) => {
  const containerClassName = containerVariants({ size });
  const iconClassName = logoSizeVariants({ size });
  const textClassName = textIconSizeVariants({ size });

  return (
    <div className={containerClassName}>
      <Icon icon="LogoIcon" className={iconClassName} />
      {withText && <Icon icon="LogoTextIcon" className={textClassName} />}
    </div>
  );
};

type VariantSettings = {
  size: Record<SIZE, string>;
};

const containerVariants = /*tw:*/ cva<VariantSettings>("flex w-min items-center justify-center", {
  variants: {
    size: {
      xs: "gap-2",
      sm: "gap-2.5",
      md: "gap-4",
      lg: "gap-4",
      xl: "gap-5",
    },
  },
});

const logoSizeVariants = /*tw:*/ cva<VariantSettings>(
  {},
  {
    variants: {
      size: {
        xs: "size-6",
        sm: "size-8",
        md: "size-12",
        lg: "size-16",
        xl: "size-24",
      },
    },
  },
);

const textIconSizeVariants = /*tw:*/ cva<VariantSettings>(
  {},
  {
    variants: {
      size: {
        xs: "h-3.5",
        sm: "h-4",
        md: "h-7",
        lg: "h-9",
        xl: "h-14",
      },
    },
  },
);
