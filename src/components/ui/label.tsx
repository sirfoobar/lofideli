
import * as React from "react"
import { useLabel } from "@react-aria/label"
import { useObjectRef } from "@react-aria/utils"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const labelVariants = cva(
  "text-sm font-small leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

export interface LabelProps extends 
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>,
  VariantProps<typeof labelVariants> {
  rootClassName?: string;
}

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  LabelProps
>(({ className, rootClassName, ...props }, forwardedRef) => {
  const ref = useObjectRef(forwardedRef);
  const { labelProps } = useLabel(props);
  
  return (
    <LabelPrimitive.Root
      ref={ref}
      className={rootClassName || cn(labelVariants(), className)}
      {...labelProps}
      {...props}
    />
  )
})

Label.displayName = LabelPrimitive.Root.displayName

export { Label }
