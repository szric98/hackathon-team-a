import type { CSSProperties, FC } from "react";
import { type ClassNameValue, twMerge } from "tailwind-merge";

export type SkeletonProps = {
  style?: CSSProperties;
  className?: ClassNameValue;
};

export const Skeleton: FC<SkeletonProps> = ({ style, className }) => {
  return (
    <div
      role="status"
      style={style}
      className={twMerge("h-2 w-48 animate-pulse bg-gray-200 dark:bg-gray-700", className)}
    />
  );
};
