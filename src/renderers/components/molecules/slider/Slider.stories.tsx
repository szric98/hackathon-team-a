import { STORYBOOK_ICONS } from "@/renderers/const";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Slider, type SliderProps } from "./Slider";

const meta = {
  component: Slider,
  title: "molecules/Slider",
  args: {
    values: { min: 25, max: 75 },
    minValue: 0,
    maxValue: 100,
  },
  argTypes: {
    startIcon: {
      control: "select",
      options: STORYBOOK_ICONS,
    },
    endIcon: {
      control: "select",
      options: STORYBOOK_ICONS,
    },
  },
} satisfies Meta<SliderProps>;

type Story = StoryObj<SliderProps>;

export const SingleSlider: Story = {
  render: ({ values, minValue, maxValue, endIcon, startIcon }) => {
    const [rangeValues, setRangeValues] = useState({ min: values.min });

    return (
      <Slider
        values={rangeValues}
        onValuesChange={setRangeValues}
        minValue={minValue}
        maxValue={maxValue}
        startIcon={startIcon}
        endIcon={endIcon}
      />
    );
  },
};

export const RangeSlider: Story = {
  render: ({ values, minValue, maxValue, endIcon, startIcon }) => {
    const [rangeValues, setRangeValues] = useState(values);

    return (
      <Slider
        values={rangeValues}
        onValuesChange={setRangeValues}
        minValue={minValue}
        maxValue={maxValue}
        startIcon={startIcon}
        endIcon={endIcon}
      />
    );
  },
};

export default meta;
