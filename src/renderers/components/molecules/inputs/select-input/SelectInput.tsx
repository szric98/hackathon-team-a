import type { BaseKeyLabel, WithAnalyticsTag, WithAriaLabel } from "@/types";
import { callInOrder } from "@/utils/fn-utils";
import { type FC, useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Icon } from "../../../atoms/icons/Icon";
import { Typography } from "../../../atoms/typographies/Typography";
import { Dropdown, type DropdownMenuItemWithRequiredLabel } from "../../dropdown/Dropdown";

export type SelectInputProps = WithAriaLabel<
  WithAnalyticsTag<{
    valueKey?: string;
    items: (BaseKeyLabel & { category?: string })[];
    label?: string;
    placeholder: string;
    disabled?: boolean;
    onSelect?: (value?: BaseKeyLabel) => void;
    dropdownClassName?: string;
    inputClassName?: string;
    showCategories?: boolean;
    disabledItems?: (BaseKeyLabel & { category?: string })[];
  }>
>;

export const SelectInput: FC<SelectInputProps> = ({
  valueKey,
  items,
  placeholder,
  ariaLabel,
  label,
  onSelect,
  disabled = false,
  dataAnalyticsId,
  dropdownClassName,
  inputClassName,
  showCategories = false,
  disabledItems,
}) => {
  const previousValueKeyRef = useRef<string | undefined>(undefined);
  const [selectedOption, setSelectedOption] = useState<BaseKeyLabel>();

  useEffect(() => {
    if (previousValueKeyRef.current === valueKey) return;

    previousValueKeyRef.current = valueKey;

    if (valueKey === undefined) {
      setSelectedOption((prevOption) => (prevOption ? undefined : prevOption));
      return;
    }

    const option = items.find((item) => item.key === valueKey);
    if (!option) throw new Error(`Option with key ${valueKey} not found`);

    setSelectedOption(option);
  }, [valueKey, items]);

  const menuItems: DropdownMenuItemWithRequiredLabel[] = [
    {
      key: "UNSELECT_KEY",
      label: placeholder,
      ariaLabel: "Unselect option",
      dataAnalyticsId: "select-input__unselect-option",
      onClick: callInOrder(() => setSelectedOption(undefined), onSelect),
    },
    ...items.map((item) => ({
      key: item.key,
      label: item.label,
      category: item.category,
      ariaLabel: item.label,
      dataAnalyticsId: item.key,
      disabled: disabledItems?.includes(item),
      onClick: () => {
        setSelectedOption(item);
        onSelect?.(item);
      },
    })),
  ];

  return (
    <Dropdown
      ariaLabel={ariaLabel}
      dataAnalyticsId={dataAnalyticsId}
      menuWidth="trigger"
      className={twMerge("group", dropdownClassName)}
      menuItems={menuItems}
      showCategories={showCategories}
      closeOnClick
      disabled={disabled}
      Trigger={
        <div
          className={twMerge(
            `flex min-w-40 select-none flex-col gap-2 ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`,
            inputClassName,
          )}
        >
          {label && <Typography.CaptionMedium className="text-left">{label}</Typography.CaptionMedium>}
          <div className="flex items-center justify-between gap-4 rounded-lg border border-gray-300 bg-gray-50 p-2.5 group-data-[state=open]:border-gray-500 group-data-[state=open]:ring-2 group-data-[state=open]:ring-gray-200">
            <Typography.Caption
              className="truncate"
              color={selectedOption?.label && selectedOption.label !== placeholder ? "primary" : "disabled"}
            >
              {selectedOption?.label ?? placeholder}
            </Typography.Caption>
            <Icon
              icon="ChevronDownIcon"
              className="size-3 fill-gray-500 duration-200 group-data-[state=open]:rotate-180"
            />
          </div>
        </div>
      }
    />
  );
};
