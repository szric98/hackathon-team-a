import { cva } from "class-variance-authority";

export const COLOR_VALUES = [
  "primary",
  "secondary",
  "gray",
  "brand",
  "brandLight",
  "brandDark",
  "disabled",
  "success",
  "error",
] as const;
type Color = (typeof COLOR_VALUES)[number];

export const VARIANT_VALUES = [
  "Heading1",
  "Heading2",
  "Heading3",
  "Body",
  "BodyMedium",
  "BodyBold",
  "Caption",
  "CaptionMedium",
  "CaptionBold",
  "SubCaption",
  "SubCaptionMedium",
  "SubCaptionBold",
] as const;
export type Variant = (typeof VARIANT_VALUES)[number];

type VariantSettings = {
  color: Record<Color, string>;
  variant: Record<Variant, string>;
  clickable: Record<"true" | "false", string>;
  disabled: Record<"true" | "false", string>;
};

export const typographyVariants = /*tw:*/ cva<VariantSettings>(
  {},
  {
    defaultVariants: { color: "primary" },
    variants: {
      color: {
        primary: "text-gray-900 dark:text-gray-50",
        secondary: "text-gray-500 dark:text-gray-300",
        gray: "text-gray-700 dark:text-gray-400",
        brand: "text-brand-700 dark:text-brand-500",
        brandLight: "text-brand-600 dark:text-brand-300",
        brandDark: "text-brand-800 dark:text-brand-400",
        disabled: "text-gray-400 dark:text-gray-500",
        success: "text-green-700 dark:text-green-500",
        error: "text-red-700 dark:text-red-500",
      },
      variant: {
        Heading1: "font-bold text-2xl",
        Heading2: "font-bold text-xl",
        Heading3: "font-semibold text-lg leading-none",

        Body: "font-normal text-base",
        BodyMedium: "font-medium text-base",
        BodyBold: "font-semibold text-base leading-none",

        Caption: "font-normal text-sm",
        CaptionMedium: "font-medium text-sm",
        CaptionBold: "font-semibold text-sm leading-tight",

        SubCaption: "font-normal text-xs",
        SubCaptionMedium: "font-medium text-xs",
        SubCaptionBold: "font-semibold text-xs leading-tight",
      },
      clickable: {
        true: "cursor-pointer hover:text-brand-700 dark:hover:text-brand-500",
        false: "",
      },
      disabled: {
        true: "pointer-events-none cursor-default text-gray-400 dark:text-gray-500",
        false: "",
      },
    },
  },
);
