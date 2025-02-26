import type { MetricCardEvTabsAndBreakdownSettingsFragment } from "@/__generated__/dashboards-api";
import { type KeySet, isKeySetAll, isKeySetNone } from "@eturino/key-set";
import { safeCompact } from "@plandek-utils/safe-compact";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import type { FC } from "react";
import { Button } from "../../molecules/button/Button";
import { MultiSelectDropdown } from "../../molecules/dropdown/MultiSelectDropdown/MultiSelectDropdown";

export type UpdateBreakdownsFn = (newValue: KeySet<string>) => void;

type AddBreakdownButtonProps = {
  tabSettings: MetricCardEvTabsAndBreakdownSettingsFragment;
  updateBreakdowns: UpdateBreakdownsFn;
};

export const ExtendedViewAddBreakdownButton: FC<AddBreakdownButtonProps> = (props) => {
  const { tabSettings, updateBreakdowns } = props;
  const { availableBreakdownConfigs, enabledBreakdowns } = tabSettings;

  const onModalClose = (selectedBreakdownKeySet: KeySet<string>) => {
    if (enabledBreakdowns.isEqual(selectedBreakdownKeySet)) return;
    updateBreakdowns(selectedBreakdownKeySet);
  };

  const availableBreakdownMap = new Map(
    availableBreakdownConfigs.map((breakdown) => [breakdown.key, { key: breakdown.key, label: breakdown.label }]),
  );

  const createDefaultSelectedList = () => {
    if (isKeySetAll(enabledBreakdowns)) return availableBreakdownMap;
    if (isKeySetNone(enabledBreakdowns)) return new Map();
    return new Map(
      safeCompact(
        enabledBreakdowns.elementsList.map((key) => {
          const breakdown = availableBreakdownMap.get(key);
          return breakdown ? [key, breakdown] : null;
        }),
      ),
    );
  };

  if (!availableBreakdownConfigs.length) return null;

  return (
    <MultiSelectDropdown
      label="Manage breakdowns"
      ariaLabel="Manage breakdown multi select dropdowns"
      defaultSelectedList={createDefaultSelectedList()}
      items={availableBreakdownMap}
      onCloseDropdown={onModalClose}
    >
      {() => (
        <DropdownMenu.Trigger>
          <Button dataAnalyticsId="ev-breakdown__manage-breakdowns-trigger" size="sm" color="alternative">
            Manage Breakdowns
          </Button>
        </DropdownMenu.Trigger>
      )}
    </MultiSelectDropdown>
  );
};
