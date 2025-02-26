import { debounce } from "es-toolkit";
import { type FC, useMemo, useState } from "react";
import { IconRenderFn } from "../../../atoms/icons/IconRenderFn";
import { TextInput, type TextInputProps } from "../text-input/TextInput";

export type SearchInputProps = Pick<
  TextInputProps,
  "className" | "placeholder" | "value" | "sizing" | "onChange" | "onKeyDown" | "onBlur"
> & {
  timeout?: number;
};
export const SearchInput: FC<SearchInputProps> = (props) => {
  const { className, onChange, onKeyDown, onBlur, timeout, placeholder = "Search", value, sizing } = props;
  const [textValue, setTextValue] = useState(value);

  const onChangeFn = useMemo(() => (timeout && onChange ? debounce(onChange, timeout) : onChange), [onChange, timeout]);

  const handleChange = (value: string) => {
    setTextValue(value);
    onChangeFn?.(value);
  };

  return (
    <TextInput
      icon={IconRenderFn("SearchIcon")}
      className={className}
      onChange={handleChange}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      value={textValue}
      sizing={sizing}
    />
  );
};
