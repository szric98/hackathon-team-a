import type { WithAnalyticsTag } from "@/types";
import { cva } from "class-variance-authority";
import type { FC } from "react";
import { Icon } from "../../atoms/icons/Icon";
import type { AvailableIcons } from "../../atoms/icons/types";

type DropdownIconTriggerParams = {
  icon: AvailableIcons;
  size: SIZE;
};

export type DropdownIconTriggerProps = WithAnalyticsTag<DropdownIconTriggerParams>;

export const DropdownIconTrigger: FC<DropdownIconTriggerProps> = ({ icon, size, dataAnalyticsId }) => (
  <div className={containerVariants({ size })}>
    <Icon icon={icon} className={iconVariants({ size })} dataAnalyticsId={dataAnalyticsId} />
  </div>
);

export const SIZE_VALUES = ["xs", "sm", "md", "lg", "xl"] as const;
type SIZE = (typeof SIZE_VALUES)[number];

type VariantSettings = {
  size: Record<SIZE, string>;
};

const containerVariants = /*tw:*/ cva<VariantSettings>(
  "group flex items-center justify-center rounded-full p-1 hover:shadow focus:shadow group-aria-expanded:shadow group-aria-expanded:dark:bg-gray-700 group-aria-expanded:dark:shadow-md group-hover:dark:bg-gray-700 focus:dark:bg-gray-700 focus:dark:shadow-md hover:dark:shadow-md",
  {
    variants: {
      size: {
        xs: "size-5",
        sm: "size-[30px]",
        md: "size-9",
        lg: "size-10",
        xl: "size-11",
      },
    },
  },
);

const iconVariants = /*tw:*/ cva<VariantSettings>(
  "focus:dark-fill-white flex-shrink-0 cursor-pointer fill-gray-500 focus:fill-gray-800 group-aria-expanded:fill-gray-800 dark:fill-gray-400 group-aria-expanded:dark:fill-white group-hover:dark:fill-gray-300",
  {
    variants: {
      size: {
        xs: "size-3",
        sm: "size-3.5",
        md: "size-4",
        lg: "size-4",
        xl: "size-5",
      },
    },
  },
);
