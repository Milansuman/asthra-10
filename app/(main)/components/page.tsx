import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ChevronRight, LogOut } from "lucide-react";

export default function Page() {
    return <main className="flex flex-col items-start p-8">
        <div className="w-full flex justify-center text-5xl font-bold drop-shadow-xl">Components</div>
        <h1 className="text-underline text-3xl font-medium mt-10 text-black">Labels</h1>
        <div className="grid md:grid-cols-4 gap-10 sm:grid-cols-2 grid-cols-1 mt-4 items-start p-6 glass w-full">
            <Label size={'lg'}>Large</Label>
            <Label size={'md'}>Medium</Label>
            <Label size={'sm'} >Small</Label>
        </div>
        <h1 className="text-underline text-3xl font-medium mt-10 text-black">Buttons</h1>
        <div className="grid md:grid-cols-4 gap-10 sm:grid-cols-2 grid-cols-1 mt-4 items-start p-6 glass w-full">
            <Button variant={'glass'}>Glass</Button>
            <Button size={"lg"} variant="glass">sm Glass <ChevronRight /></Button>
            <Button size={"lg"} variant="destructive">destructive <LogOut /></Button>
        </div>
    </main>
}