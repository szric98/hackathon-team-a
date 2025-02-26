import type { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

export const WorkspaceIcon: IconType = ({ className, ...props }) => {
  return (
    <svg className={twMerge(className)} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M3.2 15.2C2.32 15.2 1.56667 14.8867 0.94 14.26C0.313333 13.6333 0 12.88 0 12C0 11.12 0.313333 10.3667 0.94 9.73999C1.56667 9.11332 2.32 8.79999 3.2 8.79999C4.08 8.79999 4.83333 9.11332 5.46 9.73999C6.08667 10.3667 6.4 11.12 6.4 12C6.4 12.88 6.08667 13.6333 5.46 14.26C4.83333 14.8867 4.08 15.2 3.2 15.2ZM12.8 15.2C11.92 15.2 11.1667 14.8867 10.54 14.26C9.91333 13.6333 9.6 12.88 9.6 12C9.6 11.12 9.91333 10.3667 10.54 9.73999C11.1667 9.11332 11.92 8.79999 12.8 8.79999C13.68 8.79999 14.4333 9.11332 15.06 9.73999C15.6867 10.3667 16 11.12 16 12C16 12.88 15.6867 13.6333 15.06 14.26C14.4333 14.8867 13.68 15.2 12.8 15.2ZM3.2 13.6C3.64 13.6 4.0168 13.4435 4.3304 13.1304C4.644 12.8173 4.80053 12.4405 4.8 12C4.79947 11.5595 4.64293 11.1829 4.3304 10.8704C4.01787 10.5579 3.64107 10.4011 3.2 10.4C2.75893 10.3989 2.3824 10.5557 2.0704 10.8704C1.7584 11.1851 1.6016 11.5616 1.6 12C1.5984 12.4384 1.7552 12.8152 2.0704 13.1304C2.3856 13.4456 2.76213 13.6021 3.2 13.6ZM12.8 13.6C13.24 13.6 13.6168 13.4435 13.9304 13.1304C14.244 12.8173 14.4005 12.4405 14.4 12C14.3995 11.5595 14.2429 11.1829 13.9304 10.8704C13.6179 10.5579 13.2411 10.4011 12.8 10.4C12.3589 10.3989 11.9824 10.5557 11.6704 10.8704C11.3584 11.1851 11.2016 11.5616 11.2 12C11.1984 12.4384 11.3552 12.8152 11.6704 13.1304C11.9856 13.4456 12.3621 13.6021 12.8 13.6ZM8 7.19999C7.12 7.19999 6.36667 6.88665 5.74 6.25999C5.11333 5.63332 4.8 4.87999 4.8 3.99999C4.8 3.11999 5.11333 2.36665 5.74 1.73999C6.36667 1.11332 7.12 0.799988 8 0.799988C8.88 0.799988 9.63333 1.11332 10.26 1.73999C10.8867 2.36665 11.2 3.11999 11.2 3.99999C11.2 4.87999 10.8867 5.63332 10.26 6.25999C9.63333 6.88665 8.88 7.19999 8 7.19999ZM8 5.59999C8.44 5.59999 8.8168 5.44345 9.1304 5.13039C9.444 4.81732 9.60053 4.44052 9.6 3.99999C9.59947 3.55945 9.44293 3.18292 9.1304 2.87039C8.81787 2.55785 8.44107 2.40105 8 2.39999C7.55893 2.39892 7.1824 2.55572 6.8704 2.87039C6.5584 3.18505 6.4016 3.56159 6.4 3.99999C6.3984 4.43839 6.5552 4.81519 6.8704 5.13039C7.1856 5.44559 7.56213 5.60212 8 5.59999Z" />
    </svg>
  );
};
