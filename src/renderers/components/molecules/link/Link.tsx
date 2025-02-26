import type { WithAnalyticsTag } from "@/types";
import type { FC, PropsWithChildren } from "react";

import { Link as ReactLink, type LinkProps as ReactLinkProps } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import type { TypographyVariants } from "../../atoms/typographies/Typography";
import { typographyVariants } from "../../atoms/typographies/config";

type LinkParams = {
  link: ReactLinkProps;
  typography?: TypographyVariants;
};

export type LinkProps = PropsWithChildren<WithAnalyticsTag<LinkParams>>;
export const Link: FC<LinkProps> = ({ link, typography, dataAnalyticsId, children }) => {
  const typographyClass = typographyVariants({ color: "brand", ...typography });

  return (
    <ReactLink {...link} className={twMerge(typographyClass, link.className)} data-analytics-id={dataAnalyticsId}>
      {children}
    </ReactLink>
  );
};
