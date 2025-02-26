import type { WithAnalyticsTagOptional } from "@/types";
import { useCheckForAnalyticsId } from "@/utils/analytics";
import type { FC } from "react";
import type { IconBaseProps } from "react-icons";
import * as Variants from "./index";
import type { AvailableIcons } from "./types";

type IconType = IconBaseProps & WithAnalyticsTagOptional<{ icon: AvailableIcons; className?: string }>;

export const Icon: FC<IconType> = (props) => {
  const { icon, dataAnalyticsId, ...rest } = props;
  useCheckForAnalyticsId(props);

  const IconComponent = Variants[icon];
  return <IconComponent data-analytics-id={dataAnalyticsId} {...rest} />;
};
