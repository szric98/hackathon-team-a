import {
  type Dayjs,
  dayjsNow,
  getGranularityDescription,
  getGranularityOptionsFromRange,
  parseDayjsOrError,
  printRange,
  printStarted,
} from "@plandek-utils/ts-parse-dayjs";
import { capitalize } from "es-toolkit";
import { type FC, useCallback, useEffect, useMemo, useState } from "react";

import type { DataSetFragment, DateRange, Granularity, Maybe, SprintFragment } from "@/__generated__/dashboards-api";
import {
  OrderedPresetDatePeriodList,
  PresetDatePeriodKeys,
  defaultDatePeriodKey,
  orderedGranularityList,
} from "@/constants/date-granularity";
import type { DateRangeDataChangesForDates, DateRangeDataChangesForSprint } from "@/contexts/DateRangeContext";
import type { SprintData } from "@/providers/SprintsListForDataSetProvider";
import type { BaseKeyLabel } from "@/types";
import { cleanAndAdaptDateRange } from "@/utils/date/clean-and-adapt-date-range";
import { cleanDateRange } from "@/utils/date/clean-date-range";
import { getDateRangeFromPreset } from "@/utils/date/date-range";
import { fromLocaleToUTC } from "@/utils/date/from-locale-to-utc";
import { calculateGranularityFromDateRange } from "@/utils/date/granularity";
import { resetGranularity } from "@/utils/date/reset-granularity";
import type { DateRangeStrict, EffectiveDatesData } from "@/utils/date/types";
import { keyLabelFromSprintList } from "@/utils/live-view-epic-sprint-utils";

import { Icon } from "../../atoms/icons/Icon";
import { Skeleton } from "../../atoms/skeleton/Skeleton";
import { Typography } from "../../atoms/typographies/Typography";
import { Button } from "../../molecules/button/Button";
import { SelectButtonInput } from "../../molecules/inputs/select-button-input/SelectButtonInput";
import { SelectInput } from "../../molecules/inputs/select-input/SelectInput";
import { Popover } from "../../molecules/popover/Popover";
import { Calendar } from "../calendar/Calendar";

export type DateRangeSelectorProps = {
  effectiveDatesData: EffectiveDatesData;
  dataSet: DataSetFragment;
  raw: {
    datePeriodKey: PresetDatePeriodKeys;
    granularity: Granularity;
    pastSprintKey: string | null;
    sprintKey: string | null;
    timeQuery: string | null;
  };
  sprintData: SprintData;
  backgroundDateRange: DateRange;
  updateDateRangeDataForDates: (changes: DateRangeDataChangesForDates) => void;
  updateDateRangeDataForSprint: (changes: DateRangeDataChangesForSprint) => void;
};

