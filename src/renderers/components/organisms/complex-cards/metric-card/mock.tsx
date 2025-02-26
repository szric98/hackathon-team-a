import { asISODateStringOrError } from "@plandek-utils/ts-parse-dayjs";

import type { SprintOverrideDetails } from "@/__generated__/dashboards-api";

import type { ExtractedChartDataRecord } from "@plandek/pkg-chart-data";

export const extractedChartDataMock: ExtractedChartDataRecord = {
  type: "XYDate",
  props: {
    formattersSetup: {},
    yAxesDefinitions: [
      {
        key: "%",
        label: "%",
        style: "normal",
      },
      null,
      null,
    ],
    seriesDefinitions: [
      {
        seriesNumber: 0,
        seriesOrder: 0,
        entityKey: "_general_",
        roleKey: "NORMAL",
        groupKey: "MAIN",
        legendsKey: "BULLET",
        seriesKey: "MAIN|_general_|NORMAL",
        drilldownDiscriminator: "_general_",
        chartColourKey: "GENERAL",
        seriesName: "Build failure rate",
        forceShowAlways: true,
        yAxisNumber: 0,
        hasNegativeValues: false,
        groupingStyle: "normal",
        tooltipTemplate: {
          customTemplate:
            "[#999 fontStyle:italic]{xDesc}[/]\n\n[#ff7043]● [#202020]Build failure rate:[/] [#202020 bold]{valueY.formatNumber('#,###.##')}[/][#202020]{d0.yUnit}[/]",
        },
        __type: "line",
        fillOpacity: 0.08,
        bulletStyle: "circle",
      },
    ],
    xValueType: "day",
    points: [
      {
        x: 1727049600000,
        xDateRangeFrom: "2024-09-23T00:00:00.000Z",
        xDateRangeTo: "2024-09-23T23:59:59.999Z",
        xString: "2024-09-23T00:00:00.000Z",
        xDesc: "23rd Sep 2024",
        y0: 51.83066361556064,
        i0: 84,
        d0: {
          yUnit: "%",
        },
      },
      {
        x: 1727827200000,
        xDateRangeFrom: "2024-10-02T00:00:00.000Z",
        xDateRangeTo: "2024-10-02T23:59:59.999Z",
        xString: "2024-10-02T00:00:00.000Z",
        xDesc: "2nd Oct 2024",
        y0: 32.85758124853869,
        i0: 119,
        d0: {
          yUnit: "%",
        },
      },
      {
        x: 1727913600000,
        xDateRangeFrom: "2024-10-03T00:00:00.000Z",
        xDateRangeTo: "2024-10-03T23:59:59.999Z",
        xString: "2024-10-03T00:00:00.000Z",
        xDesc: "3rd Oct 2024",
        y0: 29.91452991452992,
        i0: 39,
        d0: {
          yUnit: "%",
        },
      },
      {
        x: 1728000000000,
        xDateRangeFrom: "2024-10-04T00:00:00.000Z",
        xDateRangeTo: "2024-10-04T23:59:59.999Z",
        xString: "2024-10-04T00:00:00.000Z",
        xDesc: "4th Oct 2024",
        y0: 17.77777777777778,
        i0: 14,
        d0: {
          yUnit: "%",
        },
      },
      {
        x: 1728086400000,
        xDateRangeFrom: "2024-10-05T00:00:00.000Z",
        xDateRangeTo: "2024-10-05T23:59:59.999Z",
        xString: "2024-10-05T00:00:00.000Z",
        xDesc: "5th Oct 2024",
        y0: 0,
        i0: 0,
        d0: {
          yUnit: "%",
        },
      },
      {
        x: 1728172800000,
        xDateRangeFrom: "2024-10-06T00:00:00.000Z",
        xDateRangeTo: "2024-10-06T23:59:59.999Z",
        xString: "2024-10-06T00:00:00.000Z",
        xDesc: "6th Oct 2024",
        y0: 0,
        i0: 1,
        d0: {
          yUnit: "%",
        },
      },
      {
        x: 1728259200000,
        xDateRangeFrom: "2024-10-07T00:00:00.000Z",
        xDateRangeTo: "2024-10-07T23:59:59.999Z",
        xString: "2024-10-07T00:00:00.000Z",
        xDesc: "7th Oct 2024",
        y0: 15.384615384615385,
        i0: 27,
        d0: {
          yUnit: "%",
        },
      },
      {
        x: 1728345600000,
        xDateRangeFrom: "2024-10-08T00:00:00.000Z",
        xDateRangeTo: "2024-10-08T23:59:59.999Z",
        xString: "2024-10-08T00:00:00.000Z",
        xDesc: "8th Oct 2024",
        y0: 16.666666666666668,
        i0: 31,
        d0: {
          yUnit: "%",
        },
      },
      {
        x: 1728432000000,
        xDateRangeFrom: "2024-10-09T00:00:00.000Z",
        xDateRangeTo: "2024-10-09T23:59:59.999Z",
        xString: "2024-10-09T00:00:00.000Z",
        xDesc: "9th Oct 2024",
        y0: 33.333333333333336,
        i0: 20,
        d0: {
          yUnit: "%",
        },
      },
      {
        x: 1728518400000,
        xDateRangeFrom: "2024-10-10T00:00:00.000Z",
        xDateRangeTo: "2024-10-10T23:59:59.999Z",
        xString: "2024-10-10T00:00:00.000Z",
        xDesc: "10th Oct 2024",
        y0: 33.92857142857143,
        i0: 39,
        d0: {
          yUnit: "%",
        },
      },
      {
        x: 1728604800000,
        xDateRangeFrom: "2024-10-11T00:00:00.000Z",
        xDateRangeTo: "2024-10-11T23:59:59.999Z",
        xString: "2024-10-11T00:00:00.000Z",
        xDesc: "11th Oct 2024",
        y0: 29.5906432748538,
        i0: 55,
        d0: {
          yUnit: "%",
        },
      },
      {
        x: 1728691200000,
        xDateRangeFrom: "2024-10-12T00:00:00.000Z",
        xDateRangeTo: "2024-10-12T23:59:59.999Z",
        xString: "2024-10-12T00:00:00.000Z",
        xDesc: "12th Oct 2024",
        y0: 0,
        i0: 0,
        d0: {
          yUnit: "%",
        },
      },
      {
        x: 1728777600000,
        xDateRangeFrom: "2024-10-13T00:00:00.000Z",
        xDateRangeTo: "2024-10-13T23:59:59.999Z",
        xString: "2024-10-13T00:00:00.000Z",
        xDesc: "13th Oct 2024",
        y0: 0,
        i0: 0,
        d0: {
          yUnit: "%",
        },
      },
      {
        x: 1728864000000,
        xDateRangeFrom: "2024-10-14T00:00:00.000Z",
        xDateRangeTo: "2024-10-14T23:59:59.999Z",
        xString: "2024-10-14T00:00:00.000Z",
        xDesc: "14th Oct 2024",
        y0: 28.239538239538238,
        i0: 98,
        d0: {
          yUnit: "%",
        },
      },
      {
        x: 1728950400000,
        xDateRangeFrom: "2024-10-15T00:00:00.000Z",
        xDateRangeTo: "2024-10-15T23:59:59.999Z",
        xString: "2024-10-15T00:00:00.000Z",
        xDesc: "15th Oct 2024",
        y0: 50.049019607843135,
        i0: 55,
        d0: {
          yUnit: "%",
        },
      },
      {
        x: 1729036800000,
        xDateRangeFrom: "2024-10-16T00:00:00.000Z",
        xDateRangeTo: "2024-10-16T23:59:59.999Z",
        xString: "2024-10-16T00:00:00.000Z",
        xDesc: "16th Oct 2024",
        y0: 18.506493506493506,
        i0: 47,
        d0: {
          yUnit: "%",
        },
      },
    ],
  },
};

export const mockSprintOverrideDetails = {
  sprint: {
    altUris: ["uri1", "uri2"],
    clientKey: "plandek",
    dateRange: {
      from: asISODateStringOrError("2024-01-01"),
      to: asISODateStringOrError("2024-01-15"),
    },
    id: "sprintIdExample",
    originBoardKeys: ["snowstorm", "kannon"],
    rawCompletedDate: asISODateStringOrError("2024-01-14"),
    rawEndDate: asISODateStringOrError("2024-01-15"),
    rawOriginalCompletedDate: asISODateStringOrError("2024-01-14"),
    rawOriginalEndDate: asISODateStringOrError("2024-01-15"),
    rawOriginalStartDate: asISODateStringOrError("2024-12-31"),
    rawStartDate: asISODateStringOrError("2024-01-01"),
    sprintDateRangeField: "COMPLETED_DATE",
    sprintDateRangeUsingOriginals: true,
    sprintKey: "sprint-49",
    sprintLabel: "sprint 49 - Snowstorm",
  },
  sprintKeyOverride: "_last_sprint_",
} satisfies SprintOverrideDetails;
