import type { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

export const ArrowUpRightDownLeftOutlineIcon: IconType = ({ className, ...props }) => {
  return (
    <svg className={twMerge(className)} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M9.3999 1.39999H12.5999V4.59999" />
      <path d="M4.5999 12.6H1.3999V9.39999" />
      <path
        d="M9.3999 1.39999H12.5999M12.5999 1.39999V4.59999M12.5999 1.39999L8.5999 5.59439M4.5999 12.6H1.3999M1.3999 12.6V9.39999M1.3999 12.6L5.5943 8.59999"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
