import { Dropdown, type DropdownMenuItem } from "@/renderers/components/molecules/dropdown/Dropdown";
import { createAnalyticsId } from "@/utils/analytics";
import { first } from "es-toolkit/compat";
import type { FC } from "react";
import { twMerge } from "tailwind-merge";
import { Icon } from "../../../atoms/icons/Icon";

type ActionProps = {
  title: string;
  iconClassname: string;
  actions?: DropdownMenuItem[];
};

export const DataSetCardAction: FC<ActionProps> = ({ actions, title, iconClassname }) => {
  if (!actions) return null;

  if (actions.length > 1) {
    return (
      <Dropdown
        ariaLabel="Workspace Item Dropdown"
        menuItems={actions}
        dataAnalyticsId={`workspace-item__dropdown-${title}`}
        Trigger={<Icon icon="DotsVerticalIcon" className={twMerge(iconClassname)} aria-label="More actions" />}
      />
    );
  }

  const action = first(actions);

  if (!action) return null;
  if (!action.icon) throw new Error(`Action ${action.label} is missing an icon`);

  return (
    <Icon
      icon={action.icon}
      className={twMerge(iconClassname)}
      onClick={(e) => {
        e.stopPropagation();
        action.onClick?.();
      }}
      dataAnalyticsId={`workspace-item__action__${createAnalyticsId(action?.label ?? action.icon)}`}
    />
  );
};
