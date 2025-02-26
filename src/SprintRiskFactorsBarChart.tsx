/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "./components/ui/chart";
import { useMemo } from "react";
import rawChartData from "./data/insights-risk.csv";

type SprintData = {
  sprint: string;
  [key: string]: string;
};

export function SprintRiskFactorsBarChart() {
  console.log(rawChartData);
  function transformData(data) {
    const days = Array.from({ length: 14 }, (_, i) => i + 1);
    const transformed: { [key: number]: any } = {};

    for (const entry of data) {
      const insightName = entry["Insight Name"];

      for (const day of days) {
        const dayKey = `Day ${day}`;
        const value = parseInt(entry[dayKey], 10) || 0;

        if (!transformed[day]) {
          transformed[day] = { key: day };
        }

        transformed[day][insightName] =
          (transformed[day][insightName] || 0) + value;
      }
    }

    return Object.values(transformed);
  }

  function getRandomHexColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  const { chartData, chartConfig, chartConfigAsArray } = useMemo(() => {
    const chartData = transformData(rawChartData);

    const chartConfigAsArray = Object.keys(chartData[0])
      .map((key, index) => {
        if (key !== "key") {
          // Exclude the 'key' property
          return {
            label: key,
            color: `var(--color-${index+1})`,
          };
        }
      })
      .filter((item) => item !== undefined);

      const chartConfig = {}

      for (const item of chartConfigAsArray) {
        chartConfig[item.label] = {
          label: item.label,
          color: item.color,
        }
      }

    return { chartData, chartConfigAsArray, chartConfig };
  }, []);

  console.log('data', chartData);
  console.log('config', chartConfig);
  console.log('config')

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top 5 Risk Factors Overtime</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />
            {
              chartConfigAsArray.map((row) => (
                <Bar
                dataKey={row.label}
                stackId="a"
                fill={row.color}
                radius={[0, 0, 4, 4]}
              />
              ))
            }
            
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
