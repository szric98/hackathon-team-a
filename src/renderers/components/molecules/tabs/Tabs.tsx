import * as RadixTabs from "@radix-ui/react-tabs";
import type { TabsTriggerProps } from "@radix-ui/react-tabs";
import { cva } from "class-variance-authority";
import { get } from "es-toolkit/compat";
import { useCallback, useEffect, useRef, useState } from "react";
import type { JSX } from "react/jsx-runtime";
import { v4 } from "uuid";

import { Typography } from "@/renderers/components/atoms/typographies/Typography";
import { Dropdown, type DropdownMenuItem } from "@/renderers/components/molecules/dropdown/Dropdown";
import { DropdownIconTrigger } from "@/renderers/components/molecules/dropdown/DropdownIconTrigger";
import type { WithAnalyticsTag, WithAriaLabel } from "@/types";

import { Icon } from "../../atoms/icons/Icon";
import type { AvailableIcons } from "../../atoms/icons/types";

type TabItem<T> = WithAnalyticsTag<{
  icon?: AvailableIcons;
  value: T;
  label: string;
  disabled?: boolean;
  children?: JSX.Element;
  menuItems?: DropdownMenuItem[];
}>;

export const VARIANT_VALUES = ["underline", "pill"] as const;
export type TabVariant = (typeof VARIANT_VALUES)[number];

export type TabsProps<T extends object = object> = WithAriaLabel<{
  variant?: TabVariant;
  onChange?: (value: T) => void;
  active?: T;
  tabs: Array<TabItem<T>>;
}>;

export const Tabs = <T extends object = object>({ tabs, onChange, active, variant = "underline" }: TabsProps<T>) => {
  const stringValue = JSON.stringify(active);
  const defaultValue = JSON.stringify(tabs[0]?.value);

  const listRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(true);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollButtons = useCallback(() => {
    if (!listRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = listRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
  }, []);

  useEffect(() => {
    if (!listRef.current) return;

    updateScrollButtons();
    listRef.current.addEventListener("scroll", updateScrollButtons);
    return () => listRef.current?.removeEventListener("scroll", updateScrollButtons);
  }, [updateScrollButtons]);

  const scrollList = (direction: "left" | "right") => {
    if (!listRef.current) return;
    const scrollAmount = direction === "left" ? -500 : 500;
    listRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <RadixTabs.Root
      value={stringValue}
      defaultValue={defaultValue}
      onValueChange={(value) => onChange?.(JSON.parse(value))}
    >
      <div className="relative flex items-center">
        {canScrollLeft && (
          <div
            className="absolute top-0 left-0 h-full w-16"
            style={{
              background: "linear-gradient(90deg, rgba(255, 255, 255, 1) 20%, rgba(255, 255, 255, 0) 100%)",
            }}
          >
            <Icon
              onClick={() => scrollList("left")}
              icon="ChevronLeftIcon"
              className="absolute top-[15%] size-3 cursor-pointer fill-gray-800"
              dataAnalyticsId="tabs-scroll-left"
            />
          </div>
        )}
        <RadixTabs.List ref={listRef} className="flex overflow-hidden">
          {tabs.map((tab) => (
            <RadixTabs.Trigger key={v4()} disabled={tab.disabled} value={JSON.stringify(tab.value)} asChild>
              <TabTrigger<T> {...tab} value={JSON.stringify(tab.value)} variant={variant} item={tab} />
            </RadixTabs.Trigger>
          ))}
        </RadixTabs.List>
        {canScrollRight && (
          <div
            className="absolute top-0 right-0 h-full w-16"
            style={{
              background: "linear-gradient(270deg, rgba(255, 255, 255, 1) 20%, rgba(255, 255, 255, 0) 100%)",
            }}
          >
            <Icon
              onClick={() => scrollList("right")}
              icon="ChevronRightIcon"
              className="absolute top-[15%] right-0 size-3 cursor-pointer fill-gray-800"
              dataAnalyticsId="tabs-scroll-right"
            />
          </div>
        )}
      </div>
      {tabs.map((tab) => (
        <RadixTabs.Content key={v4()} value={JSON.stringify(tab.value)}>
          {tab.children}
        </RadixTabs.Content>
      ))}
    </RadixTabs.Root>
  );
};

type TabTriggerProps<T> = TabsTriggerProps & {
  item: TabItem<T>;
  variant: TabVariant;
} & React.RefAttributes<HTMLButtonElement>;
const TabTrigger = <T extends object>({ ref, item, variant, ...props }: TabTriggerProps<T>) => {
  const { label, menuItems, icon } = item;

  const dataState = get(props, "data-state");

  const tabButtonClassName = tabButtonVariant({ variant });
  const iconClassName = tabIconVariant({ variant });
  const tabTextClassName = tabLabelVariant({ variant });

  return (
    <button
      ref={ref}
      type="button"
      role={props.role}
      onClick={props.onMouseDown}
      data-state={dataState}
      className={tabButtonClassName}
    >
      <div className="flex items-center">
        {icon && <Icon data-state={dataState} icon={icon} className={iconClassName} />}

        <Typography.CaptionMedium data-state={dataState} className={tabTextClassName}>
          {label}
        </Typography.CaptionMedium>
      </div>

      {menuItems && (
        <Dropdown
          ariaLabel={`${label} tab dropdown`}
          menuItems={menuItems}
          dataAnalyticsId={`tab-item__dropdown-${label}`}
          Trigger={<DropdownIconTrigger dataAnalyticsId={`tab-menu__${label}`} icon="ChevronDownIcon" size="xs" />}
        />
      )}
    </button>
  );
};

type VariantSettings = {
  variant: Record<TabVariant, string>;
};

export const tabIconVariant = cva<VariantSettings>("mr-2 size-3.5", {
  variants: {
    variant: {
      pill: "fill-gray-500 data-[state=active]:fill-white",
      underline: "fill-gray-500 data-[state=active]:fill-brand-700",
    },
  },
});

export const tabLabelVariant = cva<VariantSettings>("mr-2", {
  variants: {
    variant: {
      pill: "text-gray-500 data-[state=active]:text-white",
      underline:
        "text-gray-500 data-[state=active]:text-brand-700 dark:text-gray-500 data-[state=active]:dark:text-brand-700",
    },
  },
});

export const tabButtonVariant = cva<VariantSettings>(
  "flex items-center whitespace-nowrap border-transparent border-b-2 pb-2",
  {
    variants: {
      variant: {
        pill: "mr-8 rounded-lg bg-gray-100 px-5 py-2.5 data-[state=active]:bg-gray-600",
        underline:
          "mr-8 inline-block rounded-t-lg px-2 data-[state=active]:border-brand-700 data-[state=active]:dark:border-brand-700",
      },
    },
  },
);
