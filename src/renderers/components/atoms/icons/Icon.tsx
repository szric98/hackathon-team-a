import type { FC } from "react";
import type { IconBaseProps } from "react-icons";
import * as Variants from "./index";
import type { AvailableIcons } from "./types";

type IconType = IconBaseProps & { icon: AvailableIcons; className?: string };

export const Icon: FC<IconType> = (props) => {
  const { icon, ...rest } = props;

  const IconComponent = Variants[icon];
  return <IconComponent  {...rest} />;
};
