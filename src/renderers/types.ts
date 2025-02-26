import type { ReactElement } from "react";

export type BaseKeyLabel<T extends string = string> = { key: T; label: string };

export type RenderFn<TData> = (x: TData) => ReactElement<unknown> | null;

export type WithAnalyticsTag<T> = T & {
  dataAnalyticsId: string; // Use ${location-name}__${section-name}__${element-name} pattern
};

export type WithAriaLabel<T> = T & {
  ariaLabel: string;
};

export type WithAnalyticsTagOptional<T> = T & {
  dataAnalyticsId?: string | null; // Use ${location-name}__${section-name}__${element-name} pattern
};
