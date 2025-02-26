import type { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

export const DotsVerticalIcon: IconType = ({ className, ...props }) => {
  return (
    <svg className={twMerge(className)} viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M10.5 4C11.6046 4 12.5 3.10457 12.5 2C12.5 0.895431 11.6046 0 10.5 0C9.39543 0 8.5 0.895431 8.5 2C8.5 3.10457 9.39543 4 10.5 4Z" />
      <path d="M10.5 12C11.6046 12 12.5 11.1046 12.5 10C12.5 8.89543 11.6046 8 10.5 8C9.39543 8 8.5 8.89543 8.5 10C8.5 11.1046 9.39543 12 10.5 12Z" />
      <path d="M10.5 20C11.6046 20 12.5 19.1046 12.5 18C12.5 16.8954 11.6046 16 10.5 16C9.39543 16 8.5 16.8954 8.5 18C8.5 19.1046 9.39543 20 10.5 20Z" />
    </svg>
  );
};
