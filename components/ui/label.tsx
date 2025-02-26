"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  {
    variants: {
      variant: {
        default: 'ambit text-white text-md p-0 bg-transparent',
        glass: 'ambit px-2 py-1 text-white text-md bg-glass drop-shadow-md rounded-sm border border-glass'
      },
      size: {
        default: "ambit text-white text-2xl font-medium",
        lg: 'ambit text-5xl text-white font-bold',
        md: 'ambit text-3xl text-white font-medium',
        sm: 'ambit text-2xl text-white font-medium',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: "default",
    },
  }
)

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
  VariantProps<typeof labelVariants>
>(({ className, size = "default", variant, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants({ size, variant }), className)}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
