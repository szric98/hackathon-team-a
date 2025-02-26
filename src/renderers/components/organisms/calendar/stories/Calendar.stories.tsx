import { dayjsNow } from "@plandek-utils/ts-parse-dayjs";
import type { Meta, StoryFn } from "@storybook/react";
import { useCallback, useState } from "react";

import { DEFAULT_FEATURE_TOGGLE_MAP } from "@plandek/pkg-feature-toggles";

import { FeatureToggleContext } from "@/contexts/FeatureTogglesContext";

import type { Props } from "../Calendar";
import { Calendar } from "../Calendar";

export default {
  title: "inputs/Calendar",
  component: Calendar,
  args: { label: "Start date", size: "large", variant: "daily" },
} as Meta;

const BasicTemplate: StoryFn<Props> = (args) => {
  const [value, setValue] = useState<Date | null>(dayjsNow().toDate());

  const onChange = useCallback((date: Date | null) => {
    setValue(date);
  }, []);

  return (
    <FeatureToggleContext.Provider value={DEFAULT_FEATURE_TOGGLE_MAP}>
      <Calendar {...args} value={value} onChange={onChange} />
    </FeatureToggleContext.Provider>
  );
};

export const CalendarStory = BasicTemplate.bind({});

CalendarStory.storyName = "Calendar Input";
