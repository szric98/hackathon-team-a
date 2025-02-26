import type { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

export const ArrowUpIcon: IconType = ({ className, ...props }) => {
  return (
    <svg className={twMerge(className)} viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M8.53951 3.06635L5.54011 0.209172C5.47027 0.142515 5.38716 0.0898168 5.29566 0.0541704C5.11222 -0.0180568 4.90621 -0.0180568 4.72277 0.0541704C4.63127 0.0898168 4.54816 0.142515 4.47832 0.209172L1.47892 3.06635C1.4073 3.13224 1.35018 3.21106 1.31088 3.2982C1.27158 3.38535 1.25089 3.47908 1.25003 3.57392C1.24916 3.66877 1.26814 3.76283 1.30584 3.85061C1.34354 3.93839 1.39922 4.01815 1.46963 4.08521C1.54003 4.15228 1.62375 4.20532 1.71591 4.24123C1.80806 4.27715 1.9068 4.29522 2.00637 4.2944C2.10593 4.29357 2.20433 4.27387 2.29581 4.23643C2.38729 4.199 2.47004 4.14458 2.53921 4.07636L4.26011 2.43848V9.28571C4.26011 9.47515 4.33912 9.65683 4.47974 9.79079C4.62036 9.92474 4.81109 10 5.00996 10C5.20884 10 5.39956 9.92474 5.54019 9.79079C5.68081 9.65683 5.75981 9.47515 5.75981 9.28571V2.43848L7.47922 4.07636C7.62064 4.20647 7.81006 4.27847 8.00666 4.27684C8.20327 4.27522 8.39135 4.20009 8.53037 4.06766C8.6694 3.93522 8.74826 3.75607 8.74997 3.56878C8.75168 3.3815 8.6761 3.20107 8.53951 3.06635Z" />
    </svg>
  );
};
