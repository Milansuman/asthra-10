"use client";

import { type inferRouterOutputs } from '@trpc/server';
import Image from 'next/image';
import Link from 'next/link';
import { type FunctionComponent } from 'react';
import DemoMask from '~/components/ui/svg-mask';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { type AllDepartments } from '~/logic';
import { type AppRouter } from '~/server/api/root';

interface DemoMarkContainerProps {
    departments: AllDepartments[]
    events: inferRouterOutputs<AppRouter>["event"]["getLatest"]
}
 
const DemoMarkContainer: FunctionComponent<DemoMarkContainerProps> = ({departments, events}) => {

    return ( 
        <DemoMask>
        
        <div className="">
          <Tabs defaultValue={departments?.[0]}>
            <TabsList>
              {departments?.map((category, index) => (
                <TabsTrigger value={category} key={index}>
                  {category}
                  {/* diplay the category name in */}
                </TabsTrigger>
              ))}
            </TabsList>
            {departments?.map((dept, index) => (
              <TabsContent key={index} value={dept}>
                <div className="w-screen mb-10 gap-3 columns-2 md:columns-3 xl:columns-5 min-h-60">
                  {events
                    .filter((item) => item.department === dept)
                    .map((eventData, index) => (
                      <Link key={index} href={`/events/${eventData.id}`}>
                        <div className="relative group">
                          {eventData.poster && <Image width={500} height={500} src={eventData.poster} alt="image" className="object-contain" />}
                          <div className="absolute inset-0 hover:bg-black/50 flex opacity-0 group-hover:opacity-100 transition-all items-end p-4 ">{eventData.name}</div>
                        </div>
                      </Link>

                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </DemoMask>

     );
}
 
export default DemoMarkContainer;