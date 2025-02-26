import * as RadixCheckbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import { cva } from "class-variance-authority";
import type { FC, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";
import type { TypographyVariants } from "../../atoms/typographies/Typography";
import { typographyVariants } from "../../atoms/typographies/config";

export const COLOR_VALUES = ["brand"] as const;
type Color = (typeof COLOR_VALUES)[number];

export type CheckboxProps = {
  id: string;
  color?: Color;
  checked: boolean;
  text?: Pick<TypographyVariants, "variant" | "color"> & {
    value: string;
  };
  className?: string;
  onCheckedChange?: (checked: boolean) => void;
};

export const Checkbox: FC<CheckboxProps> = ({ id, color = "brand", checked, text, className, onCheckedChange }) => {
  const checkbox = checkboxVariants({ color, checked });

  const content = (
    <TextWrapper id={id} text={text} className={className}>
      <RadixCheckbox.Root id={id} checked={checked} onCheckedChange={onCheckedChange} className={checkbox}>
        <RadixCheckbox.Indicator>
          <CheckIcon />
        </RadixCheckbox.Indicator>
      </RadixCheckbox.Root>
    </TextWrapper>
  );

  if (onCheckedChange) return <form>{content}</form>;

  return content;
};

const TextWrapper: FC<PropsWithChildren<Pick<CheckboxProps, "id" | "text" | "className">>> = ({
  id,
  text,
  children,
  className,
}) => {
  if (!text) return children;

  const { color, variant, value } = text;
  const labelClass = typographyVariants({ color, variant });

  return (
    <div className={twMerge("flex items-center gap-x-2", className)}>
      {children}
      <label className={twMerge("cursor-pointer", labelClass)} htmlFor={id}>
        {value}
      </label>
    </div>
  );
};

type VariantSettings = {
  color: Record<Color, string>;
  checked: Record<"true" | "false", string>;
};

const checkboxVariants = /*tw:*/ cva<VariantSettings>(
  "size-4 rounded bg-gray-50 text-white focus:ring-2 dark:bg-gray-700 dark:ring-offset-gray-800",
  {
    variants: {
      color: {
        brand:
          "focus:ring-brand-500 aria-checked:bg-brand-700 dark:aria-checked:bg-brand-700 dark:focus:ring-brand-500",
      },
      checked: {
        true: "",
        false: "border border-gray-300 dark:border-gray-600",
      },
    },
  },
);
