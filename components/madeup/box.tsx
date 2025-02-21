import React from 'react'
import { Icon } from './event-card'
import { cn } from '@/lib/utils'

const Plusbox = ({ children, className }: { children: React.ReactNode, className: string }) => {
    return (
        <div className={cn(className)}>
            <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
            <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
            <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
            <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />
            <div className='w-fit'>
                {children}
            </div>
        </div>
    )
}

export default Plusbox