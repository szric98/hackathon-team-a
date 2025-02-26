import type { Meta, StoryObj } from "@storybook/react";

import { useState } from "react";
import { Typography } from "../../atoms/typographies/Typography";
import { Checkbox } from "../checkbox/Checkbox";
import { SelectInput } from "../inputs/select-input/SelectInput";
import { Accordion, type AccordionProps } from "./Accordion";

const meta = {
  component: Accordion,
  title: "molecules/Accordion",
} satisfies Meta<AccordionProps>;

type Story = StoryObj<AccordionProps>;

const FilterExample = () => {
  const [checked, setChecked] = useState(false);
  return (
    <div>
      <Checkbox
        id="id"
        text={{ value: "Use example filter" }}
        checked={checked}
        onCheckedChange={(newChecked) => setChecked(newChecked)}
      />
      <SelectInput
        label="Example filter"
        dataAnalyticsId="select-input"
        ariaLabel="Select input"
        placeholder="Filter"
        items={[
          { label: "Option 1", key: "option1" },
          { label: "Option 2", key: "option2" },
          { label: "Option 3", key: "option3" },
        ]}
      />
    </div>
  );
};

export const Base: Story = {
  render: () => {
    return (
      <Accordion
        items={[
          { icon: "HelpIcon", title: "Title 1", content: <FilterExample /> },
          { icon: "HelpIcon", title: "Title 2", content: <Typography.Body>Content 2</Typography.Body> },
          { icon: "HelpIcon", title: "Title 3", content: <Typography.Body>Content 3</Typography.Body> },
        ]}
      />
    );
  },
};

export default meta;
