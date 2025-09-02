'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  TrendingUp,
  Users,
  CreditCard,
  Calendar,
  CheckCircle,
  Clock,
  Activity,
  BarChart3,
  UserCheck,
  DollarSign
} from "lucide-react";

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { RouterOutput } from '@/server/api/root';

import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { api } from '@/trpc/react';

const chartConfig = {
  count: {
    label: "Count",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

// Overview Cards Component
export function Overview() {
  const { data: asthra, isLoading: asthraLoading } = api.dashboard.asthraCount.useQuery();
  const { data: events, isLoading: eventsLoading } = api.dashboard.workshopCount.useQuery();

  if (asthraLoading || eventsLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-8">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-6"></div>
              <div className="h-10 bg-gray-200 rounded w-1/2"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const totalAsthraPass = asthra?.totalAsthraPass[0]?.value ?? 0;
  const totalAsthraAttended = asthra?.totalRegistedAndAttended[0]?.value ?? 0;
  const totalEventsAttended = events?.totalRegistedAndAttended[0]?.value ?? 0;
  const totalTransactions = (asthra?.totalTransactions[0]?.value ?? 0) + (events?.totalTransactions[0]?.value ?? 0);

  const overviewCards = [
    // {
    //   title: "Total Asthra Pass",
    //   value: totalAsthraPass,
    //   icon: Users,
    //   description: "Students with Asthra Pass",
    //   color: "bg-blue-500"
    // },
    {
      title: "Asthra Attendance",
      value: totalAsthraAttended,
      icon: CheckCircle,
      description: "Students attended Asthra",
      color: "bg-green-500"
    },
    {
      title: "Events Attendance",
      value: totalEventsAttended,
      icon: Activity,
      description: "Students attended events",
      color: "bg-purple-500"
    },
    {
      title: "Total Transactions",
      value: totalTransactions,
      icon: CreditCard,
      description: "Payment transactions",
      color: "bg-orange-500"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Key Performance Indicators</h2>
        <p className="text-gray-600">Real-time overview of your Asthra event management system</p>
      </div>

      {/* Overview Cards Grid */}
      <div className="flex flex-row flex-wrap justify-center gap-2">
        {overviewCards.map((card, index) => (
          <Card key={index} className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <CardContent className="p-8">
              <div className="flex items-center justify-center mb-6">
                <div className={`p-4 rounded-xl ${card.color} bg-opacity-15`}>
                  <card.icon className={`h-8 w-8 ${card.color.replace('bg-', 'text-')}`} />
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-600 mb-3">{card.title}</p>
                <p className="text-4xl font-bold text-gray-900 mb-2">{card.value.toLocaleString()}</p>
                <p className="text-sm text-gray-500">{card.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Enhanced Asthra Component
export function Asthra() {
  const { data: asthra, isLoading } = api.dashboard.asthraCount.useQuery();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="animate-pulse">
          <CardContent className="p-6">
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </CardContent>
        </Card>
        <Card className="animate-pulse">
          <CardContent className="p-6">
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!asthra) return (
    <Card>
      <CardContent className="p-6 text-center">
        <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Asthra Data Available</h3>
        <p className="text-gray-500">Check back later for updated information</p>
      </CardContent>
    </Card>
  );

  const chartData = [
    {
      label: "Registered & Attended",
      count: asthra.totalRegistedAndAttended[0]?.value ?? 0,
      color: "#10b981"
    },
    {
      label: "Registered Only",
      count: asthra.totalRegistered[0]?.value ?? 0,
      color: "#3b82f6"
    },
    {
      label: "Transactions",
      count: asthra.totalTransactions[0]?.value ?? 0,
      color: "#f59e0b"
    },
    {
      label: "Asthra Pass",
      count: asthra.totalAsthraPass[0]?.value ?? 0,
      color: "#8b5cf6"
    },
  ];

  const pieData = chartData.map(item => ({
    name: item.label,
    value: item.count,
    color: item.color
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Asthra Statistics
          </CardTitle>
          <CardDescription>
            Overview of registrations, attendance, and transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  layout="vertical"
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid horizontal={false} strokeDasharray="3 3" />
                  <XAxis type="number" hide />
                  <YAxis
                    dataKey="label"
                    type="category"
                    tickLine={false}
                    axisLine={false}
                    width={120}
                    tick={{ fontSize: 12 }}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="line" />}
                  />
                  <Bar
                    dataKey="count"
                    radius={[0, 4, 4, 0]}
                    fill="var(--color-count)"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                    <LabelList
                      dataKey="count"
                      position="right"
                      offset={8}
                      className="fill-foreground text-sm font-medium"
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      {/* Pie Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCheck className="h-5 w-5" />
            Distribution Overview
          </CardTitle>
          <CardDescription>
            Visual breakdown of Asthra data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="grid grid-cols-2 gap-2 mt-4">
            {pieData.map((item, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-gray-600">{item.name}</span>
                <span className="font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Enhanced Workshop/Events Component
export function Workshop() {
  const { data: events, isLoading } = api.dashboard.workshopCount.useQuery();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="animate-pulse">
          <CardContent className="p-6">
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </CardContent>
        </Card>
        <Card className="animate-pulse">
          <CardContent className="p-6">
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!events) return (
    <Card>
      <CardContent className="p-6 text-center">
        <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Events Data Available</h3>
        <p className="text-gray-500">Check back later for updated information</p>
      </CardContent>
    </Card>
  );

  const chartData = [
    {
      label: "Registered & Attended",
      count: events.totalRegistedAndAttended[0]?.value ?? 0,
      color: "#10b981"
    },
    {
      label: "Registered Only",
      count: events.totalRegistered[0]?.value ?? 0,
      color: "#3b82f6"
    },
    {
      label: "Transactions",
      count: events.totalTransactions[0]?.value ?? 0,
      color: "#f59e0b"
    },
  ];

  const totalParticipants = chartData.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Events & Workshops Statistics
          </CardTitle>
          <CardDescription>
            Overview of event registrations and attendance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  layout="vertical"
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid horizontal={false} strokeDasharray="3 3" />
                  <XAxis type="number" hide />
                  <YAxis
                    dataKey="label"
                    type="category"
                    tickLine={false}
                    axisLine={false}
                    width={120}
                    tick={{ fontSize: 12 }}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="line" />}
                  />
                  <Bar
                    dataKey="count"
                    radius={[0, 4, 4, 0]}
                    fill="var(--color-count)"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                    <LabelList
                      dataKey="count"
                      position="right"
                      offset={8}
                      className="fill-foreground text-sm font-medium"
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Total Participants
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{totalParticipants.toLocaleString()}</div>
            <p className="text-sm text-gray-600 mt-2">Across all events and workshops</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Attendance Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">
              {events.totalRegistedAndAttended[0]?.value && events.totalRegistered[0]?.value
                ? Math.round((events.totalRegistedAndAttended[0].value / events.totalRegistered[0].value) * 100)
                : 0}%
            </div>
            <p className="text-sm text-gray-600 mt-2">Of registered participants attended</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Revenue Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">
              ₹{(events.totalTransactions[0]?.value ?? 0).toLocaleString()}
            </div>
            <p className="text-sm text-gray-600 mt-2">Total transactions processed</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
