import type { Meta, StoryObj } from "@storybook/react";
import dayjs from "dayjs";

import type { DataSetFragment, Granularity } from "@/__generated__/dashboards-api";
import { dataSetPlandekAsFragment } from "@/__tests__/fake-data";
import { PresetDatePeriodKeys } from "@/constants/date-granularity";
import type { EffectiveDatesData } from "@/utils/date/types";

import { DateRangeSelector, type DateRangeSelectorProps } from "./DateRangeSelector";

const meta = {
  component: DateRangeSelector,
  title: "organisms/ComplexCard/DateRangeSelector",
} satisfies Meta<DateRangeSelectorProps>;

type Story = StoryObj<DateRangeSelectorProps>;

const mockDataSet1: DataSetFragment = {
  ...dataSetPlandekAsFragment,
  dataSetKey: "ds-1",
  label: "mock dataset 1",
};

const mockEffectiveDatesDataForDate: EffectiveDatesData = {
  type: "dates",
  dateRange: {
    from: dayjs("2023-01-01"),
    to: dayjs("2023-12-31"),
  },
  granularity: "month" as Granularity,
};

const mockRaw = {
  datePeriodKey: PresetDatePeriodKeys.Custom,
  granularity: "month" as Granularity,
  pastSprintKey: null,
  sprintKey: null,
  timeQuery: null,
};

const mockBackgroundDateRange = {
  from: dayjs("2023-01-01"),
  to: dayjs("2023-12-31"),
};

const mockUpdateDateRangeDataForDates = (changes: Partial<EffectiveDatesData>) => {
  console.info("Updated Date Range Data for Dates:", changes);
};

const mockUpdateDateRangeDataForSprint = (changes: Partial<EffectiveDatesData>) => {
  console.info("Updated Date Range Data for Sprint:", changes);
};

export const Main: Story = {
  args: {
    effectiveDatesData: mockEffectiveDatesDataForDate,
    dataSet: mockDataSet1,
    raw: mockRaw,
    backgroundDateRange: mockBackgroundDateRange,
    updateDateRangeDataForDates: mockUpdateDateRangeDataForDates,
    updateDateRangeDataForSprint: mockUpdateDateRangeDataForSprint,
    sprintData: { sprints: [], loading: false, error: undefined },
  },
  decorators: [],
  render: (props) => {
    return <DateRangeSelector {...props} />;
  },
};

export default meta;
