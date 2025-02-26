import { WithTooltip } from "@/renderers/components/molecules/tooltip/WithTooltip";
import { createAnalyticsId } from "@/utils/analytics";
import { cva } from "class-variance-authority";
import { type FC, forwardRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Card } from "../../../atoms/card/Card";
import { Typography } from "../../../atoms/typographies/Typography";
import type { DropdownMenuItem } from "../../../molecules/dropdown/Dropdown";
import { IconShape } from "../../../molecules/icon-shape/IconShape";
import { DataSetCardAction } from "./DataSetCardAction";

export const DATA_SET_CARD_SIZES = ["sm", "md"] as const;
type DataSetCardSize = (typeof DATA_SET_CARD_SIZES)[number];

export const DATA_SET_CARD_VARIANTS = ["default", "organization", "favorite", "no-favorite"] as const;
type DataSetCardVariant = (typeof DATA_SET_CARD_VARIANTS)[number];

export type DataSetCardProps = {
  title: string;
  variant?: DataSetCardVariant;
  actions?: DropdownMenuItem[];
  onClick?: VoidFunction;
  dataTestId?: string;
};

export const DataSetCard: FC<DataSetCardProps> = ({ title, actions, variant = "default", onClick, dataTestId }) => {
  const size = sizeVariant(variant);

  const cardClassname = cardVariant({ size });
  const cardContentClassname = cardContentVariant({ size });
  const iconClassname = secondaryIconVariant({ size });

  const PrimaryIcon = primaryIconVariant(variant);
  const labelText = labelTextVariant(variant);

  const [onHover, setOnHover] = useState(false);
  const defaultDataId = createAnalyticsId(`workspace-card__${title}`);

  return (
    <Card
      onMouseEnter={() => setOnHover(true)}
      onMouseLeave={() => setOnHover(false)}
      size={variant === "default" ? "sm" : "md"}
      className={twMerge(cardClassname)}
      dataAnalyticsId={defaultDataId}
      dataTestId={dataTestId ?? defaultDataId}
      onClick={onClick}
    >
      <div className={twMerge(cardContentClassname)}>
        {PrimaryIcon}
        <div className="flex min-w-0 flex-1 flex-col">
          {labelText && <Typography.CaptionMedium color="disabled">{labelText}</Typography.CaptionMedium>}
          <WithTooltip
            Component={DataSetTitle}
            tooltipProps={{ title }}
            additionalCondition={onHover}
            componentProps={{ title, variant }}
          />
        </div>
      </div>

      <DataSetCardAction actions={actions} title={title} iconClassname={iconClassname} />
    </Card>
  );
};

type DataSetTitleProps = Required<Pick<DataSetCardProps, "title" | "variant">> & { id?: string };
const DataSetTitle = forwardRef<HTMLElement, DataSetTitleProps>(({ title, variant, id }, ref) => {
  const TypographyComponent = typographyComponentVariant(variant);

  return (
    <span className="flex" ref={ref} id={id}>
      <TypographyComponent className="w-full truncate">{title}</TypographyComponent>
    </span>
  );
});

type VariantSettings = {
  size: Record<DataSetCardSize, string>;
};

const cardVariant = /*tw:*/ cva<VariantSettings>("flex-row items-center justify-between border border-gray-200", {
  variants: {
    size: {
      md: "hover:shadow-md",
      sm: "bg-gray-50 hover:shadow",
    },
  },
});

const cardContentVariant = /*tw:*/ cva<VariantSettings>("flex min-w-0 items-center", {
  variants: {
    size: {
      md: "gap-3",
      sm: "gap-2",
    },
  },
});

const primaryIconVariant = (variant: DataSetCardVariant) => {
  switch (variant) {
    case "organization":
      return <IconShape icon="HomeIcon" color="brand" size="lg" className="shadow" ariaLabel="My organization" />;
    case "favorite":
      return <IconShape icon="StarIcon" color="favorite" size="lg" className="shadow" ariaLabel="Favorite" />;
    case "no-favorite":
      return <IconShape icon="StarIcon" color="gray" size="lg" className="shadow" ariaLabel="Missing favorite" />;
    default:
      return <IconShape icon="WorkspaceIcon" color="white" className="shadow" ariaLabel="Workspace" />;
  }
};

const secondaryIconVariant = /*tw:*/ cva<VariantSettings>(
  "shrink-0 fill-gray-400 hover:fill-gray-900 focus:fill-gray-900 group-aria-expanded:fill-gray-900 dark:focus:fill-gray-300 dark:hover:fill-gray-300",
  {
    variants: {
      size: {
        md: "size-5 cursor-pointer",
        sm: "size-3.5 cursor-pointer",
      },
    },
  },
);

const typographyComponentVariant = (variant: DataSetCardVariant) => {
  const variantsUsingBody: DataSetCardVariant[] = ["organization", "favorite", "no-favorite"];

  if (variantsUsingBody.includes(variant)) {
    return Typography.Body;
  }

  return Typography.Caption;
};

const labelTextVariant = (variant: DataSetCardVariant) => {
  if (variant === "favorite" || variant === "no-favorite") {
    return "My Favorite";
  }

  if (variant === "organization") {
    return "My Organization";
  }

  return null;
};

const sizeVariant = (variant: DataSetCardVariant) => {
  if (variant === "default") return "sm";
  return "md";
};
