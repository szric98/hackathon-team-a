import * as RadixSlider from "@radix-ui/react-slider";
import type { FC } from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Icon } from "../../atoms/icons/Icon";
import type { AvailableIcons } from "../../atoms/icons/types";
import { Tooltip } from "../tooltip/Tooltip";

export type SliderProps = {
  values: { min: number; max?: number }; // use only the min if you want a single thumb slider
  onValuesChange: (values: { min: number; max?: number }) => void;
  minValue?: number;
  maxValue?: number;
  startIcon?: AvailableIcons;
  endIcon?: AvailableIcons;
};

const ThumbClasses =
  /*tw:*/ "block size-6 cursor-pointer rounded-full border border-gray-200 bg-white shadow-sm focus:outline-none dark:border-gray-500 dark:bg-gray-600 dark:shadow";

export const Slider: FC<SliderProps> = ({ values, onValuesChange, minValue, maxValue, startIcon, endIcon }) => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  return (
    <div className="relative mt-4 mb-6">
      <div className="flex items-center gap-3">
        {startIcon && <Icon icon={startIcon} className="size-5 fill-gray-500" />}
        <div className="relative w-full">
          <RadixSlider.Root
            className="relative flex h-2 w-full touch-none select-none items-center"
            defaultValue={values.max !== undefined ? [values.min, values.max] : [values.min]}
            min={minValue ?? 0}
            max={maxValue ?? 100}
            step={1}
            minStepsBetweenThumbs={1}
            onValueChange={(newValues) => {
              if (newValues[0] !== undefined) {
                onValuesChange({ min: newValues[0], max: newValues[1] });
              }
            }}
          >
            <RadixSlider.Track className="relative h-2 grow rounded-lg bg-gray-200 dark:bg-gray-600">
              <RadixSlider.Range className="absolute h-2 rounded-lg bg-brand-600 dark:bg-brand-600" />
            </RadixSlider.Track>
            <Tooltip
              forceOpen={isTooltipOpen}
              title={values.min.toString()}
              placement="top"
              offset={10}
              trigger={
                <RadixSlider.Thumb
                  key={uuidv4()}
                  className={ThumbClasses}
                  aria-label="Minimum value thumb"
                  onMouseEnter={() => setIsTooltipOpen(true)}
                  onMouseLeave={() => setIsTooltipOpen(false)}
                />
              }
            />
            {/* This second thumb will only be visible and useable when there is a values.max */}
            <Tooltip
              forceOpen={isTooltipOpen && values.max !== undefined}
              title={values.max?.toString() ?? ""}
              placement="top"
              offset={10}
              trigger={
                <RadixSlider.Thumb
                  key={uuidv4()}
                  className={ThumbClasses}
                  aria-label="Maximum value thumb"
                  onMouseEnter={() => setIsTooltipOpen(true)}
                  onMouseLeave={() => setIsTooltipOpen(false)}
                />
              }
            />
          </RadixSlider.Root>
          <span className="-bottom-6 absolute start-0 text-gray-500 text-sm dark:text-gray-400">{minValue}</span>
          <span className="-bottom-6 absolute end-0 text-gray-500 text-sm dark:text-gray-400">{maxValue}</span>
        </div>
        {endIcon && <Icon icon={endIcon} className="size-5 fill-gray-500" />}
      </div>
    </div>
  );
};
