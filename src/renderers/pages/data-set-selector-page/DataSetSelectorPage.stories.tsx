import { useNavigation } from "@/hooks/use-navigation";

import { StorybookCommonPageLayout } from "@/renderers/templates/StorybookLayout";
import type { BaseKeyLabel } from "@/types";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { DataSetSelectorPage } from "./DataSetSelectorPage";
import { mockCategories } from "./mock";

const meta = {
  component: DataSetSelectorPage,
  title: "pages/DataSetSelectorPage",
} satisfies Meta;

type Story = StoryObj;

export const Main: Story = {
  args: {},
  decorators: StorybookCommonPageLayout,
  render: () => {
    const organizationKL = { key: "plandek", label: "Plandek" };

    const categories = mockCategories.map((category) => ({
      key: category.categoryKey,
      label: category.label,
      dataSets: category.dataSets.map((dataSet) => ({ key: dataSet.dataSetKey, label: dataSet.label })),
    }));

    const dataSets = [organizationKL, ...categories.flatMap((category) => category.dataSets)];

    const [favorite, setFavorite] = useState<BaseKeyLabel | null>(dataSets[0] ?? null);
    const ps = useNavigation({ clientKey: "plandek" });

    return (
      <DataSetSelectorPage
        ps={ps}
        categories={categories}
        selectedDataSetName="Plandek"
        organization={organizationKL}
        favorite={favorite}
        saveFavoriteDataSet={(dataSetKey) =>
          setFavorite(dataSets.find((dataSet) => dataSet.key === dataSetKey) ?? null)
        }
        removeFavoriteDataSet={() => setFavorite(null)}
        canUpdateDataSetSettings={() => true}
      />
    );
  },
};

export default meta;
