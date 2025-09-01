import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded bg-primary px-5 py-3 font-medium shadow-sm transition-colors hover:bg-muted-foreground hover:text-gray-900 disabled:opacity-50 disabled:pointer-events-none focus:outline-none", 
  {
    variants: {
      variant: {
        default:
          "inline-block rounded px-5 py-3 font-medium text-muted shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900",
        destructive:
          "bg-destructive text-white shadow-sm hover:bg-destructive/90 dark:bg-destructive/60",
        outline:
          "bg-background shadow-sm hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-auto",
        sm: "px-3 py-2 text-sm rounded",
        lg: "px-6 py-3 text-base rounded-md",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)
function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
