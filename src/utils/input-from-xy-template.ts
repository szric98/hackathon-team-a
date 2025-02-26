import { type ISODateString, asISODateStringOrError, isDayjs } from "@plandek-utils/ts-parse-dayjs";
import { get } from "es-toolkit/compat";

import type {
  CardOverrideInput,
  GenericMetricInputMin,
  MetricCardKeyInput,
  MetricPositionRole,
} from "@/__generated__/dashboards-api";

import type {
  DrilldownInputTemplateForCategoricalPoint,
  DrilldownInputTemplateForKeys,
  DrilldownInputTemplateForPoint,
  DrilldownInputTemplateForSummary,
  DrilldownInputValueNumber,
  DrilldownInputValueSerializedDate,
  DrilldownInputValueString,
  DrilldownInputValueStringList,
  XYPoint,
  XYSeriesDefinition,
} from "@plandek/pkg-chart-data";
import { isDatePoint, metricPositionRoleFromChartSeriesGroupKey } from "@plandek/pkg-chart-data";

import type {
  MetricDrilldownInputCategoricalPoint,
  MetricDrilldownInputKeys,
  MetricDrilldownInputMain,
  MetricDrilldownInputPoint,
  MetricDrilldownInputSummary,
} from "@/modules/Drilldown/types";
import { safeCompact } from "@plandek-utils/safe-compact";
import { isDate } from "es-toolkit";
import { unprocessedDateRangeFromDatePoint } from "./date/unprocessed-date-range-from-date-point";

export function makeDrilldownForMetricCardInputFromXYTemplate(
  metricInput: GenericMetricInputMin,
  metricCardKeyInput: MetricCardKeyInput,
  cardOverrideInput: CardOverrideInput | null,
  seriesDefinition: XYSeriesDefinition,
  point: XYPoint,
): MetricDrilldownInputMain | null {
  const template = seriesDefinition.drilldownInputTemplate;
  if (!template) return null;

  const metricPositionRole = metricPositionRoleFromChartSeriesGroupKey(seriesDefinition.groupKey);

  if (template.type === "keys")
    return forKeys(metricPositionRole, metricInput, metricCardKeyInput, cardOverrideInput, template, point);
  if (template.type === "point")
    return forPoint(metricPositionRole, metricInput, metricCardKeyInput, cardOverrideInput, template, point);
  if (template.type === "categorical-point")
    return forCategoricalPoint(metricPositionRole, metricInput, metricCardKeyInput, cardOverrideInput, template, point);
  if (template.type === "summary")
    return forSummary(metricPositionRole, metricInput, metricCardKeyInput, cardOverrideInput, template, point);

  const _never: never = template;
  throw new Error(`Unknown drilldown input type: ${_never}`);
}

function forKeys(
  metricPositionRole: MetricPositionRole,
  metricInput: GenericMetricInputMin,
  metricCardKeyInput: MetricCardKeyInput,
  cardOverrideInput: CardOverrideInput | null,
  template: DrilldownInputTemplateForKeys,
  point: XYPoint,
): MetricDrilldownInputKeys {
  return {
    type: "keys",
    keysInput: {
      metricPositionRole,
      cardOverrideInput: cardOverrideInput ? cleanCardOverrideInput(cardOverrideInput) : null,
      keys: cleanMetricCardKeyInput(metricCardKeyInput),
      metricInput,
      drilldownInput: {
        drilldownDiscriminator: runDrilldownInputValueString(template.drilldownDiscriminator, point),
        keys: runDrilldownInputValueStringList(template.keys, point),
      },
    },
  };
}

function forCategoricalPoint(
  metricPositionRole: MetricPositionRole,
  metricInput: GenericMetricInputMin,
  metricCardKeyInput: MetricCardKeyInput,
  cardOverrideInput: CardOverrideInput | null,
  template: DrilldownInputTemplateForCategoricalPoint,
  point: XYPoint,
): MetricDrilldownInputCategoricalPoint {
  return {
    type: "categorical-point",
    categoricalPointInput: {
      metricPositionRole,
      cardOverrideInput: cardOverrideInput ? cleanCardOverrideInput(cardOverrideInput) : null,
      keys: cleanMetricCardKeyInput(metricCardKeyInput),
      metricInput,
      drilldownInput: {
        drilldownDiscriminator: runDrilldownInputValueString(template.drilldownDiscriminator, point),
        categoricalKey: runDrilldownInputValueString(template.categoricalKey, point),
        entityKey: runDrilldownInputValueString(template.entityKey, point),
        y: template.y ? runDrilldownInputValueNumber(template.y, point) : null,
      },
    },
  };
}

