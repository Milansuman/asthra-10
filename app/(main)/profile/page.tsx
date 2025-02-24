import { useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { ChevronRight, ShoppingBag, Terminal } from "lucide-react";
import Plusbox from '@/components/madeup/box';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import type { EventZodType } from '@/lib/validator';
import { Lanyard } from '@/components/lanyard';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import * as THREE from 'three';
// import { GLTFLoader } from 'ogl';

export default function ProfilePage() {
    const hasAsthra = false;
    const validProfile = false;
    const listOfEvents: EventZodType[] = [];

    return (
        <main className='flex flex-col md:flex-row justify-start min-h-screen ambit'>
            <Card className='flex-1 flex-col flex m-6'>
                <CardHeader>
                    <Avatar className='h-20 w-20'>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>SJCET</AvatarFallback>
                    </Avatar>
                    <CardTitle><span className="font-medium">Student</span> <span className="font-bold text-xl">(ROLE)</span></CardTitle>
                    <CardDescription>student@gmail.com</CardDescription>
                    <CardDescription>department, year, college</CardDescription>
                </CardHeader>
                <CardContent>
                    {!validProfile && <Alert className='relative text-black'>
                        <Terminal className="h-4 w-4" />
                        <AlertTitle>Complete Profile</AlertTitle>
                        <AlertDescription>
                            Please complete your profile to purchase Asthra Pass.
                        </AlertDescription>
                        <div className='bg-glass-top absolute top-0 left-0 right-0 h-full' />
                    </Alert>}
                </CardContent>
                <CardContent className='flex justify-start flex-row flex-wrap gap-2'>
                    <Button size={"sm"} variant="glass">Show Profile QR <ChevronRight /></Button>
                    <Button size={"sm"} variant="glass">400 Credits <ChevronRight /></Button>
                    <Button size={"sm"} variant="glass">ASTHRA Pass Unlocked <ChevronRight /></Button>
                    <Button size={"sm"} variant="glass">Show Profile QR <ChevronRight /></Button>
                    <Button size={"sm"} variant="glass">Show Profile QR <ChevronRight /></Button>
                </CardContent>
                {(listOfEvents.length > 0) && <CardContent>
                    <CardTitle>Purchased Events</CardTitle>
                    <Plusbox>
                        <Table>
                            <TableBody>
                                {listOfEvents.map((event, i) => (
                                    <TableRow key={event.id}>
                                        <TableCell className="font-medium">{i + 1}</TableCell>
                                        <TableCell>{event.name}</TableCell>
                                        <TableCell>{"attended"}</TableCell>
                                        <TableCell className="text-right">
                                            <Button size={"thin"} variant="glass">View <ChevronRight /></Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Plusbox>
                </CardContent>}
                <CardFooter className='justify-between mt-auto'>
                    <Button variant="destructive">Edit Profile</Button>
                    <Button variant="destructive">Sign Out</Button>
                </CardFooter>
            </Card>
            <div className='flex-[1_auto]'>
                {hasAsthra && <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />}
                {!hasAsthra && <Card className="m-6 md:min-h-screen p-5 flex flex-col items-center justify-center">
                    <Image src="/assets/asthraps.png" className='mb-10' alt='' width={200} height={200} />
                    <Label size={'md'} className='text-center'>You don't have an Asthra Pass</Label>
                    <Button variant={'primary'} className='mt-5'>BUY NOW <ShoppingBag /></Button>
                </Card>}
            </div>
        </main>
    );
}