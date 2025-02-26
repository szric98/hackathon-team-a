import type { DataTableFragment } from "@/__generated__/dashboards-api";
import { type KeySet, KeySetNone, KeySetSome } from "@eturino/key-set";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { DataTable } from "./DataTable";
import { type DataTableContextProps, DataTableContextWrapper } from "./DataTableContext";
import { DataTableInputContextWrapper } from "./DataTableInputContextWrapper";

const meta = {
  title: "organisms/tables/DataTable",
  component: DataTable,
} satisfies Meta<DataTableContextProps>;

type Story = StoryObj<DataTableContextProps>;

const tableData: DataTableFragment = {
  id: "plandek--combinedResponseMetricCard--Uni322ZwMTguOM0eFhQ4beUaai0VBoSKy-ZLdGDsQh06IFAKnqx7N656vsmffqIFXm5uhl4oxZZijdhNHtMTfA--txs8HlYdDzgbwH1grpc-lh_8LNF9X36asLHLNlLHJ_wZKNueYcAZDjLWqzC36ReWNIfYMnwz96KdYc7DVu9M_Q--Uni322ZwMTguOM0eFhQ4beUaai0VBoSKy-ZLdGDsQh06IFAKnqx7N656vsmffqIFXm5uhl4oxZZijdhNHtMTfA--CH8Ui2eh79gKsm7v5Q8in_EqU2cdOIWB5Jc0t1j2f0pPDlMvF85uuJ5zx2oTy9fYtNbw5JFDq3pNTDFv7L10XA",
  showPagination: true,
  totalRows: 13,
  totalRowsUnfiltered: 13,
  countRows: 13,
  sortByColumn: "BASE_dateRange",
  sortOrder: "ASC",
  page: 0,
  pageSize: 25,
  search: null,
  titleSuffix: null,
  columns: [
    {
      columnOrigin: "BASE",
      exportable: true,
      key: "BASE_dateRange",
      label: "Date",
      sort: "ASC",
      blankSort: "BLANK_LAST",
      type: "STRING",
      visible: true,
      infoText: null,
      color: null,
    },
    {
      columnOrigin: "MAIN",
      exportable: true,
      key: "PRIMARY_value",
      label: "COPY OF Build failure rate: %",
      sort: "DESC",
      blankSort: "BLANK_LAST",
      type: "PERCENTAGE",
      visible: true,
      infoText: null,
      color: null,
    },
    {
      columnOrigin: "MAIN",
      exportable: true,
      key: "PRIMARY_countItems",
      label: "COPY OF Build failure rate Builds",
      sort: "DESC",
      blankSort: "BLANK_LAST",
      type: "INT",
      visible: true,
      infoText: null,
      color: null,
    },
  ],
  rows: [
    {
      key: "2024-10-14T00:00:00.000Z-2024-10-20T23:59:59.999Z",
      cells: [
        {
          value: "14th Oct 2024 - 20th Oct 2024",
          sortValue: "2024-10-14T00:00:00.000Z-2024-10-20T23:59:59.999Z",
        },
        {
          valuePercentage: 35.23,
          drilldownInput: {
            metricPositionRole: "PRIMARY",
            input: {
              drilldownDiscriminator: "_general_",
              entityKey: "_general_",
              x: "2024-10-14T00:00:00.000Z",
              y: null,
              dateRange: {
                from: "2024-10-14T00:00:00.000Z",
                to: "2024-10-20T23:59:59.999Z",
              },
            },
          },
        },
        {
          valueInt: 269,
          drilldownInput: {
            metricPositionRole: "PRIMARY",
            input: {
              drilldownDiscriminator: "_general_",
              entityKey: "_general_",
              x: "2024-10-14T00:00:00.000Z",
              y: null,
              dateRange: {
                from: "2024-10-14T00:00:00.000Z",
                to: "2024-10-20T23:59:59.999Z",
              },
            },
          },
        },
      ],
    },
    {
      key: "2024-10-21T00:00:00.000Z-2024-10-27T23:59:59.999Z",
      cells: [
        {
          value: "21st Oct 2024 - 27th Oct 2024",
          sortValue: "2024-10-21T00:00:00.000Z-2024-10-27T23:59:59.999Z",
        },
        {
          valuePercentage: 17.12,
          drilldownInput: {
            metricPositionRole: "PRIMARY",
            input: {
              drilldownDiscriminator: "_general_",
              entityKey: "_general_",
              x: "2024-10-21T00:00:00.000Z",
              y: null,
              dateRange: {
                from: "2024-10-21T00:00:00.000Z",
                to: "2024-10-27T23:59:59.999Z",
              },
            },
          },
        },
        {
          valueInt: 420,
          drilldownInput: {
            metricPositionRole: "PRIMARY",
            input: {
              drilldownDiscriminator: "_general_",
              entityKey: "_general_",
              x: "2024-10-21T00:00:00.000Z",
              y: null,
              dateRange: {
                from: "2024-10-21T00:00:00.000Z",
                to: "2024-10-27T23:59:59.999Z",
              },
            },
          },
        },
      ],
    },
    {
      key: "2024-10-28T00:00:00.000Z-2024-11-03T23:59:59.999Z",
      cells: [
        {
          value: "28th Oct 2024 - 3rd Nov 2024",
          sortValue: "2024-10-28T00:00:00.000Z-2024-11-03T23:59:59.999Z",
        },
        {
          valuePercentage: 17.58,
          drilldownInput: {
            metricPositionRole: "PRIMARY",
            input: {
              drilldownDiscriminator: "_general_",
              entityKey: "_general_",
              x: "2024-10-28T00:00:00.000Z",
              y: null,
              dateRange: {
                from: "2024-10-28T00:00:00.000Z",
                to: "2024-11-03T23:59:59.999Z",
              },
            },
          },
        },
        {
          valueInt: 375,
          drilldownInput: {
            metricPositionRole: "PRIMARY",
            input: {
              drilldownDiscriminator: "_general_",
              entityKey: "_general_",
              x: "2024-10-28T00:00:00.000Z",
              y: null,
              dateRange: {
                from: "2024-10-28T00:00:00.000Z",
                to: "2024-11-03T23:59:59.999Z",
              },
            },
          },
        },
      ],
    },
    {
      key: "2024-11-04T00:00:00.000Z-2024-11-10T23:59:59.999Z",
      cells: [
        {
          value: "4th Nov 2024 - 10th Nov 2024",
          sortValue: "2024-11-04T00:00:00.000Z-2024-11-10T23:59:59.999Z",
        },
        {
          valuePercentage: 10.72,
          drilldownInput: {
            metricPositionRole: "PRIMARY",
            input: {
              drilldownDiscriminator: "_general_",
              entityKey: "_general_",
              x: "2024-11-04T00:00:00.000Z",
              y: null,
              dateRange: {
                from: "2024-11-04T00:00:00.000Z",
                to: "2024-11-10T23:59:59.999Z",
              },
            },
          },
        },
        {
          valueInt: 360,
          drilldownInput: {
            metricPositionRole: "PRIMARY",
            input: {
              drilldownDiscriminator: "_general_",
              entityKey: "_general_",
              x: "2024-11-04T00:00:00.000Z",
              y: null,
              dateRange: {
                from: "2024-11-04T00:00:00.000Z",
                to: "2024-11-10T23:59:59.999Z",
              },
            },
          },
        },
      ],
    },
    {
      key: "2024-11-11T00:00:00.000Z-2024-11-17T23:59:59.999Z",
      cells: [
        {
          value: "11th Nov 2024 - 17th Nov 2024",
          sortValue: "2024-11-11T00:00:00.000Z-2024-11-17T23:59:59.999Z",
        },
        {
          valuePercentage: 35.06,
          drilldownInput: {
            metricPositionRole: "PRIMARY",
            input: {
              drilldownDiscriminator: "_general_",
              entityKey: "_general_",
              x: "2024-11-11T00:00:00.000Z",
              y: null,
              dateRange: {
                from: "2024-11-11T00:00:00.000Z",
                to: "2024-11-17T23:59:59.999Z",
              },
            },
          },
        },
        {
          valueInt: 295,
          drilldownInput: {
            metricPositionRole: "PRIMARY",
            input: {
              drilldownDiscriminator: "_general_",
              entityKey: "_general_",
              x: "2024-11-11T00:00:00.000Z",
              y: null,
              dateRange: {
                from: "2024-11-11T00:00:00.000Z",
                to: "2024-11-17T23:59:59.999Z",
              },
            },
          },
        },
      ],
    },
    {
      key: "2024-11-18T00:00:00.000Z-2024-11-24T23:59:59.999Z",
      cells: [
        {
          value: "18th Nov 2024 - 24th Nov 2024",
          sortValue: "2024-11-18T00:00:00.000Z-2024-11-24T23:59:59.999Z",
        },
        {
          valuePercentage: 28.11,
          drilldownInput: {
            metricPositionRole: "PRIMARY",
            input: {
              drilldownDiscriminator: "_general_",
              entityKey: "_general_",
              x: "2024-11-18T00:00:00.000Z",
              y: null,
              dateRange: {
                from: "2024-11-18T00:00:00.000Z",
                to: "2024-11-24T23:59:59.999Z",
              },
            },
          },
        },
        {
          valueInt: 467,
          drilldownInput: {
            metricPositionRole: "PRIMARY",
            input: {
              drilldownDiscriminator: "_general_",
              entityKey: "_general_",
              x: "2024-11-18T00:00:00.000Z",
              y: null,
              dateRange: {
                from: "2024-11-18T00:00:00.000Z",
                to: "2024-11-24T23:59:59.999Z",
              },
            },
          },
        },
      ],
    },
    {
      key: "2024-11-25T00:00:00.000Z-2024-12-01T23:59:59.999Z",
      cells: [
        {
          value: "25th Nov 2024 - 1st Dec 2024",
          sortValue: "2024-11-25T00:00:00.000Z-2024-12-01T23:59:59.999Z",
        },
        {
          valuePercentage: 21.43,
          drilldownInput: {
            metricPositionRole: "PRIMARY",
            input: {
              drilldownDiscriminator: "_general_",
              entityKey: "_general_",
              x: "2024-11-25T00:00:00.000Z",
              y: null,
              dateRange: {
                from: "2024-11-25T00:00:00.000Z",
                to: "2024-12-01T23:59:59.999Z",
              },
            },
          },
        },
        {
          valueInt: 370,
          drilldownInput: {
            metricPositionRole: "PRIMARY",
            input: {
              drilldownDiscriminator: "_general_",
              entityKey: "_general_",
              x: "2024-11-25T00:00:00.000Z",
              y: null,
              dateRange: {
                from: "2024-11-25T00:00:00.000Z",
                to: "2024-12-01T23:59:59.999Z",
              },
            },
          },
        },
      ],
    },
    {
      key: "2024-12-02T00:00:00.000Z-2024-12-08T23:59:59.999Z",
      cells: [
        {
          value: "2nd Dec 2024 - 8th Dec 2024",
          sortValue: "2024-12-02T00:00:00.000Z-2024-12-08T23:59:59.999Z",
        },
        {
          valuePercentage: 26.28,
          drilldownInput: {
            metricPositionRole: "PRIMARY",
            input: {
              drilldownDiscriminator: "_general_",
              entityKey: "_general_",
              x: "2024-12-02T00:00:00.000Z",
              y: null,
              dateRange: {
                from: "2024-12-02T00:00:00.000Z",
                to: "2024-12-08T23:59:59.999Z",
              },
            },
          },
        },
        {
          valueInt: 706,
          drilldownInput: {
            metricPositionRole: "PRIMARY",
            input: {
              drilldownDiscriminator: "_general_",
              entityKey: "_general_",
              x: "2024-12-02T00:00:00.000Z",
              y: null,
              dateRange: {
                from: "2024-12-02T00:00:00.000Z",
                to: "2024-12-08T23:59:59.999Z",
              },
            },
          },
        },
      ],
    },
    {
      key: "2024-12-09T00:00:00.000Z-2024-12-15T23:59:59.999Z",
      cells: [
        {
          value: "9th Dec 2024 - 15th Dec 2024",
          sortValue: "2024-12-09T00:00:00.000Z-2024-12-15T23:59:59.999Z",
        },
        {
          valuePercentage: 25.88,
          drilldownInput: {
            metricPositionRole: "PRIMARY",
            input: {
              drilldownDiscriminator: "_general_",
              entityKey: "_general_",
              x: "2024-12-09T00:00:00.000Z",
              y: null,
              dateRange: {
                from: "2024-12-09T00:00:00.000Z",
                to: "2024-12-15T23:59:59.999Z",
              },
            },
          },
        },
        {
          valueInt: 332,
          drilldownInput: {
            metricPositionRole: "PRIMARY",
            input: {
              drilldownDiscriminator: "_general_",
              entityKey: "_general_",
              x: "2024-12-09T00:00:00.000Z",
              y: null,
              dateRange: {
                from: "2024-12-09T00:00:00.000Z",
                to: "2024-12-15T23:59:59.999Z",
              },
            },
          },
        },
      ],
    },
    {
      key: "2024-12-16T00:00:00.000Z-2024-12-22T23:59:59.999Z",
      cells: [
        {
          value: "16th Dec 2024 - 22nd Dec 2024",
          sortValue: "2024-12-16T00:00:00.000Z-2024-12-22T23:59:59.999Z",
        },
        {
          valuePercentage: 19.67,
          drilldownInput: {
            metricPositionRole: "PRIMARY",
            input: {
              drilldownDiscriminator: "_general_",
              entityKey: "_general_",
              x: "2024-12-16T00:00:00.000Z",
              y: null,
              dateRange: {
                from: "2024-12-16T00:00:00.000Z",
                to: "2024-12-22T23:59:59.999Z",
              },
            },
          },
        },
        {
          valueInt: 275,
          drilldownInput: {
            metricPositionRole: "PRIMARY",
            input: {
              drilldownDiscriminator: "_general_",
              entityKey: "_general_",
              x: "2024-12-16T00:00:00.000Z",
              y: null,
              dateRange: {
                from: "2024-12-16T00:00:00.000Z",
                to: "2024-12-22T23:59:59.999Z",
              },
            },
          },
        },
      ],
    },
    {
      key: "2024-12-23T00:00:00.000Z-2024-12-29T23:59:59.999Z",
      cells: [
        {
          value: "23rd Dec 2024 - 29th Dec 2024",
          sortValue: "2024-12-23T00:00:00.000Z-2024-12-29T23:59:59.999Z",
        },
        {
          valuePercentage: 24.76,
          drilldownInput: {
            metricPositionRole: "PRIMARY",
            input: {
              drilldownDiscriminator: "_general_",
              entityKey: "_general_",
              x: "2024-12-23T00:00:00.000Z",
              y: null,
              dateRange: {
                from: "2024-12-23T00:00:00.000Z",
                to: "2024-12-29T23:59:59.999Z",
              },
            },
          },
        },
        {
          valueInt: 23,
          drilldownInput: {
            metricPositionRole: "PRIMARY",
            input: {
              drilldownDiscriminator: "_general_",
              entityKey: "_general_",
              x: "2024-12-23T00:00:00.000Z",
              y: null,
              dateRange: {
                from: "2024-12-23T00:00:00.000Z",
                to: "2024-12-29T23:59:59.999Z",
              },
            },
          },
        },
      ],
    },
    {
      key: "2024-12-30T00:00:00.000Z-2025-01-05T23:59:59.999Z",
      cells: [
        {
          value: "30th Dec 2024 - 5th Jan 2025",
          sortValue: "2024-12-30T00:00:00.000Z-2025-01-05T23:59:59.999Z",
        },
        {
          valuePercentage: 24.07,
          drilldownInput: {
            metricPositionRole: "PRIMARY",
            input: {
              drilldownDiscriminator: "_general_",
              entityKey: "_general_",
              x: "2024-12-30T00:00:00.000Z",
              y: null,
              dateRange: {
                from: "2024-12-30T00:00:00.000Z",
                to: "2025-01-05T23:59:59.999Z",
              },
            },
          },
        },
        {
          valueInt: 49,
          drilldownInput: {
            metricPositionRole: "PRIMARY",
            input: {
              drilldownDiscriminator: "_general_",
              entityKey: "_general_",
              x: "2024-12-30T00:00:00.000Z",
              y: null,
              dateRange: {
                from: "2024-12-30T00:00:00.000Z",
                to: "2025-01-05T23:59:59.999Z",
              },
            },
          },
        },
      ],
    },
    {
      key: "2025-01-06T00:00:00.000Z-2025-01-09T23:59:59.999Z",
      cells: [
        {
          value: "6th Jan 2025 - 9th Jan 2025",
          sortValue: "2025-01-06T00:00:00.000Z-2025-01-09T23:59:59.999Z",
        },
        {
          valuePercentage: 14.41,
          drilldownInput: {
            metricPositionRole: "PRIMARY",
            input: {
              drilldownDiscriminator: "_general_",
              entityKey: "_general_",
              x: "2025-01-06T00:00:00.000Z",
              y: null,
              dateRange: {
                from: "2025-01-06T00:00:00.000Z",
                to: "2025-01-09T23:59:59.999Z",
              },
            },
          },
        },
        {
          valueInt: 231,
          drilldownInput: {
            metricPositionRole: "PRIMARY",
            input: {
              drilldownDiscriminator: "_general_",
              entityKey: "_general_",
              x: "2025-01-06T00:00:00.000Z",
              y: null,
              dateRange: {
                from: "2025-01-06T00:00:00.000Z",
                to: "2025-01-09T23:59:59.999Z",
              },
            },
          },
        },
      ],
    },
  ],
};

