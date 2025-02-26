/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./components/ui/chart";
import { useMemo } from "react";
import rawChartData from "./data/sprint-risk.csv";

type SprintData = {
  sprint: string;
  [key: string]: string;
};

export function SprintRiskLineChart() {
  const transformData = (data: SprintData[]) => {
    const result: Record<string, any>[] = [];

    // Extract all unique day keys (excluding "sprint" key)
    const dayKeys = Object.keys(data[0]).filter((key) => key.startsWith("day"));

    // Iterate over each day and build the transformed structure
    for (const dayKey of dayKeys) {
      const dayObject: Record<string, any> = {
        name: `Day ${dayKey.replace("day", "")}`,
      };

      for (const sprint of data) {
        dayObject[sprint.sprint] = Number(sprint[dayKey]) || 0; // Convert string to number
      }

      result.push(dayObject);
    }

    return result;
  };

  const { chartData, chartConfig } = useMemo(() => {
    const chartData: SprintData[] = rawChartData.map((row: any) => ({
      sprint: row["Sprint name"],
      day1: row["Day 1"],
      day2: row["Day 2"],
      day3: row["Day 3"],
      day4: row["Day 4"],
      day5: row["Day 5"],
      day6: row["Day 6"],
      day7: row["Day 7"],
      day8: row["Day 8"],
      day9: row["Day 9"],
      day10: row["Day 10"],
      day11: row["Day 11"],
      day12: row["Day 12"],
      day13: row["Day 13"],
      day14: row["Day 14"],
    }));

    const finalChartData = transformData(chartData);


    const chartConfig: ChartConfig = {};

    let index = 1;
    for (const row of rawChartData) {
      chartConfig[row["Sprint name"]] = {
        label: row["Sprint name"],
        color: `hsl(var(--chart-${index++}))`,
      };
    }

    return { chartData: finalChartData, chartConfig };
  }, []);


  const chartConfigEntries = Object.entries(chartConfig);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sprint Risk Over Time</CardTitle>
        <CardDescription>Comparing to Last 3 Sprints</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <YAxis axisLine={false} tickLine={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            {chartConfigEntries.map((row, index) => (
              <Line
                key={row[0]}
                dataKey={row[0]}
                type="monotone"
                strokeDasharray={chartConfigEntries.length - 1 !== index ? 5:  undefined}
                stroke={row[1].color}
                strokeWidth={chartConfigEntries.length - 1 === index ? 5:  2}
                dot={false }
              />
            ))}
            <Legend />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
