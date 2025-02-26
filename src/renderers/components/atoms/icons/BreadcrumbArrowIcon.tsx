import type { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

export const BreadcrumbArrowIcon: IconType = ({ className, ...props }) => {
  return (
    <svg
      className={twMerge(className, "mx-1 h-3 w-3 text-gray-400 rtl:rotate-180")}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 6 10"
      {...props}
    >
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
    </svg>
  );
};
