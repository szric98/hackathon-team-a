import { useSearchFilter } from "@/hooks/use-search-filter";
import type { Meta, StoryObj } from "@storybook/react";
import { SearchInput } from "../../molecules/inputs/search-input/SearchInput";
import { IconRenderFn } from "./IconRenderFn";
import * as Icons from "./index";
import type { AvailableIcons } from "./types";

const meta = {
  title: "atoms/Icons",
} satisfies Meta;

type Story = StoryObj;

export const All: Story = {
  render: () => {
    const iconNames = Object.keys(Icons) as AvailableIcons[];

    const { changeSearchTerm, applySearchFilterFn } = useSearchFilter<AvailableIcons>({
      predicate: (item: AvailableIcons) => item,
    });

    const filteredIconNames = applySearchFilterFn(iconNames);

    return (
      <>
        <div className="mb-12 w-1/4">
          <SearchInput placeholder="Search Icons" onChange={changeSearchTerm} />
        </div>
        <div className="flex flex-wrap gap-4">
          {filteredIconNames.map((iconName) => {
            return (
              <div key={iconName} className="flex flex-col items-center">
                {IconRenderFn(iconName)({
                  className: "fill-black dark:fill-white size-8",
                })}
                <span className="mt-2 text-sm dark:text-white">{iconName}</span>
              </div>
            );
          })}
        </div>
      </>
    );
  },
};

export default meta;