export const DateRangeSelector: FC<DateRangeSelectorProps> = ({
  effectiveDatesData,
  dataSet,
  raw,
  backgroundDateRange,
  updateDateRangeDataForDates,
  updateDateRangeDataForSprint,
  sprintData,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const activeDatePeriodKey = raw.datePeriodKey;
  const activeGranularity = effectiveDatesData.granularity;
  const activeSprintKey = effectiveDatesData.type === "sprint" ? effectiveDatesData.sprintKey : null;
  const activePastSprintKey = effectiveDatesData.type === "sprint" ? effectiveDatesData.pastSprintKey : null;

  const [presetDateRange, setPresetDateRange] = useState<PresetDatePeriodKeys>(activeDatePeriodKey);
  const [granularity, setGranularity] = useState<Granularity>(activeGranularity);
  const [selectedDateRange, setSelectedDateRange] = useState<DateRange>(backgroundDateRange);
  const [granularityOptions, setGranularityOptions] = useState<Granularity[]>(
    presetDateRange === "Sprint" ? ["day"] : getGranularityOptionsFromRange(backgroundDateRange),
  );
  const [sprintKey, setSprintKey] = useState<string | null>(null);
  const [pastSprintKey, setPastSprintKey] = useState(activePastSprintKey);

  // Add state tracking for changes
  const hasChanges = useMemo(() => {
    if (sprintKey) {
      return (
        sprintKey !== activeSprintKey || pastSprintKey !== activePastSprintKey || granularity !== activeGranularity
      );
    }

    // For date-based selection
    const dateRangeChanged =
      selectedDateRange.from?.valueOf() !== backgroundDateRange.from?.valueOf() ||
      selectedDateRange.to?.valueOf() !== backgroundDateRange.to?.valueOf();

    return dateRangeChanged || presetDateRange !== activeDatePeriodKey || granularity !== activeGranularity;
  }, [
    sprintKey,
    activeSprintKey,
    pastSprintKey,
    activePastSprintKey,
    granularity,
    activeGranularity,
    selectedDateRange,
    backgroundDateRange,
    presetDateRange,
    activeDatePeriodKey,
  ]);

  const buttonData = { effectiveDatesData, dataSet, sprintData };

  const syncStateWithDateRangeContext = useCallback(() => {
    // Restore state from context
    setSelectedDateRange(backgroundDateRange);

    const newGranularityOptionsFromRange = getGranularityOptionsFromRange(backgroundDateRange);

    setGranularityOptions(newGranularityOptionsFromRange);
    setPresetDateRange(activeDatePeriodKey);
    setGranularity(resetGranularity(activeGranularity, newGranularityOptionsFromRange));
    setSprintKey(activeSprintKey);
    setPastSprintKey(activePastSprintKey);
  }, [backgroundDateRange, activeDatePeriodKey, activeGranularity, activeSprintKey, activePastSprintKey]);

  useEffect(() => {
    setSprintKey(activeSprintKey);
  }, [activeSprintKey]);

  useEffect(() => {
    syncStateWithDateRangeContext();
  }, [syncStateWithDateRangeContext]);

  const clearSprintFilter = () => {
    setSprintKey(null);
    setPastSprintKey(null);
  };

  const handleApplyChanges = () => {
    const parsedFromDate = parseDayjsOrError(selectedDateRange.from);
    const parsedToDate = parseDayjsOrError(selectedDateRange.to);

    if (sprintKey) {
      updateDateRangeDataForSprint({
        sprintKey,
        pastSprintKey,
        granularity,
      });
    } else {
      let validDateRange = cleanDateRange({ from: parsedFromDate, to: parsedToDate }, { noFutureDay: true });
      if (!(validDateRange.from && validDateRange.to)) {
        console.info("invalid date range being set / reverting to default");
        validDateRange = getDateRangeFromPreset(defaultDatePeriodKey);
      }

      updateDateRangeDataForDates({
        granularity,
        datePeriodKey: presetDateRange,
        datePeriod: validDateRange,
      });
    }

    setIsModalOpen(false);
  };

  function handleCustomDateChange(range: DateRange) {
    //setPresetOptions(OrderedPresetDatePeriodList); // include 'custom'
    setPresetDateRange(PresetDatePeriodKeys.Custom);
    setSelectedDateRange(range);

    const newGranularityFromRange = getGranularityOptionsFromRange(range);
    setGranularityOptions(newGranularityFromRange);

    // add a default in case the range has not both dates.
    const gran: Granularity =
      range.from && range.to ? calculateGranularityFromDateRange({ from: range.from, to: range.to }) : "week";

    setGranularity(resetGranularity(gran, newGranularityFromRange));
    clearSprintFilter();
  }

  const handleChangeFromDate = (date: Date | null) => {
    const parsedDate = fromLocaleToUTC(date);
    if (!parsedDate) return;

    handleCustomDateChange(
      cleanAndAdaptDateRange({
        from: parsedDate,
        to: selectedDateRange.to ?? dayjsNow(),
      }),
    );
  };

  const handleChangeToDate: (date: Date | null) => void = (date) => {
    const parsedDate = fromLocaleToUTC(date);
    if (!parsedDate) return;

    handleCustomDateChange(
      cleanAndAdaptDateRange({
        from: selectedDateRange.from ?? dayjsNow(),
        to: parsedDate,
      }),
    );
  };

  const handleDatePeriodChange: (item: BaseKeyLabel) => void = (item) => {
    let from: Maybe<Dayjs> | undefined;
    let to: Maybe<Dayjs> | undefined;

    setPresetDateRange(item.key as PresetDatePeriodKeys);

    const dateRange = getDateRangeFromPreset(item.key);
    if (!(dateRange?.from && dateRange?.to)) {
      from = selectedDateRange.from;
      to = selectedDateRange.to;
    } else {
      from = dateRange.from;
      to = dateRange.to;
    }
    setSelectedDateRange(cleanDateRange({ from, to }));

    setGranularityOptions(getGranularityOptionsFromRange({ from, to }));

    setGranularity(from && to ? calculateGranularityFromDateRange({ from, to }) : "week");
    clearSprintFilter();
    return null;
  };

  const handleSetSprintKey = (sprintKey: Maybe<string>) => {
    setSprintKey(sprintKey ?? null);
    setGranularity(sprintKey ? "day" : (calculateGranularityFromDateRange(selectedDateRange) ?? "week"));
  };

  const disableSprint = dataSet.forbiddenEntities.includes("BOARD");
  const presetDateIsSprint = presetDateRange === "Sprint";
  return (
    <Popover
      withArrow={false}
      ariaLabel="date-range-selector"
      dataAnalyticsId="date-range__date-range-selector"
      containerClassName="absolute top-4 left-0 mt-2 w-[42rem] bg-white shadow-lg rounded-lg p-6"
      forceOpen={isModalOpen}
      placement="left"
      onClickAway={(e: Event) => {
        if (
          e.target instanceof HTMLElement &&
          e.target.closest("[data-analytics-id='date-range__date-range-selector-button']")
        ) {
          return;
        }
        setIsModalOpen(false);
      }}
      anchor={
        <Button
          color="alternative"
          dataAnalyticsId="date-range__date-range-selector-button"
          data-testid="date-range__date-range-selector-button"
          ariaExpanded={isModalOpen}
          size="sm"
          onClick={() => setIsModalOpen(!isModalOpen)}
        >
          <Icon icon="CalendarDayIcon" className="mr-2 size-3 fill-current" />
          <RangeSelectorButton buttonData={buttonData} />
        </Button>
      }
      content={
        <div className="relative">
          <Typography.Heading3 className="pb-6">Date range</Typography.Heading3>
          <div className="mb-8">
            <SelectButtonInput
              options={OrderedPresetDatePeriodList}
              value={presetDateRange}
              onChange={(period) => handleDatePeriodChange(period)}
              ariaLabel="choose-a-sprint"
              dataAnalyticsId="date-range__input--preset-range"
              disabled={OrderedPresetDatePeriodList.length === 0}
              getKey={(option) => option.key}
              getLabel={(option) => option.label}
            />
          </div>

          <div className="mb-6 flex flex-col gap-6">
            {presetDateRange === "Custom" && (
              <CustomDateSelector
                presetDateRange={presetDateRange}
                handleDatePeriodChange={handleDatePeriodChange}
                presetOptions={OrderedPresetDatePeriodList}
                selectedDateRange={selectedDateRange}
                handleChangeFromDate={handleChangeFromDate}
                handleChangeToDate={handleChangeToDate}
              />
            )}
            {presetDateIsSprint && (
              <SprintSelector
                availableSprints={sprintData.sprints ?? []}
                sprintKey={sprintKey ?? null}
                setSprintKey={handleSetSprintKey}
                pastSprintKey={pastSprintKey}
                setPastSprintKey={setPastSprintKey}
                disabled={disableSprint}
                sprintLoading={sprintData.loading}
                sprintError={sprintData.error}
              />
            )}
            <SelectButtonInput
              options={orderedGranularityList}
              value={presetDateIsSprint ? "day" : granularity}
              onChange={(item) => {
                setGranularity(item);
                clearSprintFilter();
              }}
              label="Granularity"
              ariaLabel="granularity"
              dataAnalyticsId="date-range__input--granularity"
              disabled={OrderedPresetDatePeriodList.length === 0}
              getLabel={(granularity) => capitalize(getGranularityDescription(granularity))}
              getKey={(granularity) => granularity}
              disableOption={
                presetDateIsSprint
                  ? (granularity) => !["day"].includes(granularity)
                  : (granularity) => !granularityOptions.includes(granularity)
              }
            />
          </div>
          <div className="flex w-full justify-end gap-3">
            <Button
              size="sm"
              color="light"
              data-testid="date-range__cancel-button"
              dataAnalyticsId="date-range__cancel-button"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              dataAnalyticsId="date-range__apply-button"
              disabled={!hasChanges}
              onClick={handleApplyChanges}
            >
              Apply
            </Button>
          </div>
        </div>
      }
    />
  );
};

type RangeSelectorButtonDataProps = {
  effectiveDatesData: EffectiveDatesData;
  dataSet: DataSetFragment;
  sprintData: SprintData;
};

const RangeSelectorButton: FC<{ buttonData: RangeSelectorButtonDataProps }> = ({ buttonData }) => {
  const { effectiveDatesData, sprintData } = buttonData;
  const { granularity } = effectiveDatesData;
  if (effectiveDatesData.type === "dates") {
    const { dateRange } = effectiveDatesData;
    return <RangeSelectorButtonForDate dateRange={dateRange} granularity={granularity} />;
  }
  if (effectiveDatesData.type === "sprint") {
    const { sprintKey } = effectiveDatesData;
    return <RangeSelectorButtonForSprint sprintKey={sprintKey} granularity={granularity} sprintData={sprintData} />;
  }
};

const RangeSelectorButtonForDate: FC<{
  dateRange: DateRangeStrict;
  granularity: Granularity;
}> = ({ dateRange, granularity }) => {
  return `${dateDescription(dateRange)} • ${capitalize(getGranularityDescription(granularity))}`;
};

const RangeSelectorButtonForSprint: FC<{
  sprintKey: string;
  granularity: Granularity;
  sprintData: SprintData;
}> = ({ sprintKey, granularity, sprintData }) => {
  const sprint = sprintData.sprints?.find((s) => s.sprintKey === sprintKey || s.altUris.includes(sprintKey));
  if (!sprint) {
    throw new Error(`sprint ${sprintKey} not valid for the current workspace`);
  }
  return `${sprint.sprintLabel} • ${capitalize(getGranularityDescription(granularity))}`;
};

export const dateDescription = (range: DateRange) => {
  if (range.from && range.to) return printRange({ from: range.from, to: range.to });
  if (range.from && !range.to) return printStarted(range.from);
  return "";
};

const SprintSelector: FC<{
  availableSprints: SprintFragment[];
  sprintKey: string | null;
  setSprintKey: (x: string | null) => void;
  pastSprintKey: string | null;
  setPastSprintKey: (x: string | null) => void;
  disabled?: boolean;
  sprintLoading?: boolean;
  sprintError?: Error;
}> = ({ availableSprints, sprintKey, setSprintKey, pastSprintKey, setPastSprintKey, sprintLoading, sprintError }) => {
  const sprintKeyValue = useMemo(
    () =>
      availableSprints.find(
        (x: { sprintKey: string; altUris: string | string[] }) =>
          x.sprintKey === sprintKey || (sprintKey && x.altUris.includes(sprintKey)),
      ) ?? null,
    [availableSprints, sprintKey],
  );
  const pastSprintKeyValue = useMemo(
    () =>
      availableSprints.find(
        (x) => x.sprintKey === pastSprintKey || (pastSprintKey && x.altUris.includes(pastSprintKey)),
      ) ?? null,
    [availableSprints, pastSprintKey],
  );

  const onFilterBySprintClick = (value: BaseKeyLabel | undefined) => {
    setSprintKey(value?.key ?? null);
    const pastSprint = value && sprintKeyLabelList[sprintKeyLabelList.indexOf(value) + 1];
    setPastSprintKey(pastSprint?.key ?? null);
  };

  const onCompareSprintClick = (value: BaseKeyLabel | undefined) => {
    setPastSprintKey(value?.key ?? null);
  };

  const sprintKeyLabelList = useMemo(() => keyLabelFromSprintList(availableSprints), [availableSprints]);

  const disableFutureSprints = () => {
    return sprintKeyLabelList.filter((option) => {
      if (option.key === "_current_sprint_" || option.key === "_last_sprint_") {
        return false;
      }
      const sprint = availableSprints.find(
        (s: { sprintKey: string; altUris: string | string[] }) =>
          s.sprintKey === option.key || s.altUris.includes(option.key),
      );
      if (!sprint?.dateRange.from) {
        return true;
      }
      return dayjsNow().isSameOrBefore(sprint.dateRange.from);
    });
  };

  const disabledFutureSprintOptions = disableFutureSprints();

  if (sprintError) {
    throw new Error(`sprint ${sprintKey} not valid for the current workspace`);
  }

  return (
    <div>
      <div className="mb-2 flex gap-6">
        {sprintLoading ? (
          <Skeleton className="h-10 rounded-md" />
        ) : (
          <>
            <div className="w-1/2">
              <SelectInput
                label="Choose a sprint"
                valueKey={sprintKeyValue?.sprintKey}
                items={sprintKeyLabelList}
                dataAnalyticsId="date-range-selector__choose-sprint-select"
                dropdownClassName="w-full"
                ariaLabel="sprint-dropdown"
                onSelect={onFilterBySprintClick}
                placeholder="Select a sprint"
              />
            </div>
            <div className="w-1/2">
              <SelectInput
                label="Compare it to"
                valueKey={pastSprintKeyValue?.sprintKey}
                items={sprintKeyLabelList}
                dataAnalyticsId="date-range-selector__compare-sprint-select"
                ariaLabel="date-range-selector__compare-sprint-select"
                dropdownClassName="w-full"
                placeholder="Select a sprint"
                onSelect={onCompareSprintClick}
                disabledItems={disabledFutureSprintOptions}
              />
            </div>
          </>
        )}
      </div>
      <Typography.Caption color="secondary">
        Your metrics will display data for the date range corresponding to the selected sprint.
      </Typography.Caption>
    </div>
  );
};

const CustomDateSelector: FC<{
  presetDateRange: PresetDatePeriodKeys;
  handleDatePeriodChange: (item: BaseKeyLabel) => void;
  presetOptions: BaseKeyLabel[];
  selectedDateRange: DateRange;
  handleChangeFromDate: (date: Date | null) => void;
  handleChangeToDate: (date: Date | null) => void;
}> = ({ selectedDateRange, handleChangeFromDate, handleChangeToDate }) => {
  return (
    <div>
      <Typography.CaptionMedium className="mb-2 block">Choose a date range</Typography.CaptionMedium>
      <div className="flex gap-2">
        <div className="w-1/2">
          <Calendar
            label="From date"
            value={selectedDateRange.from ? selectedDateRange.from.toDate() : null}
            onChange={handleChangeFromDate}
          />
        </div>
        <div className="flex items-center">-</div>
        <div className="w-1/2">
          <Calendar
            label="To date"
            value={selectedDateRange.to ? selectedDateRange.to.startOf("day").toDate() : null}
            onChange={handleChangeToDate}
          />
        </div>
      </div>
    </div>
  );
};
