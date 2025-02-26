import type { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

export const LogoIcon: IconType = ({ className, ...props }) => {
  return (
    <svg
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={twMerge(className, "fill-brand-700")}
      {...props}
    >
      <path d="M22.0781 0V5.9964H6.50757V13.4757H8.90469V8.40072H22.0781V21.5957H8.90469V20.0048H6.50757V24H24.4752V5.9964V0H22.0781Z" />
      <path d="M0 0V17.9964V24H2.39712V17.9964H17.9676V10.5171H15.5705V15.5993H2.39712V2.39712H15.5705V3.988H17.9676V0H0Z" />
    </svg>
  );
};
