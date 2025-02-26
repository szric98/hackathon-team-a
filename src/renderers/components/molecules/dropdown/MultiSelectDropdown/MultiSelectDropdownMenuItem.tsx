import { Checkbox } from "@/renderers/components/molecules/checkbox/Checkbox";
import type { BaseKeyLabel } from "@/types";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import type { FC } from "react";

type MultiSelectDropdownMenuItemProps = {
  item: BaseKeyLabel;
  selected: boolean;
  onToggle: (item: BaseKeyLabel) => void;
};

export const MultiSelectDropdownMenuItem: FC<MultiSelectDropdownMenuItemProps> = (props) => {
  const { item, onToggle, selected } = props;

  const handleToggle = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onToggle(item);
  };

  return (
    <DropdownMenu.Item
      key={item.key}
      onClick={handleToggle}
      className="flex cursor-pointer items-center gap-2 rounded px-4 py-2 outline-none hover:bg-gray-100 dark:hover:bg-gray-600"
      data-analytics-id={`multi-select-item__${item.key}`}
      aria-label={`Multi select dropdown item ${item.label}`}
    >
      <Checkbox
        id={item.key}
        checked={selected}
        text={{ value: item.label, variant: "Caption", color: "gray" }}
        data-analytics-id="element-input__checkbox"
      />
    </DropdownMenu.Item>
  );
};
