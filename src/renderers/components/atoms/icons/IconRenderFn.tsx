import type { IconType } from "react-icons";

import { twMerge } from "tailwind-merge";
import { Icon } from "./Icon";
import type { AvailableIcons } from "./types";

export function IconRenderFn(icon: AvailableIcons) {
  const Variant: IconType = ({ className, ...props }) => {
    return <Icon icon={icon} className={twMerge(className)} {...props} />;
  };

  return Variant;
}
