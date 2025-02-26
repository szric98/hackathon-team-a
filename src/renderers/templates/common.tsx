import type { FC, PropsWithChildren } from "react";
import { type ClassNameValue, twMerge } from "tailwind-merge";

type CommonLayoutProps = PropsWithChildren<{ className?: ClassNameValue }>;

export const CenteredContent: FC<CommonLayoutProps> = ({ children, className }) => {
  return <div className={twMerge("grid flex-1 items-center justify-center overflow-auto", className)}>{children}</div>;
};

export const MainLayout: FC<CommonLayoutProps> = ({ children, className }) => {
  return <main className={twMerge("flex h-screen w-full overflow-auto", className)}>{children}</main>;
};

export const ContentLayout: FC<CommonLayoutProps & { autoMaxWidth?: boolean }> = (props) => {
  const { children, autoMaxWidth } = props;
  return (
    <div className="h-full w-full overflow-auto">
      <div className={`m-auto flex flex-col gap-6 p-6 ${autoMaxWidth ? "max-w-auto" : "max-w-screen-2xl"}`}>
        {children}
      </div>
    </div>
  );
};
