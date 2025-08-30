"use client"

import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Asthra, Workshop } from './_components/dashboard';


function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard</h1>
          <p className="text-slate-600 mt-1">Overview of your technical fest management</p>
        </div>
        <div className="flex items-center space-x-2">
          {/* <Button onClick={() => window.print()}>Download</Button> */}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <Tabs defaultValue="asthra" className="w-full space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-slate-100">
            <TabsTrigger value="asthra" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Asthra
            </TabsTrigger>
            <TabsTrigger value="events" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Competition
            </TabsTrigger>
          </TabsList>
          <TabsContent value="asthra" className="space-y-4 mt-6">
            <Asthra />
          </TabsContent>
          <TabsContent value="events" className="space-y-4 mt-6">
            <Workshop />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
export default DashboardPage;
