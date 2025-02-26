import type { CustomFlowbiteTheme, TextareaProps } from "flowbite-react";
import { Label, Textarea, theme } from "flowbite-react";
import type { FC } from "react";

export type InputParams = Pick<
  TextareaProps,
  "id" | "color" | "className" | "placeholder" | "required" | "helperText" | "value" | "rows" | "maxLength" | "disabled"
> & { onChange: (newValue: string) => void };

export type AreaInputProps = {
  input: InputParams;
  label?: string;
};
export const AreaInput: FC<AreaInputProps> = ({ input, label }) => {
  const {
    id,
    color = "default",
    className,
    placeholder,
    required,
    helperText,
    value,
    rows,
    maxLength,
    disabled,
    onChange,
  } = input;

  return (
    <div>
      {label && <Label htmlFor={input.id} value={label} className="mb-2 block" />}
      <Textarea
        id={id}
        color={color}
        className={className}
        placeholder={placeholder}
        required={required}
        helperText={helperText}
        value={value}
        maxLength={maxLength}
        rows={rows}
        theme={textareaTheme}
        onChange={(event) => (maxLength && event.target.value.length > maxLength ? null : onChange(event.target.value))}
        disabled={disabled}
      />
    </div>
  );
};

export const textareaTheme: CustomFlowbiteTheme["textarea"] = /*tw:*/ {
  colors: {
    ...theme.textarea.colors,
    default: `text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400
        bg-gray-50 dark:bg-gray-700
        border border-gray-200 dark:border-gray-600 focus:border-gray-500 dark:focus:border-gray-400 placeholder:border-gray-200 dark:placeholder:border-gray-600
        focus:ring-2 focus:ring-gray-200 focus:dark:ring-gray-500`,
    brand:
      "border-gray-200 bg-gray-50 text-gray-900 focus:border-brand-500 focus:ring-brand-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-brand-500 dark:focus:ring-brand-500",
  },
};
