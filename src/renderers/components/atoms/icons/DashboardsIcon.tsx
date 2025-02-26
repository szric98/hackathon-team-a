import type { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

export const DashboardsIcon: IconType = ({ className, ...props }) => {
  return (
    <svg className={twMerge(className)} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M2.23532 0.588257C1.79849 0.588257 1.37955 0.761786 1.07067 1.07067C0.761786 1.37955 0.588257 1.79849 0.588257 2.23532V3.88237C0.588257 4.3192 0.761786 4.73814 1.07067 5.04702C1.37955 5.3559 1.79849 5.52943 2.23532 5.52943H5.52943C5.96626 5.52943 6.3852 5.3559 6.69408 5.04702C7.00296 4.73814 7.17649 4.3192 7.17649 3.88237V2.23532C7.17649 1.79849 7.00296 1.37955 6.69408 1.07067C6.3852 0.761786 5.96626 0.588257 5.52943 0.588257H2.23532ZM13.7647 15.4118C14.2016 15.4118 14.6205 15.2383 14.9294 14.9294C15.2383 14.6205 15.4118 14.2016 15.4118 13.7647V12.1177C15.4118 11.6808 15.2383 11.2619 14.9294 10.953C14.6205 10.6441 14.2016 10.4706 13.7647 10.4706H10.4706C10.0338 10.4706 9.61485 10.6441 9.30596 10.953C8.99708 11.2619 8.82355 11.6808 8.82355 12.1177V13.7647C8.82355 14.2016 8.99708 14.6205 9.30596 14.9294C9.61485 15.2383 10.0338 15.4118 10.4706 15.4118H13.7647ZM2.23532 7.17649C1.79849 7.17649 1.37955 7.35002 1.07067 7.65891C0.761786 7.96779 0.588257 8.38672 0.588257 8.82355V13.7647C0.588257 14.2016 0.761786 14.6205 1.07067 14.9294C1.37955 15.2383 1.79849 15.4118 2.23532 15.4118H5.52943C5.96626 15.4118 6.3852 15.2383 6.69408 14.9294C7.00296 14.6205 7.17649 14.2016 7.17649 13.7647V8.82355C7.17649 8.38672 7.00296 7.96779 6.69408 7.65891C6.3852 7.35002 5.96626 7.17649 5.52943 7.17649H2.23532ZM13.7647 8.82355C14.2016 8.82355 14.6205 8.65002 14.9294 8.34114C15.2383 8.03226 15.4118 7.61332 15.4118 7.17649V2.23532C15.4118 1.79849 15.2383 1.37955 14.9294 1.07067C14.6205 0.761786 14.2016 0.588257 13.7647 0.588257H10.4706C10.0338 0.588257 9.61485 0.761786 9.30596 1.07067C8.99708 1.37955 8.82355 1.79849 8.82355 2.23532V7.17649C8.82355 7.61332 8.99708 8.03226 9.30596 8.34114C9.61485 8.65002 10.0338 8.82355 10.4706 8.82355H13.7647Z" />
    </svg>
  );
};
