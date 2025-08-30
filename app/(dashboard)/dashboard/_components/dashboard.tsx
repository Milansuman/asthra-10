"use client"

import type { ChartConfig } from "@/components/ui/chart"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { api } from "@/trpc/react"

const chartConfig = {
  count: {
    label: "Count",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

function formatLabel(label: string) {
  return label
    .replaceAll("RegistedAndAttended", "Reg + Attended")
    .replaceAll("Registered Only", "Registered")
    .replaceAll("Transactions", "Transactions")
    .replaceAll("AsthraPass", "Asthra Pass")
}

export function Asthra() {
  const { data: asthra, isLoading } = api.dashboard.asthraCount.useQuery()

  if (isLoading) return <div>Loading...</div>
  if (!asthra) return <div>No Data of Asthra</div>

  console.log(asthra)

  const chartData = [
    { label: "RegistedAndAttended", count: asthra.totalRegistedAndAttended[0]?.value ?? 0 },
    { label: "Registered Only", count: asthra.totalRegistered[0]?.value ?? 0 },
    { label: "Transactions", count: asthra.totalTransactions[0]?.value ?? 0 },
    { label: "AsthraPass", count: asthra.totalAsthraPass[0]?.value ?? 0 },
  ]
  return (
    <Card className="flex-1 flex flex-col min-h-0">
      <CardHeader className="flex-shrink-0 px-4 sm:px-6 py-4">
        <CardTitle className="text-lg sm:text-xl">Asthra - Count</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col px-4 sm:px-6 pb-4">
        <div className="flex-1 min-h-0">
          <ChartContainer config={chartConfig} className="h-48 sm:h-64 lg:h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                accessibilityLayer
                data={chartData}
                layout="vertical"
                margin={{
                  top: 8,
                  right: 16,
                  bottom: 8,
                  left: 60
                }}
                barCategoryGap="12%"
              >
                <CartesianGrid horizontal={false} strokeDasharray="3 3" />
                <YAxis
                  dataKey="label"
                  type="category"
                  tickLine={false}
                  tickMargin={6}
                  axisLine={false}
                  tick={{ fontSize: 11, fill: 'currentColor' }}
                  tickFormatter={(v) => formatLabel(String(v))}
                  width={55}
                />
                <XAxis
                  dataKey="count"
                  type="number"
                  tickLine={false}
                  axisLine={false}
                  allowDecimals={false}
                  tick={{ fontSize: 10, fill: 'currentColor' }}
                />
                <ChartTooltip
                  cursor={{ fill: "transparent" }}
                  labelClassName="text-foreground"
                  content={<ChartTooltipContent indicator="line" />}
                />
                <Bar
                  dataKey="count"
                  layout="vertical"
                  fill="var(--color-count)"
                  radius={4}
                >
                  <LabelList
                    dataKey="count"
                    position="right"
                    offset={4}
                    className="fill-foreground"
                    fontSize={10}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm px-4 sm:px-6 pb-4"></CardFooter>
    </Card>
  )
}

export function Workshop() {
  const { data: workshop, isLoading } = api.dashboard.workshopCount.useQuery()

  if (isLoading) return <div>Loading...</div>
  if (!workshop) return <div>No Data of Workshop</div>

  console.log(workshop)

  const chartData = [
    { label: "RegistedAndAttended", count: workshop.totalRegistedAndAttended[0]?.value ?? 0 },
    { label: "Registered Only", count: workshop.totalRegistered[0]?.value ?? 0 },
    { label: "Transactions", count: workshop.totalTransactions[0]?.value ?? 0 },
  ]
  return (
    <Card className="flex-1 flex flex-col min-h-0">
      <CardHeader className="flex-shrink-0 px-4 sm:px-6 py-4">
        <CardTitle className="text-lg sm:text-xl">Events - Count</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col px-4 sm:px-6 pb-4">
        <div className="flex-1 min-h-0">
          <ChartContainer config={chartConfig} className="h-48 sm:h-64 lg:h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                accessibilityLayer
                data={chartData}
                layout="vertical"
                margin={{
                  top: 8,
                  right: 16,
                  bottom: 8,
                  left: 60
                }}
                barCategoryGap="12%"
              >
                <CartesianGrid horizontal={false} strokeDasharray="3 3" />
                <YAxis
                  dataKey="label"
                  type="category"
                  tickLine={false}
                  tickMargin={6}
                  axisLine={false}
                  tick={{ fontSize: 11, fill: 'currentColor' }}
                  tickFormatter={(v) => formatLabel(String(v))}
                  width={55}
                />
                <XAxis
                  dataKey="count"
                  type="number"
                  tickLine={false}
                  axisLine={false}
                  allowDecimals={false}
                  tick={{ fontSize: 10, fill: 'currentColor' }}
                />
                <ChartTooltip
                  cursor={{ fill: "transparent" }}
                  labelClassName="text-foreground"
                  content={<ChartTooltipContent indicator="line" />}
                />
                <Bar
                  dataKey="count"
                  layout="vertical"
                  fill="var(--color-count)"
                  radius={4}
                >
                  <LabelList
                    dataKey="count"
                    position="right"
                    offset={4}
                    className="fill-foreground"
                    fontSize={10}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm px-4 sm:px-6 pb-4"></CardFooter>
    </Card>
  )
}
