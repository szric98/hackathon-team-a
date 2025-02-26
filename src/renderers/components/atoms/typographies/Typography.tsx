import type { VariantProps } from "class-variance-authority";
import type { FC, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

import type { WithAnalyticsTagOptional } from "@/types";

import { typographyVariants } from "./config";

export type TypographyVariants = VariantProps<typeof typographyVariants>;

type TypographyVariant<T> = T & {
  color?: Exclude<TypographyVariants["color"], null>;
};

export type TypographyProps = WithAnalyticsTagOptional<
  TypographyVariant<{
    id?: string;
    className?: string;
    onClick?: VoidFunction;
    disabled?: boolean;
  }>
>;

type TypographyComponent = FC<PropsWithChildren<TypographyProps>>;

const Heading1: TypographyComponent = ({ children, color, className, dataAnalyticsId, disabled, ...props }) => {
  const typographyClass = twMerge(
    typographyVariants({ color, variant: "Heading1", className, clickable: !!props.onClick, disabled }),
  );
  return (
    <h1
      aria-level={1}
      className={typographyClass}
      data-analytics-id={dataAnalyticsId}
      data-clickable={!!props.onClick}
      {...props}
    >
      {children}
    </h1>
  );
};

const Heading2: TypographyComponent = ({ children, color, className, dataAnalyticsId, disabled, ...props }) => {
  const typographyClass = twMerge(
    typographyVariants({ color, variant: "Heading2", className, clickable: !!props.onClick, disabled }),
  );
  return (
    <h2
      aria-level={2}
      className={typographyClass}
      data-analytics-id={dataAnalyticsId}
      data-clickable={!!props.onClick}
      {...props}
    >
      {children}
    </h2>
  );
};

const Heading3: TypographyComponent = ({ children, color, className, dataAnalyticsId, disabled, ...props }) => {
  const typographyClass = twMerge(
    typographyVariants({ color, variant: "Heading3", className, clickable: !!props.onClick, disabled }),
  );
  return (
    <h3
      aria-level={3}
      className={typographyClass}
      data-analytics-id={dataAnalyticsId}
      data-clickable={!!props.onClick}
      {...props}
    >
      {children}
    </h3>
  );
};

const Body: TypographyComponent = ({ children, color, className, dataAnalyticsId, disabled, ...props }) => {
  const typographyClass = twMerge(
    typographyVariants({ color, variant: "Body", className, clickable: !!props.onClick, disabled }),
  );
  return (
    <p className={typographyClass} data-analytics-id={dataAnalyticsId} data-clickable={!!props.onClick} {...props}>
      {children}
    </p>
  );
};

const BodyMedium: TypographyComponent = ({ children, color, className, dataAnalyticsId, disabled, ...props }) => {
  const typographyClass = twMerge(
    typographyVariants({ color, variant: "BodyMedium", className, clickable: !!props.onClick, disabled }),
  );
  return (
    <p className={typographyClass} data-analytics-id={dataAnalyticsId} data-clickable={!!props.onClick} {...props}>
      {children}
    </p>
  );
};

const BodyBold: TypographyComponent = ({ children, color, className, dataAnalyticsId, disabled, ...props }) => {
  const typographyClass = twMerge(
    typographyVariants({ color, variant: "BodyBold", className, clickable: !!props.onClick, disabled }),
  );
  return (
    <p className={typographyClass} data-analytics-id={dataAnalyticsId} data-clickable={!!props.onClick} {...props}>
      {children}
    </p>
  );
};

const Caption: TypographyComponent = ({ children, color, className, dataAnalyticsId, disabled, ...props }) => {
  const typographyClass = twMerge(
    typographyVariants({ color, variant: "Caption", className, clickable: !!props.onClick, disabled }),
  );
  return (
    <span className={typographyClass} data-analytics-id={dataAnalyticsId} data-clickable={!!props.onClick} {...props}>
      {children}
    </span>
  );
};

const CaptionMedium: TypographyComponent = ({ children, color, className, dataAnalyticsId, disabled, ...props }) => {
  const typographyClass = twMerge(
    typographyVariants({ color, variant: "CaptionMedium", className, clickable: !!props.onClick, disabled }),
  );
  return (
    <span className={typographyClass} data-analytics-id={dataAnalyticsId} data-clickable={!!props.onClick} {...props}>
      {children}
    </span>
  );
};

const CaptionBold: TypographyComponent = ({ children, color, className, dataAnalyticsId, disabled, ...props }) => {
  const typographyClass = twMerge(
    typographyVariants({ color, variant: "CaptionBold", className, clickable: !!props.onClick, disabled }),
  );
  return (
    <span className={typographyClass} data-analytics-id={dataAnalyticsId} data-clickable={!!props.onClick} {...props}>
      {children}
    </span>
  );
};

const SubCaption: TypographyComponent = ({ children, color, className, dataAnalyticsId, disabled, ...props }) => {
  const typographyClass = twMerge(
    typographyVariants({ color, variant: "SubCaption", className, clickable: !!props.onClick, disabled }),
  );
  return (
    <span className={typographyClass} data-analytics-id={dataAnalyticsId} data-clickable={!!props.onClick} {...props}>
      {children}
    </span>
  );
};

const SubCaptionMedium: TypographyComponent = ({ children, color, className, dataAnalyticsId, disabled, ...props }) => {
  const typographyClass = twMerge(
    typographyVariants({ color, variant: "SubCaptionMedium", className, clickable: !!props.onClick, disabled }),
  );

  return (
    <span className={typographyClass} data-analytics-id={dataAnalyticsId} data-clickable={!!props.onClick} {...props}>
      {children}
    </span>
  );
};

const SubCaptionBold: TypographyComponent = ({ children, color, className, dataAnalyticsId, disabled, ...props }) => {
  const typographyClass = twMerge(
    typographyVariants({ color, variant: "SubCaptionBold", className, clickable: !!props.onClick, disabled }),
  );

  return (
    <span className={typographyClass} data-analytics-id={dataAnalyticsId} data-clickable={!!props.onClick} {...props}>
      {children}
    </span>
  );
};

const Typography = {
  Heading1,
  Heading2,
  Heading3,
  Body,
  BodyMedium,
  BodyBold,
  Caption,
  CaptionMedium,
  CaptionBold,
  SubCaption,
  SubCaptionMedium,
  SubCaptionBold,
};

export { Typography };
