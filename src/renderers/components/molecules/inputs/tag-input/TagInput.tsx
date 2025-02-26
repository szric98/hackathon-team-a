import { Icon } from "@/renderers/components/atoms/icons/Icon";
import { Typography } from "@/renderers/components/atoms/typographies/Typography";
import type { BaseKeyLabel, WithAnalyticsTag, WithAriaLabel } from "@/types";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Label } from "flowbite-react";
import { type FC, useCallback, useEffect, useRef, useState } from "react";
import { Badge } from "../../badge/Badge";
import { MultiSelectDropdown } from "../../dropdown/MultiSelectDropdown/MultiSelectDropdown";

type TagInputParams = {
  tags: Map<string, BaseKeyLabel>;
  withIncludeExclude?: boolean;
  label?: string;
  placeholder: string;
};
export type TagInputProps = WithAnalyticsTag<WithAriaLabel<TagInputParams>>;

export const TagInput: FC<TagInputProps> = ({
  label,
  tags,
  dataAnalyticsId,
  ariaLabel,
  withIncludeExclude,
  placeholder,
}) => {
  const childRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  const updateHeight = useCallback(() => {
    if (childRef.current) {
      setHeight(childRef.current.offsetHeight);
    }
  }, []);

  useEffect(() => {
    updateHeight();

    const resizeObserver = new ResizeObserver(updateHeight);
    if (childRef.current) {
      resizeObserver.observe(childRef.current);
    }

    window.addEventListener("resize", updateHeight);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateHeight);
    };
  }, [updateHeight]);

  return (
    <MultiSelectDropdown ariaLabel={ariaLabel} withIncludeExcludeToggle={withIncludeExclude} items={tags}>
      {({ selectionMode, selectedItems, handleItemToggle }) => (
        <div>
          {label && (
            <div className="mb-2 flex items-center justify-between ">
              <Label className="block text-left" value={label} />
              {selectionMode === "EXCLUDE" && <Typography.Caption color="secondary">(Excluding)</Typography.Caption>}
            </div>
          )}
          <div className="relative">
            <DropdownMenu.Trigger
              className="group flex min-h-11 w-full cursor-pointer items-center justify-end gap-2 rounded-lg border border-gray-300 bg-gray-50 p-2.5 placeholder-gray-500 outline-none transition-all placeholder:border-gray-300 disabled:cursor-not-allowed disabled:opacity-50 data-[state=open]:border-gray-500 data-[state=open]:ring-2 data-[state=open]:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:placeholder-gray-400 dark:placeholder:border-gray-600"
              data-analytics-id={dataAnalyticsId}
              style={{ height: height + 24 }}
              aria-label={ariaLabel}
            >
              {selectedItems.length === 0 && (
                <Typography.Caption color="disabled" className="mr-auto">
                  {placeholder}
                </Typography.Caption>
              )}

              <Icon
                icon="ChevronDownIcon"
                className="size-3 fill-gray-500 duration-200 group-data-[state=open]:rotate-180"
              />
            </DropdownMenu.Trigger>

            <div
              ref={childRef}
              className="-translate-y-1/2 pointer-events-none absolute top-1/2 left-2 flex transform flex-wrap gap-2"
            >
              {selectedItems.map((tag) => (
                <Badge
                  color="gray"
                  key={tag.key}
                  label={tag.label}
                  className="pointer-events-auto"
                  action={{
                    dataAnalyticsId: "tag-input__remove-tag",
                    onClick: () => handleItemToggle(tag),
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </MultiSelectDropdown>
  );
};
