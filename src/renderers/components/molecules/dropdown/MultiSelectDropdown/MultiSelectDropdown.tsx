import { type KeySet, KeySetAll, KeySetNone, KeySetSome } from "@eturino/key-set";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { isEmpty } from "es-toolkit/compat";
import { type FC, useState } from "react";

import { useSearchFilter } from "@/hooks/use-search-filter";
import type { BaseKeyLabel, RenderFn, WithAriaLabel } from "@/types";

import { Typography } from "@/renderers/components/atoms/typographies/Typography";
import { cva } from "class-variance-authority";
import { SearchInput } from "../../inputs/search-input/SearchInput";
import { MultiSelectDropdownMenuItem } from "./MultiSelectDropdownMenuItem";

export type SELECTION_MODE = "INCLUDE" | "EXCLUDE";

export type MultiSelectDropdownProps = WithAriaLabel<{
  children: RenderFn<{
    selectionMode: SELECTION_MODE;
    selectedItems: BaseKeyLabel[];
    handleItemToggle: (item: BaseKeyLabel) => void;
  }>;
  withIncludeExcludeToggle?: boolean;
  items: Map<string, BaseKeyLabel>;
  defaultSelectedList?: Map<string, BaseKeyLabel>;
  onCloseDropdown?: (selectedItemKeySet: KeySet<string>, mode: SELECTION_MODE) => void;
  label?: string;
}>;

export const MultiSelectDropdown: FC<MultiSelectDropdownProps> = ({
  children,
  withIncludeExcludeToggle,
  items,
  defaultSelectedList,
  ariaLabel,
  onCloseDropdown,
  label,
}) => {
  const [selectionMode, setSelectionMode] = useState<SELECTION_MODE>("INCLUDE");
  const [selectedItems, setSelectedItems] = useState<Map<string, BaseKeyLabel>>(defaultSelectedList ?? new Map());
  const [allChecked, setAllChecked] = useState(selectedItems.size === items.size);

  const { applySearchFilterFn, changeSearchTerm } = useSearchFilter<BaseKeyLabel>({
    predicate: (item) => item.label.toLowerCase(),
  });

  const filteredItems = applySearchFilterFn(Array.from(items.values()));

  const handleToggleAll = () => {
    setAllChecked((prevAllChecked) => {
      const newItems = prevAllChecked ? new Map<string, BaseKeyLabel>() : items;
      setSelectedItems(newItems);
      return !prevAllChecked;
    });
  };

  const handleItemToggle = (item: BaseKeyLabel) => {
    setSelectedItems((prev) => {
      const newItems = new Map(prev);

      if (selectedItems.has(item.key)) newItems.delete(item.key);
      else newItems.set(item.key, item);
      setAllChecked(newItems.size === items.size);

      return newItems;
    });
  };

  const handleDropdownClose = () => {
    if (isEmpty(selectedItems)) return onCloseDropdown?.(new KeySetNone<string>(), selectionMode);
    if (selectedItems.size === items.size) return onCloseDropdown?.(new KeySetAll<string>(), selectionMode);
    return onCloseDropdown?.(
      new KeySetSome<string>(Array.from(selectedItems.values()).map((x) => x.key)),
      selectionMode,
    );
  };

  const handleSelectionModeChange = (newMode: SELECTION_MODE) => setSelectionMode(newMode);

  return (
    <DropdownMenu.Root>
      {children({ selectionMode, selectedItems: Array.from(selectedItems.values()), handleItemToggle })}
      <DropdownMenu.Content
        onInteractOutside={handleDropdownClose}
        className="group z-50 flex w-[var(--radix-dropdown-menu-trigger-width)] min-w-72 flex-col rounded-md border border-gray-200 bg-white py-4 pb-2 shadow-sm dark:bg-gray-800"
        align="start"
        sideOffset={4}
        onCloseAutoFocus={(e) => {
          if (e.target instanceof HTMLInputElement && e.target.type === "checkbox") {
            e.preventDefault();
          }
        }}
        aria-label={ariaLabel}
      >
        {label && <Typography.Heading3 className="mb-4 px-4">{label}</Typography.Heading3>}

        {items.size > 5 && <SearchInput onChange={changeSearchTerm} className="mb-3 px-4" />}

        {withIncludeExcludeToggle && (
          <DropdownMenu.RadioGroup className="mb-3 flex w-full gap-3 px-4">
            <DropdownMenu.RadioItem
              className={filterButtonVariants({ active: selectionMode === "INCLUDE" })}
              value="include"
              onClick={(e) => {
                e.preventDefault();
                handleSelectionModeChange("INCLUDE");
              }}
            >
              Include
            </DropdownMenu.RadioItem>
            <DropdownMenu.RadioItem
              className={filterButtonVariants({ active: selectionMode === "EXCLUDE" })}
              value="exclude"
              onClick={(e) => {
                e.preventDefault();
                handleSelectionModeChange("EXCLUDE");
              }}
            >
              Exclude
            </DropdownMenu.RadioItem>
          </DropdownMenu.RadioGroup>
        )}

        <div className="max-h-40 overflow-y-auto">
          <MultiSelectDropdownMenuItem
            onToggle={handleToggleAll}
            item={{ key: "ALL_DATA", label: "All" }}
            selected={allChecked}
          />
          {filteredItems.map((item) => {
            return (
              <MultiSelectDropdownMenuItem
                key={item.key}
                onToggle={handleItemToggle}
                item={item}
                selected={selectedItems.has(item.key)}
              />
            );
          })}
        </div>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

type VariantSettings = {
  active: Record<"true" | "false", string>;
};

const filterButtonVariants = /*tw:*/ cva<VariantSettings>(
  "cursor-pointer rounded-lg border px-2 py-1 font-medium text-sm outline-none",
  {
    variants: {
      active: {
        true: "border-brand-700 bg-brand-50 text-brand-700 dark:bg-brand-900 dark:text-brand-300",
        false: "bg-gray-50 text-gray-800 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400",
      },
    },
  },
);
