import type React from 'react'
import { PlusIcon } from './plus'
import { cn } from '@/lib/utils'

const Plusbox = ({ children, className }: { children: React.ReactNode, className: string }) => {
    return (
        <div className={cn(className)}>
            <PlusIcon className="absolute h-6 w-6 -top-3 -left-3" />
            <PlusIcon className="absolute h-6 w-6 -bottom-3 -left-3" />
            <PlusIcon className="absolute h-6 w-6 -top-3 -right-3" />
            <PlusIcon className="absolute h-6 w-6 -bottom-3 -right-3" />
            <div className='w-fit'>
                {children}
            </div>
        </div>
    )
}

export default Plusbox