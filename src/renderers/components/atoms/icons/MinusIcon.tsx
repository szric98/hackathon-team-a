import type { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

export const MinusIcon: IconType = ({ className, ...props }) => {
  return (
    <svg className={twMerge(className)} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M15.1111 7.2002H0.888889C0.653141 7.2002 0.427048 7.32662 0.260349 7.55167C0.0936505 7.77671 0 8.08194 0 8.4002C0 8.71846 0.0936505 9.02368 0.260349 9.24872C0.427048 9.47377 0.653141 9.6002 0.888889 9.6002H15.1111C15.3469 9.6002 15.573 9.47377 15.7397 9.24872C15.9064 9.02368 16 8.71846 16 8.4002C16 8.08194 15.9064 7.77671 15.7397 7.55167C15.573 7.32662 15.3469 7.2002 15.1111 7.2002Z" />
    </svg>
  );
};
