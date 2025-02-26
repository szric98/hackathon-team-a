import { debounce, flow } from "es-toolkit";
import { useState } from "react";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
type DebouncedFunc<F extends (...args: unknown[]) => void> = ReturnType<typeof debounce<F>>;

type FilterFn<T> = (list: T[]) => T[];

// Can be extended with additional configs for filters if needed
type FilterConfig = {
  lowerCaseFilter?: boolean;
  removeWhiteSpace?: boolean;
};

const defaultConfig: FilterConfig = {
  lowerCaseFilter: true,
  removeWhiteSpace: true,
};

const valueNotChange = (value: string) => value;

type SearchFilter<T = unknown> = {
  searchTerm: string;
  applySearchFilterFn: FilterFn<T>;
  changeSearchTerm: DebouncedFunc<(...args: unknown[]) => void>;
};

export const useSearchFilter = <T>(props: {
  predicate: (data: T) => string;
  config?: FilterConfig;
  emptyFilterBehaviour?: "ALL" | "NONE";
}): SearchFilter<T> => {
  const { predicate: dataForPredicate, config = defaultConfig, emptyFilterBehaviour = "ALL" } = props;
  const [searchFilter, setSearchFilter] = useState("");

  const handleSearch = (value: string) => setSearchFilter(value);
  const handleSearchDebounce = debounce(handleSearch, 300);

  const removeWhiteSpaceFn = config.removeWhiteSpace ? removeWhiteSpace : valueNotChange;
  const toLowerCaseFn = config.lowerCaseFilter ? toLowerCase : valueNotChange;

  // Transform the searchTerm and the term to be compared base on the config
  const applyFilterConfigFn = flow(removeWhiteSpaceFn, toLowerCaseFn);
  const actualSearchTerm = applyFilterConfigFn(searchFilter);

  const applySearchFilterFn: FilterFn<T> = (list) => {
    if (!actualSearchTerm) {
      return emptyFilterBehaviour === "ALL" ? list : [];
    }

    return list.filter((data) => {
      const transformedData = applyFilterConfigFn(dataForPredicate(data));
      return transformedData.includes(actualSearchTerm);
    });
  };

  return { changeSearchTerm: handleSearchDebounce, applySearchFilterFn, searchTerm: actualSearchTerm };
};

const toLowerCase = (value: string) => value.toLowerCase();
const removeWhiteSpace = (value: string) => value.replace(/\s/g, "");
