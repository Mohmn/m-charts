import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Line,
  LineChart,
  ResponsiveContainer,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../src/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../src/components/ui/chart";
import { Filters } from "./components/ui/filter";
import { useDateAgeGender } from "./context/filter";
import useAnalyticsData from "./hooks/useAnalyticsData";
import useLabelAnalyticsData from "./hooks/useLabelData";
import { useState } from "react";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function App() {
  const filterState = useDateAgeGender();
  const { data: analyticsData, isLoading, isError } = useAnalyticsData(filterState);

  const dataTransformed =
    analyticsData &&
    Object.keys(analyticsData)?.map((key) => {
      return {
        label: key,
        timeSpend: analyticsData[key],
      };
    });


  const [labelSelected, setSelectedLabel] = useState(null);

  return (
    <>
      <div className="flex flex-col gap-5 m-10 justify-center md:flex-row">
        <Card>
          <CardHeader>
            {/* <CardTitle>Bar Chart - Horizontal</CardTitle>
        <CardDescription>January - June 2024</CardDescription> */}
      </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="w-4/5 md:w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={dataTransformed}
                  layout="vertical"
                  margin={{
                    left: -20,
                  }}
                >
                  <XAxis type="number" dataKey="timeSpend" />
                  <YAxis
                    dataKey="label"
                    type="category"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                  <Bar
                    dataKey="timeSpend"
                    fill="var(--color-desktop)"
                    radius={10}
                    onClick={(data, index) => {
                      setSelectedLabel(data.label);
                    }}
                  />
                  <CartesianGrid
                    stroke="red"
                    vertical={true}
                    horizontal={false}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        {labelSelected && <LineChartComponent label={labelSelected} />}
      </div>
      <Filters />
    </>
  );
}

const chartConfig2 = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

function LineChartComponent(props: { label: string }) {
  const filterState = useDateAgeGender();
  const { data } = useLabelAnalyticsData(props.label, filterState);

  const transformedData = data
    ?.map((item) => ({
      day: new Date(item.day),
      formattedDay: new Date(item.day).toLocaleString("default", {
        month: "short",
        day: "numeric",
      }),
      value: item[props.label],
    }))
    .sort((a, b) => a.day - b.day);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Label : {props.label}</CardTitle>
        {transformedData && (
          <CardDescription>
            {`${transformedData[0]?.formattedDay} - ${transformedData[transformedData.length - 1]?.formattedDay
              }`}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig2} className="w-4/5 md:w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={transformedData}
              margin={{ top: 20, left: 30, right: 12, bottom: 20 }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="formattedDay"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 6)}
              />
              <YAxis tickLine={false} axisLine={false} tickMargin={8} width={30} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Line
                dataKey="value"
                type="linear"
                stroke="var(--color-desktop)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
