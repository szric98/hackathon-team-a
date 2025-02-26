import type { WithAnalyticsTag, WithAriaLabel } from "@/types";
import { type CustomFlowbiteTheme, type DatepickerProps, Datepicker as FlowDateInput } from "flowbite-react";
import type { FC } from "react";

type InputParams = Pick<
  DatepickerProps,
  "color" | "onChange" | "value" | "minDate" | "maxDate" | "label" | "defaultValue" | "disabled"
>;

export type DateInputProps = WithAriaLabel<WithAnalyticsTag<InputParams>>;
export const DateInput: FC<DateInputProps> = (props) => {
  const { color = "default", onChange, value, dataAnalyticsId, ariaLabel, label } = props;

  return (
    <FlowDateInput
      showTodayButton={false}
      label={label}
      color={color}
      onChange={onChange}
      value={value}
      theme={dateInputTheme}
      data-analytics-id={dataAnalyticsId}
      aria-label={ariaLabel}
    />
  );
};

const dateInputTheme: CustomFlowbiteTheme["datepicker"] = /*tw:*/ {
  root: {
    input: {
      field: {
        input: {
          colors: {
            default: `text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400
                    bg-gray-50 dark:bg-gray-700
                      border border-gray-300 dark:border-gray-600 focus:border-gray-500 dark:focus:border-gray-400 placeholder:border-gray-300 dark:placeholder:border-gray-600
                      focus:ring-2 focus:ring-gray-200 focus:dark:ring-gray-500`,
            brand:
              "border-gray-300 bg-gray-50 text-gray-900 focus:border-brand-500 focus:ring-brand-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-brand-500 dark:focus:ring-brand-500",
          },
        },
      },
    },
  },
  popup: {
    header: {
      selectors: {
        button: {
          base: "rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-100 focus:outline-none ring-0 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600",
          prev: "",
          next: "",
          view: "",
        },
      },
    },
    footer: {
      button: {
        base: "w-full rounded-lg px-5 py-2 text-center text-sm font-medium focus:ring-4 focus:ring-brand-300 bg--700 text-white hover:bg-brand-800 dark:bg-brand-600 dark:hover:bg-brand-700",
        clear:
          "border border-gray-300 bg-white text-gray-900 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600",
      },
    },
  },
  views: {
    days: {
      items: {
        item: {
          selected: "bg-gray-600 text-white hover:bg-gray-700 dark:hover:bg-gray-500",
        },
      },
    },
    months: {
      items: {
        item: {
          selected: "bg-gray-600 text-white hover:bg-gray-700 dark:hover:bg-gray-500",
        },
      },
    },
    years: {
      items: {
        item: {
          selected: "bg-gray-600 text-white hover:bg-gray-700 dark:hover:bg-gray-500",
        },
      },
    },
    decades: {
      items: {
        item: {
          selected: "bg-gray-600 text-white hover:bg-gray-700 dark:hover:bg-gray-500",
        },
      },
    },
  },
};
