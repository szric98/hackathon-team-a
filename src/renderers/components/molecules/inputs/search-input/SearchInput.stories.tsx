import { useSearchFilter } from "@/hooks/use-search-filter";
import type { BaseKeyLabel } from "@/types";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import { theme } from "flowbite-react";
import { SearchInput, type SearchInputProps } from "./SearchInput";

const meta = {
  component: SearchInput,
  title: "molecules/Inputs/SearchInput",
} satisfies Meta<SearchInputProps>;

type Story = StoryObj<SearchInputProps>;

const data: BaseKeyLabel[] = [
  { key: "1", label: "mike superset" },
  { key: "2", label: "Norbert test" },
  { key: "3", label: "BLAH" },
  { key: "4", label: "test loading" },
  { key: "5", label: "colins test entry" },
  { key: "6", label: "yet another workspace" },
  { key: "7", label: "old mcdonald" },
];

export const Main: Story = {
  args: {
    placeholder: "Search for something",
    sizing: "md",
  },
  argTypes: {
    sizing: {
      control: "select",
      options: Object.keys(theme.textInput.field.input.sizes),
    },
  },
  render: ({ placeholder, sizing, value }) => {
    const { applySearchFilterFn, changeSearchTerm } = useSearchFilter<BaseKeyLabel>({
      predicate: (item) => item.label,
    });

    const filteredData = applySearchFilterFn(data);

    return (
      <>
        <SearchInput placeholder={placeholder} sizing={sizing} value={value} onChange={changeSearchTerm} />
        <div data-testid="items">
          {filteredData.map((item) => (
            <div key={item.key}>{item.label}</div>
          ))}
        </div>
      </>
    );
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const input = canvas.getByPlaceholderText("Search for something");
    await userEvent.type(input, "test");

    expect(input).toHaveValue("test");

    const filteredItems = canvas.getAllByText(/test/i);
    expect(filteredItems.length).toBeGreaterThan(0);

    await userEvent.clear(input);
    expect(input).toHaveValue("");

    const allItems = canvas.getByTestId("items").querySelectorAll("div");
    expect(allItems.length).toBe(data.length);
  },
};

export default meta;
