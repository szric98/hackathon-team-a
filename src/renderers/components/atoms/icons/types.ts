import type { FC } from "react";
import type { IconBaseProps } from "react-icons";
import type * as Variants from "./index";

export type AvailableIcons = keyof typeof Variants;
export type CardSizeIcon = FC<
  IconBaseProps & {
    withCheckmark?: boolean;
  }
>;
