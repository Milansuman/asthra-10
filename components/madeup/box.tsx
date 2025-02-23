import type React from 'react'
import { PlusIcon } from './plus'
import { cn } from '@/lib/utils'

const Plusbox = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <div className={cn("p-1 border border-glass w-full relative", className)}>
            <PlusIcon className="absolute opacity-80 h-6 w-6 -top-3 -left-3" />
            <PlusIcon className="absolute opacity-80 h-6 w-6 -bottom-3 -left-3" />
            <PlusIcon className="absolute opacity-80 h-6 w-6 -top-3 -right-3" />
            <PlusIcon className="absolute opacity-80 h-6 w-6 -bottom-3 -right-3" />
            {children}
        </div>
    )
}

export default Plusbox