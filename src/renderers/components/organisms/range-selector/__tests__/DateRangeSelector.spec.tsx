import { asISODateStringOrError, parseDayjsOrError } from "@plandek-utils/ts-parse-dayjs";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import type { Granularity } from "@/__generated__/dashboards-api";
import { dataSetPlandekAsFragment } from "@/__tests__/fake-data";
import type { PresetDatePeriodKeys } from "@/constants/date-granularity";
import type { SprintData } from "@/providers/SprintsListForDataSetProvider";
import type { EffectiveDatesData } from "@/utils/date/types";

import { DateRangeSelector } from "../DateRangeSelector";

const mockEffectiveDatesData: EffectiveDatesData = {
  type: "dates",
  granularity: "week",
  dateRange: {
    from: parseDayjsOrError("2023-01-01"),
    to: parseDayjsOrError("2023-01-07"),
  },
};

const mockSprintData: SprintData = {
  sprints: [
    {
      id: "1",
      clientKey: "plandek",
      sprintKey: "sprint-1",
      sprintLabel: "Sprint 1",
      altUris: [],
      dateRange: { from: asISODateStringOrError("2023-01-01"), to: asISODateStringOrError("2023-01-07") },
    },
    {
      id: "2",
      clientKey: "plandek",
      sprintKey: "sprint-2",
      sprintLabel: "Sprint 2",
      altUris: [],
      dateRange: { from: asISODateStringOrError("2023-02-01"), to: asISODateStringOrError("2023-02-07") },
    },
  ],
  loading: false,
  error: undefined,
};

const mockRaw = {
  datePeriodKey: "4w" as PresetDatePeriodKeys,
  granularity: "week" as Granularity,
  pastSprintKey: null,
  sprintKey: null,
  timeQuery: null,
};

const mockBackgroundDateRange = {
  from: parseDayjsOrError("2023-01-01"),
  to: parseDayjsOrError("2023-01-07"),
};

const mockUpdateDateRangeDataForDates = vi.fn();
const mockUpdateDateRangeDataForSprint = vi.fn();

function renderDateRangeSelector() {
  return render(
    <DateRangeSelector
      effectiveDatesData={mockEffectiveDatesData}
      dataSet={dataSetPlandekAsFragment}
      raw={mockRaw}
      sprintData={mockSprintData}
      backgroundDateRange={mockBackgroundDateRange}
      updateDateRangeDataForDates={mockUpdateDateRangeDataForDates}
      updateDateRangeDataForSprint={mockUpdateDateRangeDataForSprint}
    />,
  );
}

describe("DateRangeSelector component", () => {
  test("renders the date range selector button", () => {
    const { container } = renderDateRangeSelector();
    const button = container.querySelector(`[data-analytics-id="date-range__date-range-selector-button"]`);
    expect(button).toBeInTheDocument();
  });

  test("opens the modal when the button is clicked", () => {
    const { container } = renderDateRangeSelector();
    const button = container.querySelector(`[data-analytics-id="date-range__date-range-selector-button"]`);
    if (button) {
      fireEvent.click(button);
    }
    const modal = screen.getByText("Date range");
    expect(modal).toBeVisible();
    const cancelButton = container.querySelector(`[data-analytics-id="date-range-selector__cancel-button"]`);
    if (cancelButton) {
      fireEvent.click(cancelButton);
    }
  });

  test("displays the correct date range in the button", () => {
    const { container } = renderDateRangeSelector();
    const button = container.querySelector(`[data-analytics-id="date-range__date-range-selector-button"]`);
    expect(button).toHaveTextContent("1st Jan 2023 - 7th Jan 2023 • Weekly");
  });

  test("displays the correct tabs in the modal", () => {
    const { container } = renderDateRangeSelector();
    const button = container.querySelector(`[data-analytics-id="date-range__date-range-selector-button"]`);
    if (button) {
      fireEvent.click(button);
    }
    const customTab = screen.getByText("Custom");
    const sprintTab = screen.getByText("By sprint");
    expect(customTab).toBeVisible();
    expect(sprintTab).toBeVisible();
    const cancelButton = container.querySelector(`[data-analytics-id="date-range__cancel-button"]`);
    if (cancelButton) {
      fireEvent.click(cancelButton);
    }
  });

  test("displays the correct inputs in the sprint tab", () => {
    const { container } = renderDateRangeSelector();
    const button = container.querySelector(`[data-analytics-id="date-range__date-range-selector-button"]`);
    if (button) {
      fireEvent.click(button);
    }
    const sprintTab = screen.getByText("By sprint");
    fireEvent.click(sprintTab);
    const sprintDropdown = screen.getByText("Choose a sprint");
    const compareSprintDropdown = screen.getByText("Compare it to");
    expect(sprintDropdown).toBeVisible();
    expect(compareSprintDropdown).toBeVisible();
    const cancelButton = container.querySelector(`[data-analytics-id="date-range-selector__cancel-button"]`);
    if (cancelButton) {
      fireEvent.click(cancelButton);
    }
  });
});
