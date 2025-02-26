import type { NavigationService } from "@/hooks/use-navigation";
import { useSearchFilter } from "@/hooks/use-search-filter";
import { useSelectFilter } from "@/hooks/use-select-filter";
import type { BaseKeyLabel } from "@/types";
import { safeCompact } from "@plandek-utils/safe-compact";
import type { FC } from "react";
import { Card } from "../../components/atoms/card/Card";
import { Icon } from "../../components/atoms/icons/Icon";
import { IconRenderFn } from "../../components/atoms/icons/IconRenderFn";
import { Typography } from "../../components/atoms/typographies/Typography";
import { Alert } from "../../components/molecules/alert/Alert";
import { Button } from "../../components/molecules/button/Button";
import type { DropdownMenuItem } from "../../components/molecules/dropdown/Dropdown";
import { SearchInput } from "../../components/molecules/inputs/search-input/SearchInput";
import { SelectInput } from "../../components/molecules/inputs/select-input/SelectInput";
import { DataSetCard } from "../../components/organisms/complex-cards/data-set-card/DataSetCard";
import { AppHeaderLayout } from "../../templates/AppHeaderLayout";

type DataSetCategoryItem = BaseKeyLabel & {
  dataSets: BaseKeyLabel[];
};

type DataSetSelectorPageProps = {
  ps: NavigationService<"clientKey">;
  selectedDataSetName?: string;
  organization: BaseKeyLabel | null;
  favorite: BaseKeyLabel | null;
  categories: DataSetCategoryItem[];
  saveFavoriteDataSet: (dataSetKey: string) => void;
  removeFavoriteDataSet: () => void;
  canUpdateDataSetSettings: (dataSetKey: string) => boolean;
};

export const DataSetSelectorPage: FC<DataSetSelectorPageProps> = ({
  ps,
  selectedDataSetName,
  organization,
  favorite,
  categories,
  saveFavoriteDataSet,
  removeFavoriteDataSet,
  canUpdateDataSetSettings,
}) => {
  const { Filter: CategoryFilter, applySelectFilterFn } = useCategorySelectFilter(categories);

  const { changeSearchTerm, applySearchFilterFn } = useSearchFilter<BaseKeyLabel>({
    predicate: (item: BaseKeyLabel) => item.label,
  });

  const result = applySelectFilterFn(categories)
    .map((category) => ({
      ...category,
      dataSets: applySearchFilterFn(category.dataSets),
    }))
    .filter(({ dataSets }) => dataSets.length > 0);

  function menuItemsForCard(key: string) {
    const isFavorite = favorite?.key === key;
    const favoriteLabel = getFavoriteLabel(favorite, key);

    const favoriteDataSet: DropdownMenuItem = {
      key: "favorite-data-set",
      icon: isFavorite ? "StarIcon" : "StarOutlineIcon",
      label: favoriteLabel,
      onClick: () => (isFavorite ? removeFavoriteDataSet() : saveFavoriteDataSet(key)),
      dataAnalyticsId: isFavorite ? "remove-favorite" : "add-favorite",
    };

    const dataSetSettings: DropdownMenuItem | null = canUpdateDataSetSettings(key)
      ? {
          key: "data-set-settings",
          icon: "CogIcon",
          label: "Workspace settings",
          onClick: () => ps.updateDataSet({ dataSetKey: key }).redirectFn(),
          dataAnalyticsId: "workspace-settings",
        }
      : null;

    return safeCompact([favoriteDataSet, dataSetSettings]);
  }

  return (
    <AppHeaderLayout
      dataSetName={selectedDataSetName}
      noDataSetFallback={
        <Alert
          icon={() => IconRenderFn("HandWaveIcon")({ className: "fill-brand-800 dark:fill-brand-400 size-4 mr-1" })}
          additionalContent={
            <Typography.Caption color="brandDark">Please select a workspace to get started!</Typography.Caption>
          }
        >
          <Typography.BodyBold color="brandDark">Welcome back to Plandek</Typography.BodyBold>
        </Alert>
      }
    >
      <div className="flex w-full flex-col gap-6">
        <div className="flex w-full items-center justify-between">
          <Typography.Heading2>Workspaces</Typography.Heading2>
          <Button dataAnalyticsId="workspace-page__add-workspace-button">
            <Icon icon="PlusIcon" className="mr-2 size-3 fill-white" />
            Add Workspace
          </Button>
        </div>
        <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] gap-6">
          {!!organization && (
            <DataSetCard
              title={organization.label}
              variant="organization"
              dataTestId="workspace-selector-page__organization-card"
              onClick={ps.dataSetPathInternal({ dataSetKey: organization.key }).redirectFn}
              actions={menuItemsForCard(organization.key)}
            />
          )}
          {favorite ? (
            <DataSetCard
              title={favorite.label}
              variant="favorite"
              dataTestId="workspace-selector-page__favorite-card"
              onClick={ps.dataSetPathInternal({ dataSetKey: favorite.key }).redirectFn}
              actions={menuItemsForCard(favorite.key)}
            />
          ) : (
            <DataSetCard title="You don’t have a favorite yet" variant="no-favorite" />
          )}
        </div>
        <Card size="lg">
          <div className="flex justify-between gap-6">
            <SearchInput className="min-w-96" placeholder="Search workspace" onChange={changeSearchTerm} />
            <CategoryFilter />
          </div>
          <div className="flex flex-col gap-6">
            {result.length === 0 ? (
              <Typography.Body color="secondary">No workspaces match your search</Typography.Body>
            ) : (
              result.map((category) => (
                <div key={category.key} className="flex flex-col gap-4">
                  <Typography.BodyBold>{category.label}</Typography.BodyBold>
                  <div className="grid grid-cols-[repeat(auto-fill,minmax(18rem,1fr))] gap-3">
                    {category.dataSets.map(({ key, label }) => (
                      <DataSetCard
                        key={key}
                        onClick={ps.dataSetPathInternal({ dataSetKey: key }).redirectFn}
                        title={label}
                        actions={menuItemsForCard(key)}
                      />
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </AppHeaderLayout>
  );
};

export const useCategorySelectFilter = (categories: DataSetCategoryItem[]) => {
  const categoryOptions: BaseKeyLabel[] = categories.map((category) => ({
    key: category.key,
    label: category.label,
  }));

  const { changeSelectFilter, applySelectFilterFn } = useSelectFilter<DataSetCategoryItem>(
    categoryOptions,
    (category) => category.key,
  );

  const Filter: FC = () => {
    return (
      <SelectInput
        ariaLabel="Categories dropdown"
        dataAnalyticsId="workspace-page__categories-dropdown"
        items={categoryOptions}
        placeholder="All categories"
        inputClassName="min-w-60"
        onSelect={changeSelectFilter}
      />
    );
  };

  return { Filter, applySelectFilterFn };
};

function getFavoriteLabel(favorite: BaseKeyLabel | null, currentKey: string) {
  if (!favorite) return "Add as favorite";

  return favorite.key === currentKey ? "Remove as favorite" : "Replace as favorite";
}