export const DataTableStory: Story = {
  args: {
    data: tableData,
    visibility: {
      label: "Plot",
      toggleCheck: (key) => console.info("TOGGLE KEY", key),
      checkedKeySet: new KeySetSome(["2024-10-14T00:00:00.000Z-2024-10-20T23:59:59.999Z"]),
    },
    onCellExploreClick: (param) => console.info("CELL EXPLORE CLICK", param),
    onCellDrilldownClick: (param) => console.info("CELL DRILLDOWN CLICK", param),
  } satisfies DataTableContextProps,
  render: ({ visibility, ...props }) => {
    const [checkedKeySet, setCheckedKeySet] = useState<KeySet<string>>(
      visibility?.checkedKeySet ?? new KeySetNone<string>(),
    );

    const toggleCheck = (key: string) => {
      if (checkedKeySet.contains(key)) {
        setCheckedKeySet(checkedKeySet.remove(new KeySetSome([key])));
      } else {
        setCheckedKeySet(checkedKeySet.union(new KeySetSome([key])));
      }
    };

    return (
      <DataTableInputContextWrapper>
        <DataTableContextWrapper {...props} visibility={{ ...visibility, label: "Plot", checkedKeySet, toggleCheck }}>
          <DataTable />
        </DataTableContextWrapper>
      </DataTableInputContextWrapper>
    );
  },
};

export default meta;
