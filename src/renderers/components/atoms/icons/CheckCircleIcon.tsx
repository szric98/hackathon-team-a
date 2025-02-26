import type { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

export const CheckCircleIcon: IconType = ({ className, ...props }) => {
  return (
    <svg className={twMerge(className)} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M8 0C6.41775 0 4.87103 0.469192 3.55544 1.34824C2.23985 2.22729 1.21447 3.47672 0.608967 4.93853C0.00346627 6.40034 -0.15496 8.00887 0.153721 9.56072C0.462403 11.1126 1.22433 12.538 2.34315 13.6569C3.46197 14.7757 4.88743 15.5376 6.43928 15.8463C7.99113 16.155 9.59966 15.9965 11.0615 15.391C12.5233 14.7855 13.7727 13.7602 14.6518 12.4446C15.5308 11.129 16 9.58225 16 8C15.9977 5.87898 15.1541 3.8455 13.6543 2.34572C12.1545 0.845932 10.121 0.00232928 8 0ZM10.9656 6.9656L7.7656 10.1656C7.61558 10.3156 7.41213 10.3998 7.2 10.3998C6.98787 10.3998 6.78442 10.3156 6.6344 10.1656L5.0344 8.5656C4.88868 8.41472 4.80804 8.21263 4.80986 8.00288C4.81169 7.79312 4.89582 7.59247 5.04415 7.44414C5.19247 7.29582 5.39312 7.21168 5.60288 7.20986C5.81264 7.20804 6.01472 7.28867 6.1656 7.4344L7.2 8.4688L9.8344 5.8344C9.98528 5.68867 10.1874 5.60804 10.3971 5.60986C10.6069 5.61168 10.8075 5.69582 10.9559 5.84414C11.1042 5.99247 11.1883 6.19312 11.1901 6.40288C11.192 6.61263 11.1113 6.81472 10.9656 6.9656Z" />
    </svg>
  );
};
