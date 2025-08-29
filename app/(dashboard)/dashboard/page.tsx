"use client"

import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Asthra, Workshop } from './_components/dashboard';


function DashboardPage() {
  return (
    <div className="flex-col md:flex pt-20 text-white h-screen">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex items-center space-x-2">
            {/* <Button onClick={() => window.print()}>Download</Button> */}
          </div>
        </div>
        <Tabs defaultValue="asthra" className="w-full space-y-4 overflow-x-auto scrollbar-hide">
          <TabsList>
            <TabsTrigger value="asthra">Asthra</TabsTrigger>
            <TabsTrigger value="events">competiton</TabsTrigger>
          </TabsList>
          <TabsContent value="asthra" className="space-y-4">
            <Asthra />
          </TabsContent>
          <TabsContent value="events" className="space-y-4">
            <Workshop />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
export default DashboardPage;
