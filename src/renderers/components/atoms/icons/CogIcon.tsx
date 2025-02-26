import type { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

export const CogIcon: IconType = ({ className, ...props }) => {
  return (
    <svg className={twMerge(className)} viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M13.2222 5.94444H12.6334L12.0836 4.61678L12.4997 4.19989C12.6455 4.05403 12.7274 3.85624 12.7274 3.65C12.7274 3.44376 12.6455 3.24597 12.4997 3.10011L11.3999 2.00033C11.254 1.85452 11.0562 1.77261 10.85 1.77261C10.6438 1.77261 10.446 1.85452 10.3001 2.00033L9.88322 2.41644L8.55556 1.86656V1.27778C8.55556 1.0715 8.47361 0.873667 8.32775 0.727806C8.18189 0.581944 7.98406 0.5 7.77778 0.5H6.22222C6.01594 0.5 5.81811 0.581944 5.67225 0.727806C5.52639 0.873667 5.44444 1.0715 5.44444 1.27778V1.86656L4.11678 2.41644L3.69989 2.00033C3.55403 1.85452 3.35624 1.77261 3.15 1.77261C2.94376 1.77261 2.74597 1.85452 2.60011 2.00033L1.50033 3.10011C1.35452 3.24597 1.27261 3.44376 1.27261 3.65C1.27261 3.85624 1.35452 4.05403 1.50033 4.19989L1.91722 4.61678L1.36656 5.94444H0.777778C0.571498 5.94444 0.373667 6.02639 0.227806 6.17225C0.0819442 6.31811 0 6.51594 0 6.72222V8.27778C0 8.48406 0.0819442 8.68189 0.227806 8.82775C0.373667 8.97361 0.571498 9.05556 0.777778 9.05556H1.36656C1.63178 9.69567 1.652 9.74311 1.91644 10.3832L1.50033 10.8001C1.35452 10.946 1.27261 11.1438 1.27261 11.35C1.27261 11.5562 1.35452 11.754 1.50033 11.8999L2.60011 12.9997C2.74597 13.1455 2.94376 13.2274 3.15 13.2274C3.35624 13.2274 3.55403 13.1455 3.69989 12.9997L4.11678 12.5836L5.44444 13.1334V13.7222C5.44444 13.9285 5.52639 14.1263 5.67225 14.2722C5.81811 14.4181 6.01594 14.5 6.22222 14.5H7.77778C7.98406 14.5 8.18189 14.4181 8.32775 14.2722C8.47361 14.1263 8.55556 13.9285 8.55556 13.7222V13.1334L9.88322 12.5828L10.3001 12.9997C10.446 13.1455 10.6438 13.2274 10.85 13.2274C11.0562 13.2274 11.254 13.1455 11.3999 12.9997L12.4997 11.8999C12.6455 11.754 12.7274 11.5562 12.7274 11.35C12.7274 11.1438 12.6455 10.946 12.4997 10.8001L12.0836 10.3832L12.6334 9.05556H13.2222C13.4285 9.05556 13.6263 8.97361 13.7722 8.82775C13.9181 8.68189 14 8.48406 14 8.27778V6.72222C14 6.51594 13.9181 6.31811 13.7722 6.17225C13.6263 6.02639 13.4285 5.94444 13.2222 5.94444ZM7 10.6111C6.38468 10.6111 5.78318 10.4286 5.27156 10.0868C4.75994 9.74494 4.36118 9.25905 4.12571 8.69057C3.89024 8.12209 3.82862 7.49655 3.94867 6.89305C4.06871 6.28956 4.36502 5.73521 4.80011 5.30011C5.23521 4.86502 5.78956 4.56871 6.39305 4.44867C6.99655 4.32862 7.62209 4.39024 8.19057 4.62571C8.75905 4.86118 9.24494 5.25994 9.58679 5.77156C9.92865 6.28318 10.1111 6.88468 10.1111 7.5C10.1111 8.32512 9.78333 9.11644 9.19989 9.69989C8.61644 10.2833 7.82512 10.6111 7 10.6111Z" />
    </svg>
  );
};
