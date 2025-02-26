import type { CustomFlowbiteTheme, TextInputProps as FlowTextInputProps } from "flowbite-react";
import { TextInput as FlowTextInput, Label, theme } from "flowbite-react";
import type { FC } from "react";

type InputParams = Pick<
  FlowTextInputProps,
  | "id"
  | "color"
  | "className"
  | "placeholder"
  | "type"
  | "required"
  | "helperText"
  | "sizing"
  | "icon"
  | "value"
  | "maxLength"
  | "disabled"
> & {
  onChange?: (newValue: string) => void;
  onKeyDown?: (newValue: string) => void;
  onBlur?: (newValue: string) => void;
};

export type TextInputProps = InputParams & {
  label?: string;
};
export const TextInput: FC<TextInputProps> = (props) => {
  const {
    id,
    label,
    color = "default",
    className,
    placeholder,
    type,
    required,
    helperText,
    sizing,
    icon,
    value,
    maxLength,
    disabled,
    onChange,
    onKeyDown,
    onBlur,
  } = props;

  return (
    <div>
      {label && <Label htmlFor={id} value={label} className="mb-2 block" />}
      <FlowTextInput
        id={id}
        color={color}
        className={className}
        placeholder={placeholder}
        type={type}
        required={required}
        helperText={helperText}
        sizing={sizing}
        icon={icon}
        maxLength={maxLength}
        value={value}
        theme={textInputTheme}
        onChange={(event) =>
          maxLength && event.target.value.length > maxLength ? null : onChange?.(event.target.value)
        }
        onKeyDown={(e) => {
          if (e.key === "Enter") onKeyDown?.(e.currentTarget.value);
          // Prevent focus from being lost when this component is used in a dropdown
          e.stopPropagation();
        }}
        onBlur={(e) => onBlur?.(e.currentTarget.value)}
        disabled={disabled}
      />
    </div>
  );
};

export const textInputTheme: CustomFlowbiteTheme["textInput"] = /*tw:*/ {
  field: {
    icon: {
      svg: `${theme.textInput.field.icon.svg} fill-gray-500 dark:fill-gray-400`,
    },
    input: {
      colors: {
        ...theme.textInput.field.input.colors,
        default: `text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400
        bg-gray-50 dark:bg-gray-700
        border border-gray-300 dark:border-gray-600 focus:border-gray-500 dark:focus:border-gray-400 placeholder:border-gray-300 dark:placeholder:border-gray-600
        focus:ring-2 focus:ring-gray-200 focus:dark:ring-gray-500`,
        brand:
          "border-gray-300 bg-gray-50 text-gray-900 focus:border-brand-500 focus:ring-brand-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-brand-500 dark:focus:ring-brand-500",
      },
    },
  },
};
