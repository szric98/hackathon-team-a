import type { GetMetricDashboardsForDataSetTreeData } from "@/api/queries/use-get-metric-dashboards-for-data-set-tree-query";

export const mockCategories: GetMetricDashboardsForDataSetTreeData["categories"] = [
  {
    categoryKey: "category-1",
    label: "Category 1",
    dataSetWithDashboardsList: [
      {
        dataSet: {
          id: "client--dataset-1-1",
          label: "Dataset 1-1",
          clientKey: "client",
          dataSetKey: "dataset-1-1",
          categoryKey: "category-1",
        },
        dashboards: [
          {
            id: "client--dataset-1-1--dashboard-1",
            dataSetKey: "dataset-1-1",
            dashboardKey: "dashboard-1",
            label: "Dashboard 1",
            type: "INDEPENDENT",
          },
          {
            id: "client--dataset-1-1--dashboard-2",
            dataSetKey: "dataset-1-1",
            dashboardKey: "dashboard-2",
            label: "Dashboard 2",
            type: "INDEPENDENT",
          },
        ],
      },
      {
        dataSet: {
          id: "client--dataset-1-2",
          label: "Dataset 1-2",
          clientKey: "client",
          dataSetKey: "dataset-1-2",
          categoryKey: "category-1",
        },
        dashboards: [
          {
            id: "client--dataset-1-2--dashboard-1",
            dataSetKey: "dataset-1-2",
            dashboardKey: "dashboard-1",
            label: "Dashboard 1",
            type: "INDEPENDENT",
          },
          {
            id: "client--dataset-1-2--dashboard-2",
            dataSetKey: "dataset-1-2",
            dashboardKey: "dashboard-2",
            label: "Dashboard 2",
            type: "INDEPENDENT",
          },
        ],
      },
    ],
  },
];
