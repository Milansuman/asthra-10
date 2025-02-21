'use client';

import Image from 'next/image';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface DepartmentData {
  asthra_pass: number;
  workshop: number;
  competition: number;
}

type Department = Record<string, DepartmentData>;
type Props = {
  data: {
    totalRegistedAndAttended: {
      value: number;
    }[];
    totalRegistered: {
      value: number;
    }[];
    totalTransactions: {
      value: number;
    }[];
    totalAsthraPass: {
      value: number;
    }[];
  };
};

const Dashboard = ({ data }: Props) => {
  const [selectedDept, setSelectedDept] =
    React.useState<keyof Department>('cs');
  return (
    <div className="flex-col md:flex pt-20">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex items-center space-x-2">
            <Button onClick={() => window.print()}>Download</Button>
          </div>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="dept">Department</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 justify-center align-middle grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <Card className="flex flex-col items-center">
                <Image
                  src={
                    'https://res.cloudinary.com/db2u2juse/image/upload/v1709054688/passes/asthra_xcrlr1.png'
                  }
                  alt="ASTHRA Pass"
                  className="mt-5 print:hidden"
                  width={200}
                  height={300}
                />
                <div className="self-start">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium tracking-wider">
                      Total Asthra Pass
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{}</div>
                    <p className="text-xs text-muted-foreground">
                      Passes are Sold
                    </p>
                  </CardContent>
                </div>
              </Card>
              <Card className="flex flex-col items-center">
                <Image
                  src={
                    'https://res.cloudinary.com/db2u2juse/image/upload/v1709054688/passes/workshop_x443mz.png'
                  }
                  alt={'Workshop Event Poster'}
                  className="mt-5 print:hidden"
                  width={200}
                  height={300}
                />
                <div className="self-start">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium tracking-wider">
                      Total Workshop Pass
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{}</div>
                    <p className="text-xs text-muted-foreground">
                      Passes are Sold
                    </p>
                  </CardContent>
                </div>
              </Card>
              <Card className="flex flex-col items-center">
                <Image
                  src={
                    'https://res.cloudinary.com/db2u2juse/image/upload/v1709094374/passes/Competition_vc5moi.png'
                  }
                  alt="Event Poster"
                  className="mt-5 print:hidden"
                  width={200}
                  height={300}
                />
                <div className="self-start">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium tracking-wider">
                      Total Competition Pass
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{}</div>
                    <p className="text-xs text-muted-foreground">
                      Passes are Sold
                    </p>
                  </CardContent>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="dept" className="space-y-4">
            <Select
              value={selectedDept}
              onValueChange={(value) => {
                setSelectedDept(value);
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {/* {Object.keys().map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      <SelectLabel>{dept}</SelectLabel>
                    </SelectItem>
                  ))} */}
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Total Asthra Pass</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Total Workshop Pass</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Total Competition Pass</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{}</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
