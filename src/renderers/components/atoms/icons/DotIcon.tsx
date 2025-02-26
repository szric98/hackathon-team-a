import type { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

export const DotIcon: IconType = ({ className, ...props }) => {
  return (
    <svg className={twMerge(className)} viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect width="8" height="8" rx="4" />
    </svg>
  );
};
