import type { FC, JSX } from "react";
import { Typography } from "../../atoms/typographies/Typography";

export type GeneralPopoverContentLayoutProps = {
  heading: string;
  content: string | JSX.Element;
};

export const GeneralPopoverContentLayout: FC<GeneralPopoverContentLayoutProps> = ({ heading, content }) => (
  <>
    <div className="rounded-t-lg border-gray-200 border-b bg-gray-100 px-3 py-1.5 dark:border-gray-600 dark:bg-gray-700">
      <Typography.Heading3 className="text-sm">{heading}</Typography.Heading3>
    </div>
    <div className="px-3 py-2">
      {typeof content === "string" ? <Typography.Caption color="secondary">{content}</Typography.Caption> : content}
    </div>
  </>
);
