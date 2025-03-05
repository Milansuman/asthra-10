'use client';


import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';


import { TrendingUp } from "lucide-react";

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { RouterOutput } from '@/server/api/root';

import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts";
import { api } from '@/trpc/react';




const chartConfig = {
  count: {
    label: "Count",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

type Props = {
  asthra: RouterOutput["dashboard"]["asthraCount"];
}


export function Asthra() {
  const { data: asthra, isLoading } = api.dashboard.asthraCount.useQuery();

  if (isLoading) return <div>Loading...</div>;
  if (!asthra) return <div>No Data of Asthra</div>;

  console.log(asthra);

  const chartData = [
    { label: "RegistedAndAttended", count: asthra.totalRegistedAndAttended[0]?.value ?? 0 },
    { label: "Registered Only", count: asthra.totalRegistered[0]?.value ?? 0 },
    { label: "Transactions", count: asthra.totalTransactions[0]?.value ?? 0 },
    { label: "AsthraPass", count: asthra.totalAsthraPass[0]?.value ?? 0 },
  ]
  return (
    <Card className='w-6/12'>
      <CardHeader>
        <CardTitle>Asthra - Count</CardTitle>
      </CardHeader>
      <CardContent>
        <div className=''>
          <ChartContainer config={chartConfig}>
            <BarChart
              accessibilityLayer
              data={chartData}
              layout="vertical"
              margin={{
                right: 16,
              }}
            >
              <CartesianGrid horizontal={false} />
              <YAxis
                dataKey="label"
                type="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value}
                hide
              />
              <XAxis dataKey="count" type="number" hide />
              <ChartTooltip
                cursor={false}
                labelClassName='text-black'
                content={<ChartTooltipContent indicator="line" />}
              />
              <Bar
                dataKey="count"
                layout="vertical"
                fill="var(--color-count)"
                radius={4}
              >
                <LabelList
                  dataKey="label"
                  position="insideLeft"
                  offset={8}
                  className="fill-[--color-label] text-white"
                  fontSize={12}
                />
                <LabelList
                  dataKey="count"
                  position="right"
                  offset={8}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
      </CardFooter>
    </Card>
  )
}
export function Workshop() {
  const { data: asthra, isLoading } = api.dashboard.workshopCount.useQuery();

  if (isLoading) return <div>Loading...</div>;
  if (!asthra) return <div>No Data of Asthra</div>;

  console.log(asthra);

  const chartData = [
    { label: "RegistedAndAttended", count: asthra.totalRegistedAndAttended[0]?.value ?? 0 },
    { label: "Registered Only", count: asthra.totalRegistered[0]?.value ?? 0 },
    { label: "Transactions", count: asthra.totalTransactions[0]?.value ?? 0 },
  ]
  return (
    <Card className='w-6/12'>
      <CardHeader>
        <CardTitle>Events - Count</CardTitle>
      </CardHeader>
      <CardContent>
        <div className=''>
          <ChartContainer config={chartConfig}>
            <BarChart
              accessibilityLayer
              data={chartData}
              layout="vertical"
              margin={{
                right: 16,
              }}
            >
              <CartesianGrid horizontal={false} />
              <YAxis
                dataKey="label"
                type="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value}
                hide
              />
              <XAxis dataKey="count" type="number" hide />
              <ChartTooltip
                cursor={false}
                labelClassName='text-black'
                content={<ChartTooltipContent indicator="line" />}
              />
              <Bar
                dataKey="count"
                layout="vertical"
                fill="var(--color-count)"
                radius={4}
              >
                <LabelList
                  dataKey="label"
                  position="insideLeft"
                  offset={8}
                  className="fill-[--color-label] text-white"
                  fontSize={12}
                />
                <LabelList
                  dataKey="count"
                  position="right"
                  offset={8}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
      </CardFooter>
    </Card>
  )
}