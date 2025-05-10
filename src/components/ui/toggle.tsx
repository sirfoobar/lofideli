
import * as React from "react"
import { useToggleState } from "@react-stately/toggle"
import { useToggleButton } from "@react-aria/button"
import { useObjectRef } from "@react-aria/utils"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const toggleVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-small ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-10 px-3",
        sm: "h-9 px-2.5",
        lg: "h-11 px-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ToggleProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange" | "value" | "defaultValue">,
    VariantProps<typeof toggleVariants> {
  pressed?: boolean
  defaultPressed?: boolean
  onPressedChange?: (pressed: boolean) => void
}

const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  ({ className, variant, size, pressed, defaultPressed, onPressedChange, ...props }, forwardedRef) => {
    const ref = useObjectRef(forwardedRef)
    const state = useToggleState({
      isSelected: pressed,
      defaultSelected: defaultPressed,
      onChange: onPressedChange
    })
    
    const { buttonProps } = useToggleButton(props, state, ref)
    
    return (
      <button
        type="button"
        className={cn(toggleVariants({ variant, size, className }))}
        data-selected={state.isSelected}
        ref={ref}
        {...buttonProps}
        {...props}
      />
    )
  }
)

Toggle.displayName = "Toggle"

export { Toggle, toggleVariants }
