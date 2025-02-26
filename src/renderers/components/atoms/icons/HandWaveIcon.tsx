import type { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

export const HandWaveIcon: IconType = ({ className, ...props }) => {
  return (
    <svg className={twMerge(className)} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g clipPath="url(#clip0_11202_780)">
        <path d="M15.3336 11.3332C15.3336 13.5398 13.5402 15.3332 11.3336 15.3332V14.3332C13.0002 14.3332 14.3336 12.9998 14.3336 11.3332H15.3336ZM0.666908 4.6665C0.666908 2.45984 2.46024 0.666504 4.66691 0.666504V1.6665C3.00024 1.6665 1.66691 2.99984 1.66691 4.6665H0.666908ZM5.33357 2.87984L2.27357 5.9465C0.126907 8.09317 0.126907 11.5798 2.27357 13.7265C4.42024 15.8732 7.90691 15.8732 10.0536 13.7265L14.7669 8.99984C15.0936 8.6865 15.0936 8.15984 14.7669 7.83317C14.6895 7.75557 14.5975 7.69399 14.4963 7.65198C14.3951 7.60997 14.2865 7.58835 14.1769 7.58835C14.0673 7.58835 13.9588 7.60997 13.8575 7.65198C13.7563 7.69399 13.6643 7.75557 13.5869 7.83317L10.6402 10.7798L10.1669 10.3065L14.5269 5.9465C14.8536 5.61984 14.8536 5.09317 14.5269 4.7665C14.2002 4.43984 13.6669 4.43984 13.3336 4.7665L9.46024 8.6665L9.00024 8.17984L13.5802 3.5865C13.9069 3.25984 13.9069 2.73317 13.5802 2.4065C13.2536 2.07984 12.7269 2.07984 12.4002 2.4065L7.80691 6.99984L7.33357 6.53317L11.0002 2.87984C11.3336 2.55317 11.3336 2.0265 11.0002 1.69984C10.6669 1.37317 10.1469 1.37317 9.82024 1.69984L4.74024 6.77984C5.13842 7.29276 5.33576 7.93333 5.29526 8.5814C5.25475 9.22947 4.97918 9.84049 4.52024 10.2998L4.04691 9.8265C4.42144 9.4515 4.63181 8.94317 4.63181 8.41317C4.63181 7.88317 4.42144 7.37484 4.04691 6.99984L3.81357 6.7665L6.52691 4.05317C6.85357 3.7265 6.85357 3.19984 6.52691 2.87317C6.19357 2.55317 5.66691 2.55317 5.33357 2.87984Z" />
      </g>
      <defs>
        <clipPath id="clip0_11202_780">
          <rect width="16" height="16" />
        </clipPath>
      </defs>
    </svg>
  );
};