function forPoint(
  metricPositionRole: MetricPositionRole,
  metricInput: GenericMetricInputMin,
  metricCardKeyInput: MetricCardKeyInput,
  cardOverrideInput: CardOverrideInput | null,
  template: DrilldownInputTemplateForPoint,
  point: XYPoint,
): MetricDrilldownInputPoint | null {
  if (!isDatePoint(point)) {
    console.error("Drilldown for point is not supported for non-date points");
    return null;
  }
  return {
    type: "point",
    pointInput: {
      metricPositionRole,
      cardOverrideInput: cardOverrideInput ? cleanCardOverrideInput(cardOverrideInput) : null,
      keys: cleanMetricCardKeyInput(metricCardKeyInput),
      metricInput,
      drilldownInput: {
        drilldownDiscriminator: runDrilldownInputValueString(template.drilldownDiscriminator, point),
        x: runDrilldownInputValueSerializedDate(template.x, point),
        dateRange: unprocessedDateRangeFromDatePoint(point),
        entityKey: runDrilldownInputValueString(template.entityKey, point),
        y: template.y ? runDrilldownInputValueNumber(template.y, point) : null,
      },
    },
  };
}

function forSummary(
  metricPositionRole: MetricPositionRole,
  metricInput: GenericMetricInputMin,
  metricCardKeyInput: MetricCardKeyInput,
  cardOverrideInput: CardOverrideInput | null,
  template: DrilldownInputTemplateForSummary,
  point: XYPoint,
): MetricDrilldownInputSummary {
  return {
    type: "summary",
    summaryInput: {
      metricPositionRole,
      cardOverrideInput: cardOverrideInput ? cleanCardOverrideInput(cardOverrideInput) : null,
      keys: cleanMetricCardKeyInput(metricCardKeyInput),
      metricInput,
      drilldownInput: {
        drilldownDiscriminator: runDrilldownInputValueString(template.drilldownDiscriminator, point),
        summaryKey: runDrilldownInputValueString(template.summaryKey, point),
      },
    },
  };
}

function cleanCardOverrideInput(cardOverrideInput: CardOverrideInput): CardOverrideInput {
  return {
    breakdown: cardOverrideInput.breakdown,
    chartTab: cardOverrideInput.chartTab,
    chartType: cardOverrideInput.chartType,
  };
}

function cleanMetricCardKeyInput(metricCardKeyInput: MetricCardKeyInput): MetricCardKeyInput {
  return {
    clientKey: metricCardKeyInput.clientKey,
    dataSetKey: metricCardKeyInput.dataSetKey,
    metricCardId: metricCardKeyInput.metricCardId,
  };
}

function runDrilldownInputValueString(temp: DrilldownInputValueString, point: XYPoint): string {
  if (temp.origin === "static") return temp.value;
  return safeString(get(point, temp.path));
}

function runDrilldownInputValueStringList(temp: DrilldownInputValueStringList, point: XYPoint): string[] {
  if (temp.origin === "static") return temp.value;
  return safeStrings(get(point, temp.path));
}

function runDrilldownInputValueNumber(temp: DrilldownInputValueNumber, point: XYPoint): number {
  if (temp.origin === "static") return temp.value;
  return safeFloat(get(point, temp.path));
}

function runDrilldownInputValueSerializedDate(temp: DrilldownInputValueSerializedDate, point: XYPoint): ISODateString {
  if (temp.origin === "static") return asISODateStringOrError(temp.value);
  return asISODateStringOrError(get(point, temp.path));
}

function safeFloat(arg: unknown): number {
  if (typeof arg === "number" && Number.isFinite(arg)) return arg;
  if (Array.isArray(arg)) return safeFloat(arg[0]);
  if (typeof arg !== "string") return 0;

  const parsed = Number.parseFloat(arg);
  return Number.isFinite(parsed) ? parsed : 0;
}

function safeString(arg: unknown): string {
  if (typeof arg === "string") return arg;
  if (typeof arg === "number" && Number.isFinite(arg)) return arg.toString();
  if (Array.isArray(arg)) return safeString(arg[0]);
  if (isDate(arg) || isDayjs(arg)) return arg.toISOString();
  return "";
}

function safeStrings(arg: unknown): string[] {
  const list = Array.isArray(arg) ? arg : [arg];
  return safeCompact(list.map(safeString));
}
