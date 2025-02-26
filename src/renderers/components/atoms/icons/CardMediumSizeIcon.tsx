import { twMerge } from "tailwind-merge";
import { checkmarkPath } from "./common";
import type { CardSizeIcon } from "./types";

export const CardMediumSizeIcon: CardSizeIcon = ({ className, withCheckmark, ...props }) => {
  return (
    <svg className={twMerge(className)} viewBox="0 0 53 22" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      {withCheckmark && checkmarkPath}
      <rect x="22" y="0.703125" width="20.3438" height="9.6875" rx="1.9375" className="fill-gray-600" />
      <rect x="43.7969" y="1.1875" width="8.71875" height="8.71875" rx="1.45313" strokeWidth="0.96875" />
      <rect x="22.4844" y="11.8438" width="8.71875" height="8.71875" rx="1.45313" strokeWidth="0.96875" />
      <rect x="33.1406" y="11.8438" width="8.71875" height="8.71875" rx="1.45313" strokeWidth="0.96875" />
      <rect x="43.7969" y="11.8438" width="8.71875" height="8.71875" rx="1.45313" strokeWidth="0.96875" />
    </svg>
  );
};
