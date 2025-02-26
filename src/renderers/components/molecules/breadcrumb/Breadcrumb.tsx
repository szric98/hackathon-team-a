import { cva } from "class-variance-authority";
import type { FC } from "react";
import { v4 as uuidv4 } from "uuid";
import { Icon } from "../../atoms/icons/Icon";
import type { AvailableIcons } from "../../atoms/icons/types";
import { Dropdown, type DropdownMenuItem } from "../dropdown/Dropdown";
import { DropdownIconTrigger } from "../dropdown/DropdownIconTrigger";

export type BreadcrumbProps = {
  items: { itemLabel: string; onClick?: VoidFunction; dropdownMenuItems?: DropdownMenuItem[] }[];
  withBackground?: boolean;
  icon?: AvailableIcons;
};

export const Breadcrumb: FC<BreadcrumbProps> = ({ items, withBackground, icon }) => (
  <nav
    className={
      withBackground
        ? "flex w-fit rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-800"
        : "flex"
    }
    aria-label="Breadcrumb"
  >
    <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
      {items.map(({ itemLabel, onClick, dropdownMenuItems }, index) => (
        <li key={uuidv4()} onClick={onClick} className="group inline-flex cursor-pointer items-center">
          {index > 0 && <Icon icon="BreadcrumbArrowIcon" />}
          {index === 0 && icon && (
            <Icon icon={icon} className="mr-1 size-3 fill-gray-500 group-hover:fill-brand-700 dark:fill-gray-400 " />
          )}
          <span className={textVariants({ isLink: !!onClick, isDropdown: !!dropdownMenuItems?.length })}>
            {itemLabel}
          </span>
          {dropdownMenuItems && dropdownMenuItems.length > 1 && (
            <Dropdown
              Trigger={
                <DropdownIconTrigger
                  icon="ChevronSortIcon"
                  dataAnalyticsId="breadcrumb_navigation-dropdown_trigger"
                  size="xs"
                />
              }
              ariaLabel="Breadcrumb navigation dropdown"
              dataAnalyticsId="breadcrumb_navigation-dropdown"
              menuItems={dropdownMenuItems}
            />
          )}
        </li>
      ))}
    </ol>
  </nav>
);

type VariantSettings = {
  isLink: Record<"true" | "false", string>;
  isDropdown: Record<"true" | "false", string>;
};

const textVariants = /*tw:*/ cva<VariantSettings>("ms-1 font-medium text-sm md:ms-2 dark:text-gray-400", {
  variants: {
    isLink: {
      true: "text-gray-700 group-hover:text-brand-700 dark:hover:text-white",
      false: "text-gray-500 hover:text-gray-500 hover:dark:text-gray-400",
    },
    isDropdown: {
      true: "mr-1.5",
      false: "",
    },
  },
});
