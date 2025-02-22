import { Slot } from "@radix-ui/react-slot"
import { type VariantProps, cva } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/lib/utils"
import Link from "next/link"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          'border border-input bg-transparent',
        secondary:
          'bg-black text-secondary-foreground hover:bg-black/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        glass: 'hover:-translate-y-0.5 border border-white/20 bg-white/10 text-white shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/20 hover:shadow-[0_12px_40px_0_rgba(31,38,135,0.45)]',
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  pattern?: boolean;
  link?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, pattern, children, link, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    const Wrapper = link ? Link : React.Fragment
    return (
      <Wrapper href={link ?? ""}>
        <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}>
          {pattern && <div className="bg-button-noise opacity-50 h-full w-full absolute" />}
          {children}
        </Comp>
      </Wrapper>
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants }
