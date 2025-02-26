import { compact } from "es-toolkit";

import type { EpicFragment, FeatureFragment, SprintFragment } from "@/__generated__/dashboards-api";
import { dateDescription } from "@/renderers/components/organisms/range-selector/DateRangeSelector";
import type { BaseKeyLabel } from "@/types";

import { parseDateRange } from "./date/date-range";

export type LiveViewMode = "epics" | "sprints" | "features";

export function epicsListIncludes(options: EpicFragment[], givenKey: string | null) {
  if (!givenKey) return false;
  return !!options.find(({ uri }) => uri === givenKey);
}

export function featuresListIncludes(options: FeatureFragment[], givenKey: string | null) {
  if (!givenKey) return false;
  return !!options.find(({ uri }) => uri === givenKey);
}

export function sprintListIncludes(options: SprintFragment[], givenKey: string | null) {
  if (!givenKey) return false;
  return !!options.find(({ sprintKey }) => sprintKey === givenKey);
}

export function keyLabelFromEpic(epic: EpicFragment | null | undefined): BaseKeyLabel | null {
  if (!epic) return null;
  return {
    key: epic.uri,
    label: labelForEpic(epic),
  };
}
export function keyLabelFromFeature(feature: FeatureFragment | null | undefined): BaseKeyLabel | null {
  if (!feature) return null;
  return {
    key: feature.uri,
    label: labelForFeature(feature),
  };
}
export function keyLabelFromSprint(sprint: SprintFragment | null | undefined): BaseKeyLabel | null {
  if (!sprint) return null;
  return {
    key: sprint.sprintKey,
    label: labelForSprint(sprint),
  };
}

export function keyLabelFromSprintList(sprintList: SprintFragment[]): BaseKeyLabel[] {
  return compact(sprintList.map(keyLabelFromSprint));
}

const labelForEpic = (epic: EpicFragment) => `${epic.ticketKeyFormatted}: ${epic.summary}`;
const labelForFeature = (epic: FeatureFragment) => `${epic.ticketKeyFormatted}: ${epic.summary}`;
const labelForSprint = (sprint: SprintFragment) => {
  return `${sprint.sprintLabel}: ${dateDescription(parseDateRange(sprint.dateRange))}`;
};
